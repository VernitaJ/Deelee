var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const moment = require("moment");

var reviewSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    stars: { type: Number },
    purchase: {
      user: { type: Schema.Types.ObjectId, ref: "users" },
      item: { type: String },
      company: { type: String},
      date: { type: Date, default: moment().add(2, "hours") },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewSchema);
