const {body} = require("express-validator");
const db = require("../database/models");
const bcryptjs = require("bcryptjs");

const validacionesLogin = [
    body("email")
        .notEmpty().withMessage("Debes completar este campo").bail()
        .isEmail().withMessage("Escribí un mail válido"),
    body("passW")
        .notEmpty().withMessage("Debes completar este campo")
  ];