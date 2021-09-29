const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

//Registeration

router.post("/api/users", function (req, res, next) {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.status(400).json({
        error: err,
      });
    }
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      location: req.body.location,
      email: req.body.email,
      password: hashedPass,
    });
    user
      .save()
      .then((user) => {
        res.status(200).json({
          message: "User Added Successfully!",
          data: User,
        });
      })
      .catch((error) => {
        res.status(400).json({
          message: "An error occured!",
        });
      });
  });
});

module.exports = router;
