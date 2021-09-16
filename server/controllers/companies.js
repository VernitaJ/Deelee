var express = require("express");
var mongoose = require("mongoose");
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

router.get("/companies/:id", function (req, res, next) {
  Company.findById(req.params.id, (err, company) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(company);
  });
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

router.delete("/companies/:id", function (req, res, next) {
  var id = req.params.id;
  Company.findByIdAndDelete(id, function (err, company) {
    if (err) {
      return next(err);
    }
    if (company == null) {
      return res.status(404).json({ message: "Company not found" });
    }
    console.log("Company successfully deleted :", company.name);
    res.json(company);
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
  Company.findByIdAndUpdate(id, function (err, company) {
    if (err) {
      return next(err);
    }
    if (company == null) {
      return res.status(404).json({ message: "Company not found" });
    }
    company.name = req.body.name || company.name;
    company.address.street = req.body.address.street || company.address.street;
    company.address.number = req.body.address.number || company.address.number;
    company.address.postcode =
      req.body.address.postcode || company.address.postcode;
    company.address.city = req.body.address.city || company.address.city;
    company.contact.email = req.body.contact.email || company.contact.email;
    company.contact.phone = req.body.contact.email || company.contact.phone;
    company.category = req.body.category || company.category;
    company.deals = company.deals.push(req.body.deals) || company.deals;
    res.json(company);
  });
});

module.exports = router;
