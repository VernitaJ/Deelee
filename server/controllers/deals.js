var express = require("express");
var router = express.Router();
var Deal = require("../models/deal");

// Deals - database functions
router.get("/deals", function (req, res, next) {
  Deal.find(function (err, deals) {
    if (err) {
      return next(err);
    }
    res.json({ deals: deals });
  });
});

router.get("/deals/:id", function (req, res) {
  var id = req.params.id;
  Deal.findById(req.params.id, function (err, deal) {
    if (err) {
      return next(err);
    }
    if (deal == null) {
      return res.status(404).json({ message: "Deal not found" });
    }
    res.json(deal);
  });
});

router.post("/deals", function (req, res, next) {
  var deal = new Deal(req.body);
  deal.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(deal);
  });
});

router.delete("/deals", function (req, res) {
  Deal.delete(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json(deal);
  });
});

router.delete("/deals/:id", function (req, res, next) {
  var id = req.params.id;
  Deal.findByIdAndDelete(id, function (err, deal) {
    if (err) {
      return next(err);
    }
    if (deal == null) {
      return res.status(404).json({ message: "Deal not found" });
    }
    console.log("Deal successfully deleted :", deal.name);
    res.json(deal);
  });
});

router.put("/deals/:id", (req, res, next) => {
  var id = req.params.id;
  Deal.findById(id, function (err, deal) {
    if (err) {
      return next(err);
    }
    if (deal == null) {
      return res.status(404).json({ message: "Deal not found" });
    }
    deal.name = req.body.name;
    deal.support = req.body.support;
    deal.tag.push(req.body.tag); //only one tag at a time
    deal.save();
    res.json(deal);
  });
});

router.patch("/deals/:id", function (req, res) {
  var id = req.params.id;
  Deal.findByIdAndUpdate(id, function (err, deal) {
    if (err) {
      return next(err);
    }
    if (deal == null) {
      return res.status(404).json({ message: "Deal not found" });
    }
    deal.name = req.body.name || deal.name;
    deal.tag = deal.tag.push(req.body.tag) || deal.tag;
    deal.support = req.body.support || deal.support;
    deal.company = req.body.company;
    res.json(deal);
  });
});

module.exports = router;
