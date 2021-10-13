var express = require("express");
const user = require("../models/user");
var router = express.Router();

// Users - database functions
// Show the list of Users
router.get("/api/users", function (req, res, next) {
  user
    .find()
    .then((response) => {
      res.status(200).json({
        response
      });
    })
    .catch((error) => {
      res.status(404).json({
        message: "An error Occured!",
      });
    });
});

// Show User with Id
router.get("/api/users/:id", function (req, res) {
  user
    .findById(req.params.id)
    .then((response) => {
      res.status(200).json({
        response,
      });
    })
    .catch((error) => {
      res.status(400).json({
        message: "An error Occured!",
      });
    });
});

//Update a user
router.put("/api/users/:id", async (req, res) => {
  const User = user.findById(req.params.id);
  if (User.id === req.body.id)
    updateUser = user
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      .then(() => {
        res.status(200).json({
          message: "User updated successfully!",
        });
      })
      .catch((error) => {
        res.status(500).json({
          message: "An error Occured!",
        });
      });
});

router.patch("/api/users/:id", (req, res) => {
  user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send();
      }
      res.status(201).send(user);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// Delete a user by Id
router.delete("/api/users/:id", function (req, res) {
  const id = req.params.id;
  user.findByIdAndDelete(id, function (err, user) {
    if (err) {
      return res.status(500).send(err);
    }
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User successfully deleted :", user.name);
    res.status(200).json({ message: "User successfully deleted:", user });
  });
});

module.exports = router;
