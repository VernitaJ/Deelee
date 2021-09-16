var express = require("express");
var router = express.Router();
var Deal = require("../models/deal");

// Companies - database functions
router.get("/deals", function (req, res, next) {
  Deal.find(function (err, deals) {
    if (err) {
      return next(err);
    }
    res.json({ deals: deals });
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

router.put("/deals/:id", function (req, res) {
  var id = req.params.id;
  var updated_deal = {
    id: id,
    tag: req.body.tag,
    name: req.body.name,
  };
  Deal[id] = updated_deal;
  res.json(updated_deal);
});

module.exports = router;
