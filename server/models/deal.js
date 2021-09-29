var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dealSchema = new Schema(
  {
    name: { type: String, required: true },
    tag: [{ type: String }],
    support: { type: Number },
    position: {
      lat: {
        type: Number,
        min: -30,
        max: 30,
      },
      lng: {
        type: Number,
        min: -90,
        max: 90,
      },
    },
    company: [{ type: Schema.Types.ObjectId, ref: "companies" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("deals", dealSchema);
