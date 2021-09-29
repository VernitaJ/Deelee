var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const moment = require('moment');

var reviewSchema = new Schema(
  {
    Purchase: {
      user: [{ type: Schema.Types.ObjectId, ref: "user" }],
      item: [{ type: Schema.Types.ObjectId, ref: "deal" }],
      Date: { type: Date, default: moment().add(2, 'hours')},  
    },
    description: { type: String },
    stars: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewSchema);