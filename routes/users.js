var express = require('express');
var router = express.Router();
let usersController = require("../controllers/usersController");
const {body} = require("express-validator");
const db = require("../database/models");

const validaciones = [
  body("email")
    .notEmpty().withMessage("Debes completar este campo").bail()
    .isEmail().withMessage("Escribí un mail válido"),
  body("password")
    .notEmpty().withMessage("Debes completar este campo").bail()
    .isLength({ min: 4 }).withMessage("Tu contraseña debe contener al menos 4 caracteres")
];

router.get('/profile', usersController.general);
router.get('/profile/edit', usersController.edit);
router.get('/register', usersController.register);
router.post('/register', validaciones, usersController.register);
router.get('/login', usersController.loginForm);
router.post('/login', validaciones, usersController.login);
router.post('/logout', usersController.logout);


module.exports = router;