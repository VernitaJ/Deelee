var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var dealSchema = new Schema(
  {
    name: { type: String, required: true },
    tag: [{ type: String }],
    support: { type: Number },
<<<<<<< HEAD
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
=======
>>>>>>> 2e5a9218a239e69e49f43fb4a921213dc1ee697b
    company: { type: Schema.Types.ObjectId, ref: "companies" },
    user: { type: Schema.Types.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("deals", dealSchema);
