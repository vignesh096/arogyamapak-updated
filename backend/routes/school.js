const School = require("../DB/model/school");
const { body, validationResult } = require("express-validator");
const express = require("express");
const route = express.Router();
const {
  AddValidSchool,
  UpdateValidSchool,
} = require("./validator/schoolValidator");

route.post("/add", AddValidSchool, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newSchool = new School(req.body);
    await newSchool.save();
    res.status(201).json(newSchool);
  } catch (error) {
    console.error(error);

    res.status(500).send({ error: "Server Error", error });
  }
});
// Route to get all schools
route.get("/allSchool", async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});
//Route 3:  Route to get a specific school by ID
route.get("/info/:code", async (req, res) => {
  const schoolId = req.params.code;

  try {
    const school = await School.find({ code: schoolId });

    if (!school) {
      return res.status(404).json({ msg: "School not found" });
    }

    res.json(school);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Route 4:  Route to update a school by ID

route.put("/update/:code", UpdateValidSchool, async (req, res) => {
  const schoolId = req.params.code;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { code, name, village, subDistrict } = req.body;
    let updateInfo = {};
    if (code !== "") {
      updateInfo.code = code;
    }
    if (name !== "") {
      updateInfo.name = name;
    }
    if (village !== "") {
      updateInfo.village = village;
    }
    if (subDistrict !== "") {
      updateInfo.subDistrict = subDistrict;
    }

    const school = await School.findOne({ code: schoolId });
    if (!school) {
      return res.status(404).json({ msg: "School not found" });
    }
    if (school.code.toString() !== schoolId.toString()) {
      return res.status(404).json({ msg: "Not Allow" });
    }

    const updatedSchool = await School.findOneAndUpdate(
      { code: schoolId },
      { $set: updateInfo },
      { new: true }
    );

    return res.json(updatedSchool);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//Route 5 : Route to delete a school by ID
route.delete("/delete/:code", async (req, res) => {
  const code = req.params.code;
  if (!code) {
    return res.status(404).json({ msg: "School not found" });
  }
  try {
    const deletedSchool = await School.findOneAndDelete({ code: code });
    if (!deletedSchool) {
      return res.status(404).json({ msg: "School not found" });
    }

    res.json({ msg: "School deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = route;
