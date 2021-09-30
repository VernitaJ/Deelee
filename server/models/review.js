var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const moment = require("moment");

var reviewSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    stars: { type: Number },
    purchase: {
      user: { type: String },
      item: { type: String },
      company: { type: Schema.Types.ObjectId, ref: "company" },
      date: { type: Date, default: moment().add(2, "hours") },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewSchema);
