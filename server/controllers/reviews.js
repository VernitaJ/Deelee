var express = require("express");
var router = express.Router();
var Review = require("../models/review");
const moment = require("moment");

//reviews created
router.post("/api/reviews", async (req, res, next) => {
  var review = new Review(req.body);
  try {
    var savedReview = await review.save();
    console.log(
      "New Review ",
      +review.description + " Added." + moment.locale()
    );
    res.status(200).json(savedReview);
  } catch (err) {
    return next(err);
  }
});

// Reviews get by ID
router.get("/reviews/:id", async (req, res, next) => {
  try {
    var review = await Review.findById(req.params.id);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
});

// All Reviews
router.get("/api/reviews", async (req, res, next) => {
  try {
    await Review.find(function (err, reviews) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ reviews: reviews });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete Many
router.delete("/reviews", async (req, res, next) => {
  try {
    await Review.deleteMany(function (err, review) {
      if (err) {
        return next(err);
      }
      res.status(200).json(review);
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// Delete One by Id
router.delete("/reviews/:id", async (req, res) => {
  const review = await Review.findById(req.params.id);

  try {
    await review.delete();
    res.status(200).json("Review has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

// Update by Id
router.put("/reviews/:id", async (req, res) => {
  await Review.findById(req.params.id);
  try {
    const updateReviews = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateReviews);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Update by Id (Patch)
router.patch("/reviews/:id", (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    useFindAndModify: false,
  })
    .then((reviews) => {
      if (!reviews) {
        return res.status(404).send();
      }
      res.status(201).send(reviews);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

module.exports = router;
