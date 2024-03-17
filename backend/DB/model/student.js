// Student Collection
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Sequece = require("./sequence");
const StudentSchema = new Schema({
  // Primary key of Student Collection
  rollnumber: {
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
  contact: {
    type: String,
    required: true,
  },
  // foreign  key of Teacher collection
  staffID: {
    required: true,
    type: Number,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
});

StudentSchema.pre("save", function (next) {
  const doc = this;
  Sequece.findByIdAndUpdate(
    { _id: "Student" },
    { $inc: { sequece_value: 1 } },
    { new: true, upsert: true }
  )
    .then((count) => {
      doc.rollnumber = count.sequece_value;
      next();
    })
    .catch((error) => {
      next(error);
    });
});

const Student = mongoose.model("Student", StudentSchema);
module.exports = Student;
