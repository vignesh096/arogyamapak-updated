const express = require("express");
const route = express.Router();
const GT = require("../DB/model/GrowthTracker");
const { BMI_calculator } = require("../function/GT");
const { AddGTvalid } = require("./validator/gtValidator");
const fetchTeacher = require("../middleware/fetchTeacher");
route.post("/add", AddGTvalid, fetchTeacher, async (req, res) => {
  try {
    let measurements = new GT(req.body);
    const bmi = BMI_calculator(measurements.height, measurements.weight);
    measurements.bmi = bmi;
    const newGT = new GT(measurements);

    const savaGT = await newGT.save();
    return res.status(201).json(savaGT);
  } catch (error) {
    return res.status(400).json({ error: error.message });
    
    
  }
});
route.get("/getData/:rollnumber",  async (req, res) => {
  const rollnumber = req.params.rollnumber;
  if (!rollnumber || rollnumber <= 0) {
    return res.status(401).send("Wrong roll number");
  }
  try {
    const respon = await GT.find({ rollnumber });

    return res.status(201).json(respon);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});
// route.post("/", AddGTvalid, fetchTeacher,async (req, res) => {
//   try {
//     let measurements = new GT(req.body);
//     const bmi = BMI_calculator(measurements.height, measurements.weight);
//     measurements.bmi = bmi;
//     const newGT = new GT(measurements);

//     const savaGT = await newGT.save();
//     return res.status(201).json(savaGT);
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// });

module.exports = route;
