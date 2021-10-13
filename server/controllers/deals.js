var express = require("express");
var router = express.Router();
var Deal = require("../models/deal");
var Company = require("../models/company");

// Deals - database functions
router.get("/api/deals", function (req, res, next) {
  Deal.find()
  .populate("company")
  .exec(function (err, deals){
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json({ deals: deals });
  });
});

router.get("/api/deals/:id", function (req, res) {
  Deal.findOne({ _id: req.params.id })
    .populate("user")
    .populate("company")
    .exec(function (err, deal) {
      if (err) {
        return res.status(500).send(err);
      }
      if (deal == null) {
        return res.status(404).json({ message: "Deal not found" });
      }
      res.status(200).json(deal);
    });
});

router.post("/api/deals", function (req, res, next) {
  var deal = new Deal(req.body);
  deal.save(function (err) {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json(deal);
  });
});

router.delete("/api/deals", function (req, res) {
  Deal.deleteMany(function (err, deal) {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(deal);
  });
});

router.delete("/api/deals/:id", function (req, res, next) {
  var id = req.params.id;
  Deal.findByIdAndDelete(id, function (err, deal) {
    if (err) {
      return res.status(500).send(err);
    }
    if (deal == null) {
      return res.status(404).json({ message: "Deal not found" });
    }
    console.log("Deal successfully deleted :", deal.name);
    res.status(200).json(deal);
  });
});

router.put("/api/deals/:id", (req, res, next) => {
  var id = req.params.id;
  Deal.findById(id, function (err, deal) {
    if (err) {
      return res.status(500).send(err);
    }
    if (deal == null) {
      return res.status(404).json({ message: "Deal not found" });
    }
    deal.name = req.body.name;
    deal.support = req.body.support;
    deal.tag.push(req.body.tag); //only one tag at a time
    deal.save();
    res.status(201).json(deal);
  });
});

router.patch("/api/deals/:id", (req, res) => {
  Deal.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((deals) => {
      if (!deals) {
        return res.status(404).send();
      }
      res.status(201).send(deals);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// router.patch("/api/deals/:id", function (req, res) {
//   var id = req.params.id;
//   Deal.findByIdAndUpdate(id, function (err, deal) {
//     if (err) {
//       return next(err);
//     }
//     if (deal == null) {
//       return res.status(404).json({ message: "Deal not found" });
//     }
//     console.log(deal);
//     deal.name = req.body.name || deal.name;
//     deal.tag = deal.tag.push(req.body.tag) || deal.tag;
//     deal.support = req.body.support || deal.support;
//     deal.company = req.body.company;
//     deal.save();
//     res.json(deal);
//   });
// });

module.exports = router;
