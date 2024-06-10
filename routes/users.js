var express = require('express');
var router = express.Router();
let usersController = require("../controllers/usersController");
const {body} = require("express-validator");
const validaciones = [
    body("username")
    .notEmpty().withMessage("Debes completar este campo").bail()
    .isAlpha().withMessage("Tu usuario debe contener solo letras"),
    body("email").isEmail().notEmpty().custom(function(value, { req }){
        return db.User.findOne({
          where: { email: req.body.email },
        })
            .then(function(user){
               if(user){}
            })
 }).withMessage("Debes completar este campo"),
    body("password").isLength({ min : 5 }).notEmpty().withMessage("Debes completar este campo"),
    body("fechaNacimiento").notEmpty().withMessage("Debes completar este campo"),
    body("nroDocumento").notEmpty().withMessage("Debes completar este campo"),
    body("fotoPerfil").notEmpty().withMessage("Debes completar este campo"),
 
]

router.get('/', usersController.general);
router.get('/edit', usersController.edit);
router.get('/register', validaciones, usersController.register);
router.post('/register', validaciones, usersController.register);
router.get('/login', usersController.login);



module.exports = router;