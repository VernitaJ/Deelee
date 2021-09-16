var express = require("express");
var router = express.Router();
var Company = require("../models/company");

// Companies - database functions
router.get("/companies", function (req, res, next) {
  Company.find(function (err, companies) {
    if (err) {
      return next(err);
    }
    res.json({ companies: companies });
  });
});

// router.get("/companies/:id", function (req, res, next) {
//   Company.findById(req.params.id, (err, company) => {
//     if (err) return res.status(500).send(err);
//     return res.status(200).send(company);
//   });
// });

router.get("/companies/:id", function (req, res) {
  res.json(companies[req.params.id]);
});

router.post("/companies", function (req, res, next) {
  var company = new Company(req.body);
  company.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(company);
  });
});

router.delete("/companies", function (req, res) {
  Company.delete(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200);
  });
});

router.delete("/companies/:id", function (req, res) {
  var id = req.params.id;
  var company = Company[id];
  company.delete(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200);
  });
});

router.put("/companies/:id", (req, res) => {
  var id = req.params.id;
  Company.findById(id, function (err, company) {
    if (err) {
      return next(err);
    }
    if (company == null) {
      return res.status(404).json({ message: "Company not found" });
    }
    company.name = req.body.name;
    company.deals.push(req.body.deals); //adds to the array - only one deal at a time
    company.save();
    res.json(company);
  });
});

router.patch("/companies/:id", function (req, res) {
  var id = req.params.id;
  var company = companies[id];
  var updated_company = {
    id: id,
    name: req.body.name || company.name,
    adress: req.body.adress || company.adress,
    category: req.body.category || company.category,
  };
  companies[id] = updated_company;
  res.json(updated_company);
});

module.exports = router;
