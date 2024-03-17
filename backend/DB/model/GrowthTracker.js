const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gtSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  rollnumber: {
    type: Number,
    required: true,
  },
  staffID: {
    required: true,
    type: Number,
  },

  height: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  bmi: {
    type: Number,
  },
  //Distance of how for child see the letters and objects.
  vision: {
    type: Number,
  },
  //Distance of how for child listen and understand it.
  hearing: {
    type: Number,
  },

  // Physical education classes may include assessments of students flexibility and muscular strength through various exercises and tests.
  //goniometer
  flexibility: { type: String }, // Example: Good, Average, Poor
  // muscularStrength: { type: String }, // Example: Good, Average, Poor
  posture: { type: String }, // Example: Good, Poor

  nutritionalStatus: {
    dietaryHabits: { type: String },
    // Add other nutritional status fields as needed
  },
  dentalHealth: {
    cavities: { type: String },
    gumProblems: { type: String },
    // Add other dental health fields as needed
  },
});

const GT = mongoose.model("Growth_Track", gtSchema);
module.exports = GT;
