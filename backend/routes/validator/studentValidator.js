const { body } = require("express-validator");

const AddValidStudent = [
  body("name.fname")
    .isString()
    .withMessage("First name must be a string")
    .isAlpha()
    .withMessage("Name must contain only alphabetic characters"),
  body("name.mname")
    .isString()
    .withMessage("Middle name must be a string")
    .isAlpha()
    .withMessage("Name must contain only alphabetic characters"),
  body("name.lname")
    .isString()
    .withMessage("Last name must be a string")
    .isAlpha()
    .withMessage("Name must contain only alphabetic characters"),
  body("contact")
    .isString()
    .withMessage("Contact must be a string")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter 10-digit contact number."),

  body("dateOfBirth").isString().withMessage("DOB must be a string"),
];
const UpdateValidStudent = [
  body("name.fname")
    .isString()
    .withMessage("First name must be a string")
    .isAlpha()
    .withMessage("Name must contain only alphabetic characters")
    .optional(),
  body("name.mname")
    .isString()
    .withMessage("Middle name must be a string")
    .isAlpha()
    .withMessage("Name must contain only alphabetic characters")
    .optional(),
  body("name.lname")
    .isString()
    .withMessage("Last name must be a string")
    .isAlpha()
    .withMessage("Name must contain only alphabetic characters")
    .optional(),
  body("contact")
    .isString()
    .withMessage("Contact must be a string")
    .isLength({ min: 10, max: 10 })
    .withMessage("Please enter 10-digit contact number.")
    .optional(),
  body("teacherID").isNumeric().withMessage("Invalid teacher ID").optional(),
  body("dateOfBirth").isString().withMessage("DOB must be a string"),
];

module.exports = { AddValidStudent, UpdateValidStudent };
