const mongoose = require("mongoose");

const sequeceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  sequece_value: { type: Number, default: 0 },
});

// const youtubeSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true },
//   age: { type: Number, default: 0 },
//   increament: { type: Number },
// });

const Sequece = mongoose.model("Sequece", sequeceSchema);
module.exports = Sequece;
// youtubeSchema.pre("save", async function (next) {
//   const doc = this;
//   await Sequece.findByIdAndUpdate(
//     { _id: "myYouTube" },
//     { $inc: { sequece_value: 1 } },
//     { new: true, upsert: true }
//   )
//     .then(async (val) => {
//       console.log(val.sequece_value);
//       this.increament = val.sequece_value;

//       next();
//     })
//     .catch((err) => {
//       next(err);
//     });
// });

// const YouTube = mongoose.model("YouTube", youtubeSchema);

// async function insert() {
//   try {
//     let val = new YouTube({
//       username: "Rohini",
//       age: 43,
//       email: "rohini@gmail.com",
//     });
//     await val.save();

//     console.log(val);
//   } catch (error) {
//     console.log(error);
//   }
// }
