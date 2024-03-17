// Teacher Collection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Sequece = require("./sequence");
const TeacherSchema = new Schema({
  // Primary key of Teacher Collection
  staffID: {
    type: Number,
    // required: true,
    unique: true,
  },
  name: {
    fname: {
      type: String,
      required: true,
    },
    mname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
  },
  schoolID: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
TeacherSchema.pre("save", function (next) {
  const doc = this;
  Sequece.findByIdAndUpdate(
    { _id: "Teacher" },
    { $inc: { sequece_value: 1 } },
    { new: true, upsert: true }
  )
    .then((count) => {
      doc.staffID = count.sequece_value;
      next();
    })
    .catch((error) => {
      next(error);
    });
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
module.exports = Teacher;

//foreign  Key of Division collection
