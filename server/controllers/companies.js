var express = require("express");
var router = express.Router();
var Company = require("../models/company");
var Deal = require("../models/deal");
var Review = require("../models/review");

// Companies - database functions
router.get("/api/companies", function (req, res, next) {
  Company.find(function (err, companies) {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ companies: companies });
    res.status(200);
  });
});

router.get("/api/companies/:id", function (req, res, next) {
  Company.findOne({ _id: req.params.id })
    .populate("deals")
    .populate("reviews")
    .exec(function (err, company) {
      if (err) {
        return res.status(500).send(err);
      }
      return res.status(200).send(company);
    });
});

router.get("/api/companies/:id/deals", function (req, res, next) {
  Company.findOne({ _id: req.params.id })
    .populate("deals")
    .exec(function (err, company) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(company.deals);
      return res.status(200).send(company.deals);
    });
});

// GET /cars/:car_id/drivers/:driver_id (relationship)
router.get("/api/companies/:co_id/deals/:deal_id", function (req, res, next) {
  Company.findOne({ _id: req.params.co_id })
    .populate("deals", {
      match: { _id: { $ne: req.params.deal_id } },
    })
    .exec(function (err, company) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(company.deals);
      return res.status(200).send(company.deals);
    });
});

router.post("/api/companies", function (req, res, next) {
  var company = new Company(req.body);
  company.save(function (err) {
    if (err) {
      return res.status(500).send(err);;
    }
    console.log("New Company ", company.name, "created");
    return res.status(201).json(company);
  });
});

router.get("/api/companies/category/:category", function (req, res, next) {
  console.log("finding");
  Company.find({ category: { $all: [req.params.category] } }).exec(function (
    err,
    company
  ) {
    if (err) {
      return res.status(500).send(err);
    }
    console.log("success");
    return res.status(200).json(company);
  });
});


router.get("/api/companies/:id/reviews", function (req, res, next) {
  Company.findOne({ _id: req.params.id })
    .populate({
      path: 'reviews',
      model: 'reviews',
      populate: {
          path: 'user',
          model: 'users'
      }
    })
    .exec(function (err, company) {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(company.reviews);
      return res.status(200).send(company.reviews);
    });
});

router.post("/api/companies/:id/deals", function (req, res, next) {
  Company.findById(req.params.id, function (err, company) {
    if (err) {
      return res.status(500);
    }
    if (company == null) {
      return res.status(404).json({ message: "Company not found" });
    }
    var deal = new Deal(req.body);
    deal.save(function (err) {
      if (err) {
        return res.status(500);
      }
      console.log("Deal " + deal.name + " created.");
    });
    company.deals.push(deal);
    company.save();
    console.log("Deals added to ", company.name, " ", deal.name);
    return res.status(201).json(company);
  });
});

router.post("/api/companies/:id/reviews", function (req, res, next) {
  Company.findById(req.params.id, function (err, company) {
    if (err) {
      return res.status(500);
    }
    if (company == null) {
      return res.status(404).json({ message: "Company not found" });
    }
    var review = new Review(req.body);
    review.save(function (err) {
      if (err) {
        console.log(err)
        return res.status(500);
      }
      console.log("Review " + review.title + " created.");
      // res.status(201).json(review);
    });
    company.reviews.push(review);
    company.save();
    console.log("Review added to ", company.name, " ", review.title);
    return res.status(201).json(company);
  });
});

router.delete("/api/companies", function (req, res) {
  Company.deleteMany(function (err, company) {
    if (err) {
      return res.status(500).send(err);;
    }
    console.log("Deleted all instances of Company");
    res.status(200).json(company);
  });
});

router.delete("/api/companies/:id", function (req, res, next) {
  var id = req.params.id;
  Company.findByIdAndDelete(id, function (err, company) {
    if (err) {
      return res.status(500).send(err);
    }
    if (company == null) {
      return res.status(404).json({ message: "Company not found" });
    }
    console.log("Company successfully deleted :", company.name);
    res.status(200).json(company);
  });
});

router.delete(
  "/api/companies/:co_id/deals/:deal_id",
  function (req, res, next) {
    Company.updateOne(
      { _id: req.params.co_id },
      { $pull: { deals: { _id: req.params.deal_id } } },
      function (err, company) {
        if (err) {
          return res.status(500).send(err);
        }
        if (company == null) {
          return res.status(404).json({ message: "Company not found" });
        }
        res.status(200).json(company);
      }
    );
  }
);

// router.delete("/api/companies/:co_id/deals/:deal_id", function (req, res, next) {
//   var id = req.params.id;
//   Company.findById(req.params.co_id, function (err, company) {
//     if (err) {
//       return next(err);
//     }
//     if (company == null) {
//       return res.status(404).json({ message: "Company not found" });
//     }
//   });
//   console.log("Company successfully deleted :", company.name);
//   Deal.findByIdAndDelete(req.params.deal_id, function (err, deal) {

//   })
//   res.status(200).json(company);
// });

router.put("/api/companies/:id", (req, res) => {
  var id = req.params.id;
  Company.findById(id, function (err, company) {
    if (err) {
      return res.status(500).send(err);
    }
    if (company == null) {
      return res.status(404).json({ message: "Company not found" });
    }
    company.name = req.body.name;
    company.deals.push(req.body.deals); //adds to the array - only one deal at a time
    company.save();
    console.log("Company updated");
    res.status(201).json(company);
  });
});

router.patch("/api/companies/:id", (req, res) => {
  Company.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((company) => {
      if (company == null) {
        return res.status(404).send();
      }
      res.status(204).send(company);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// router.patch("/api/companies/:id", function (req, res, next) {
//   Company.findByIdAndUpdate(req.params.id, function (err, company) {
//     if (err) {
//       return next(err);
//     }
//     if (company == null) {
//       return res.status(404).json({ message: "Company not found" });
//     }
//     company.name = req.body.name || company.name;
//     company.address.street = req.body.address.street || company.address.street;
//     company.address.number = req.body.address.number || company.address.number;
//     company.address.postcode =
//       req.body.address.postcode || company.address.postcode;
//     company.address.city = req.body.address.city || company.address.city;
//     company.contact.email = req.body.contact.email || company.contact.email;
//     company.contact.phone = req.body.contact.email || company.contact.phone;
//     company.category = req.body.category || company.category;
//     company.deals = company.deals.push(req.body.deals) || company.deals;
//     company.save();
//     res.json(company);
//   });
// });

module.exports = router;
