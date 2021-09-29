var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dealSchema = new Schema(
  {
    name: { type: String },
    tag: [{ type: String }],
    support: { type: Number },
    company: { type: Schema.Types.ObjectId, ref: "companies" },
    user: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("deals", dealSchema);
