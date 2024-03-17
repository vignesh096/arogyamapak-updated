const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Sequece = require("./sequence");
//School schema
const schoolSchema = new Schema({
  code: {
    unique: true,
    // required: true,
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },

  village: {
    type: String,
    required: true,
  },
  subDistrict: {
    type: String,
    required: true,
  },
});
schoolSchema.pre("save", function (next) {
  const doc = this;
  Sequece.findByIdAndUpdate(
    { _id: "School" },
    { $inc: { sequece_value: 1 } },
    { new: true, upsert: true }
  )
    .then((count) => {
      doc.code = count.sequece_value;
      next();
    })
    .catch((error) => {
      next(error);
    });
});
const School = mongoose.model("School", schoolSchema);

module.exports = School;
