var express = require("express");
var router = express.Router();
var User = require("../models/user");

// Users - database functions
router.get("/users", function (req, res, next) {
  User.find(function (err, users) {
    if (err) {
      return next(err);
    }
    res.json({ users: users });
  });
});

router.post("/users", function (req, res, next) {
  var user = new User(req.body);
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(201).json(user);
  });
});

module.exports = router;
