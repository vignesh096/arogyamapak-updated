const { body } = require("express-validator");

const AddValidData = [
  body("studentID").isMongoId().withMessage("Student ID is wrong"),
  body("staffID").isMongoId().withMessage("Teacher ID is wrong"),
  body("height").isNumeric().withMessage("H"),
];
const UpdateValidData = [];

module.exports = { AddValidData, UpdateValidData };
