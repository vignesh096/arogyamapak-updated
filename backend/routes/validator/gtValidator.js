const { body } = require("express-validator");

const AddGTvalid = [
  body("height")
    .notEmpty()
    .withMessage("Height must be entered.")
    .isNumeric()
    .withMessage("Height is in sentemeter only."),
  body("weight")
    .notEmpty()
    .withMessage("Weight must be entered.")
    .isNumeric()
    .withMessage("Weight is in sentemeter only."),
  body("vision").isNumeric().withMessage("Vision is in sentemeter only."),
  body("hearing").isNumeric().withMessage("Hearing is in sentemeter only."),
  body("flexibility")
    .isString()
    .withMessage("Flexibility must be an String or Text only"),
  body("posture")
    .isString()
    .withMessage("Posture must be an String or Text only"),
];

module.exports = { AddGTvalid };





