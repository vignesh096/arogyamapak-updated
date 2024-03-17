const { body } = require("express-validator");

const AddValidSchool = [
  // body("code").isNumeric().withMessage("ID must be a number"),
  body("name")
    .isString()
    .withMessage("Name must be a string")

    .withMessage("School name must contain only alphabetic characters"),
  body("village")
    .isString()
    .withMessage("Village must be a string")
    .isAlpha()
    .withMessage("Village name must contain only alphabetic characters"),

  body("subDistrict")
    .isString()
    .withMessage("Subdistrict must be a string")
    .isAlpha()
    .withMessage("Subdistrict name must contain only alphabetic characters"),
];

const UpdateValidSchool = [
  body("name")
    .isString()
    .withMessage("Name must be a string")

    .withMessage("School name must contain only alphabetic characters")
    .optional(),
  body("village")
    .isString()
    .withMessage("Village must be a string")
    .isAlpha()
    .withMessage("Village name must contain only alphabetic characters")
    .optional(),
  body("subDistrict")
    .isString()
    .withMessage("Subdistrict must be a string")
    .isAlpha()
    .withMessage("Subdistrict name must contain only alphabetic characters")
    .optional(),
];

module.exports = { AddValidSchool, UpdateValidSchool };
