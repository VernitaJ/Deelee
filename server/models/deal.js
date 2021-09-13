var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dealSchema = new Schema(
  {
    name: { type: String },
    tag: [{ type: String }],
    support: { type: Number },
    company: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("deals", dealSchema);
