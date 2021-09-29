var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var companySchema = new Schema(
  {
    name: { type: String },
    address: {
      street: { type: String },
      number: { type: Number },
      postcode: { type: Number },
      city: { type: String },
    },
    contact: {
      email: { type: String },
      phone: { type: String },
    },
    category: {
      type: String,
      allowedValues: ["restaurant", "groceries", "clothing", "pub"],
    },
    deals: [{ type: Schema.Types.ObjectId, ref: "deals" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "review" }],
  },

  { timestamps: true }
);

module.exports = mongoose.model("companies", companySchema);
