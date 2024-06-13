var express = require('express');
var router = express.Router();
let usersController = require("../controllers/usersController");
const {body} = require("express-validator");
const db = require("../database/models");

const validacionesRegister = [
  body("username")
    .notEmpty().withMessage("Debes completar este campo").bail()
    .isAlpha().withMessage("Tu usuario debe contener solo letras"),
  body("email")
    .notEmpty().withMessage("Debes completar este campo").bail()
    .isEmail().withMessage("Escribí un mail válido").bail()
    .custom(value => {
        return db.User.findOne({ where: { email: value } })
            .then(user => {
                if (user) {
                    return Promise.reject("Este mail ya está en uso, probá con otro");
                }
            });
    }),
  body("passW")
    .notEmpty().withMessage("Debes completar este campo").bail()
    .isLength({ min: 4 }).withMessage("Tu contraseña debe contener al menos 4 caracteres")
];

const validacionesLogin = [
  body("email")
      .notEmpty().withMessage("Debes completar este campo").bail()
      .isEmail().withMessage("Escribí un mail válido"),
  body("passW")
      .notEmpty().withMessage("Debes completar este campo")
];

router.get('/', usersController.general);
router.get('/edit', usersController.edit);
router.get('/register', usersController.register);
router.post('/register', validacionesRegister, usersController.store);
router.get('/login', usersController.login);


module.exports = router;