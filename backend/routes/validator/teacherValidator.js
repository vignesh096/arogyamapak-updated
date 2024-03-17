const { body } = require("express-validator");

const AddValidTeacher = [
  body("name.fname")
    .isAlpha()
    .withMessage("Name must contain only alphabetic characters")
    .isString()
    .withMessage("First name must be a string"),

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
  body("schoolID")
    .isNumeric()
    .withMessage("School ID must be a number")
    .withMessage("Please fill proper school code"),
  body("contact")
    .isString()
    .withMessage("Contact must be a string")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact must be a 10-digit number"),
];

const UpdateValidTeacher = [
  body("name.fname")
    .isAlpha()
    .withMessage("Name must contain only alphabetic characters")
    .isString()
    .withMessage("First name must be a string")
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
  body("schoolID")
    .isNumeric()
    .withMessage("School ID must be a number")
    .withMessage("Please fill proper school code")
    .optional(),
  body("contact")
    .isString()
    .withMessage("Contact must be a string")
    .isLength({ min: 10, max: 10 })
    .withMessage("Contact must be a 10-digit number")
    .optional(),
];
module.exports = { AddValidTeacher, UpdateValidTeacher };
