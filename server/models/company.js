var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var companySchema = new Schema(
  {
    name: { type: String },
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
    contact: {
      email: { type: String },
      phone: { type: String },
    },
    category: {
      type: String,
      allowedValues: ["Restaurant", "Pub", "Clothing store", "Grocery store"],
    },
    deals: [{ type: Schema.Types.ObjectId, ref: "deals" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "reviews" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("companies", companySchema);
