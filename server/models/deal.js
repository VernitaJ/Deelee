var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dealSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    tag: [{ type: String }],
    support: { type: Number },
    position: {
      lat: {
        type: Number,
        min: 30,
        max: 70,
        required: true,
      },
      lng: {
        type: Number,
        min: 5,
        max: 15,
        required: true,
      },
    },
    category: { type: String },
    company: { type: Schema.Types.ObjectId, ref: "companies" },
    user: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("deals", dealSchema);
