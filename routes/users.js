var express = require('express');
var router = express.Router();
let usersController = require("../controllers/usersController");
const {body} = require("express-validator");
const validaciones = [
    body("username")
    .notEmpty().withMessage("Debes completar este campo").bail()
    .isAlpha().withMessage("Tu usuario debe contener solo letras"),
    body("email")
    .notEmpty().withMessage("Debes completar este campo").bail()
    .isEmail().withMessage("Escribí un mail válido").bail()
    .custom(function(value, { req }){
        return db.User.findOne({
          where: { email: req.body.email },
        })
            .then(function(user){
               if(user){}
            })
     }).withMessage("Este mail ya está en uso, probá con otro"),
    body("password")
    .notEmpty().withMessage("Debes completar este campo").bail()
    .isLength({ min : 4 }).withMessage("Tu contraseña debe contener al menos 4 caracteres"),
]

router.get('/', usersController.general);
router.get('/edit', usersController.edit);
router.get('/register', validaciones, usersController.register);
router.post('/register', validaciones, usersController.register);
router.get('/login', usersController.login);



module.exports = router;