const Student = require("../DB/model/student");
const FilterObj = require("../function/FilterObj");
const express = require("express");
const route = express.Router();
const { validationResult } = require("express-validator");
const {
  AddValidStudent,
  UpdateValidStudent,
} = require("./validator/studentValidator");
const fetchTeacher = require("../middleware/fetchTeacher");

//Route 1: Add new student
route.post("/add", AddValidStudent, fetchTeacher, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    console.log("Staff ID is := ");
    console.log(req.body.staffID);
    const newStudent = new Student(req.body);
    const savedStudent = await newStudent.save();
    return res.status(201).json(savedStudent);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// Route 2: Get all students information
route.get("/allStudent", fetchTeacher, async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route 3: get student info by speficied roll number
route.get("/student/:rollnumber", async (req, res) => {
  const rollnumber = req.params.rollnumber;
  if (!rollnumber || rollnumber <= 0) {
    return res.status(401).send("Wrong roll number");
  }
  try {
    let student = await Student.findOne({ rollnumber });
    res.send(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route 4 : Update information of student.
route.put(
  "/update/:rollnumber",
  UpdateValidStudent,
  fetchTeacher,

  async (req, res) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const rollnumber = req.params.rollnumber;
    if (!rollnumber || rollnumber <= 0) {
      return res.status(401).send("Wrong roll number");
    }
    try {
      let { name, staffID, dateOfBirth, contact } = await req.body;
      let reduced = { contact, dateOfBirth, staffID };
      reduced = FilterObj(reduced);
      if (name) {
        name = FilterObj(name);
        reduced.name = name;
      }

      let student = await Student.find({ rollnumber });
      if (!student) {
        return res.status(401).send("Not Found");
      }
      let updated = await Student.findOneAndUpdate(
        { rollnumber: rollnumber },
        { $set: reduced },
        { new: true }
      );
      res.send(updated);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//Route 5 : Delete student by their rollnumber

route.delete("/delete/:rollnumber", fetchTeacher, async (req, res) => {
  const rollnumber = req.params.rollnumber;

  try {
    const deletedTeacher = await Student.findOneAndDelete({ rollnumber });

    if (!deletedTeacher) {
      return res.status(404).json({ msg: "Student not found" });
    }

    res.json({ msg: "Student deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route 2: Get all students information
route.post("/byStaffID", fetchTeacher, async (req, res) => {
  // const error = validationResult(req);

  // if (!error.isEmpty()) {
  //   return res.status(400).json({ error: error.array() });
  // }

  try {
    let { staffID } = await req.body;

    let student = await Student.find({ staffID });
    if (!student) {
      return res.status(401).send([]);
    }

    res.send(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = route;
