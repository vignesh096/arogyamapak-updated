// module.exports = Routes;
const express = require("express");
const { validationResult } = require("express-validator");
const FilterObj = require("../function/FilterObj");
const Teacher = require("../DB/model/teacher");

const Routes = express.Router();
const generatePass = require("../function/passwordGen");
const {
  AddValidTeacher,
  UpdateValidTeacher,
} = require("./validator/teacherValidator");
const bcrypt = require("bcryptjs");
// Route to create a new teacher
Routes.post("/add", AddValidTeacher, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let addTeacher = req.body;
    let mypass = generatePass();
    addTeacher.password = mypass;
    let newTeacher = new Teacher(addTeacher);

    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route to get a specific teacher by staffID
Routes.get("/info/:staffID", async (req, res) => {
  const staffID = req.params.staffID;

  try {
    const teacher = await Teacher.find({ _id: staffID });

    if (!teacher) {
      return res.status(404).json({ msg: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route to update a teacher by staffID
Routes.put("/update/:staffID", UpdateValidTeacher, async (req, res) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const ID = req.params.staffID;

  try {
    let { name, schoolID, contact } = await req.body;
    let reduced = { schoolID, contact };
    reduced = FilterObj(reduced);
    if (name) {
      let fullname = FilterObj(name);
      reduced.name = fullname;
    }
    let teacher = await Teacher.findOne({ staffID: ID });
    if (!teacher) {
      return res.status(401).send("Not Found");
    }
    if (teacher.staffID.toString() !== ID.toString()) {
      return res.status(401).send("Not Allowed");
    }
    let respones = await Teacher.findOneAndUpdate(
      { staffID: ID },
      { $set: reduced },
      { new: true }
    );
    return res.json(respones);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route to delete a teacher by staffID
Routes.delete("/delete/:staffID", async (req, res) => {
  const staffID = req.params.staffID;

  try {
    const deletedTeacher = await Teacher.findOneAndDelete({ staffID });

    if (!deletedTeacher) {
      return res.status(404).json({ msg: "Teacher not found" });
    }

    res.json({ msg: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Route to get all teachers
Routes.get("/allTeachers", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

Routes.post("/testing", async (req, res) => {
  let data = await ({ name, schoolID, contact, staffID } = req.body);

  let reduced = { schoolID, contact };
  reduced = FilterObj(reduced);

  if (name) {
    let fullname = ({ fname, mname, lname } = name);
    fullname = FilterObj(fullname);
    reduced.name = fullname;
  }

  return res.json(reduced);
});

Routes.post("/login", async (req, res) => {
  const { id, password } = await req.body;
  try {
    const teacher = await Teacher.findOne({ staffID: id, password });

    if (!teacher) {
      // return res.status(404).json({ msg: "Teacher not found" });
      return res.status(404).json([]);
    }
    // res.json(teacher);

    const jwtToken = jwt.sign(
      { staffID: teacher.staffID },
      process.env.JWT_KEY
    );

    res.status(201).json({ token: jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const jwt = require("jsonwebtoken");
//salt password using bcrypt
Routes.post("/salt", AddValidTeacher, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let addTeacher = req.body;
    let mypass = generatePass();
    // const salt = await bcrypt.genSalt(5);
    // const setpass = await bcrypt.hash(mypass, salt);
    // addTeacher.password = setpass;
    addTeacher.password = mypass;

    let newTeacher = new Teacher(addTeacher);

    await newTeacher.save();
    // const data = {

    // };
    // const jwtToken = jwt.sign(data, process.env.JWT_KEY);

    const jwtToken = jwt.sign(
      { staffID: newTeacher.staffID },
      process.env.JWT_KEY
    );
    res.status(201).json({ token: jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = Routes;

// function FilterObj(data) {
//   let newOBJ = {};
//   for (let i in data) {
//     if (data[i] !== "" && data[i] !== undefined) {
//       newOBJ[i] = data[i];
//     }
//   }
//   return newOBJ;
// }
