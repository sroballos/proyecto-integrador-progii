var express = require('express');
var router = express.Router();
const {body} = require("express-validator");
const controller = require("../controllers/usersController.js")
const db = require("../database/models");
const bcryptjs = require("bcryptjs");


// validaciones register
const validacionesRegister = [

    body("username")
      .notEmpty().withMessage("Por favor, inserte un nombre de usuario").bail()
      .isAlpha().withMessage("Tu usuario debe contener solo letras"),

    body("email")
      .isEmail().withMessage("Debes completar un email válido").bail()
      .custom(function(value, {req}){
        return db.User.findOne({
              where: { email: req.body.email },
            })
             .then(function (user){
                if (user){
                    throw new Error("Este mail ya está en uso, probá con otro");
                    }
            })
        }),

  body("passW")
    .notEmpty().withMessage("Por favor, inserte una contraseña").bail()
    .isLength({ min: 4 }).withMessage("Tu contraseña debe contener al menos 4 caracteres")

];

const validacionesLogin = [

    body("email")
      .isEmail().withMessage("Debes completar un mail válido").bail()
      .custom(function(value, {req}){
        return db.User.findOne({
            where: {email: req.body.email}
           })
            .then(function(user){
                if(!user){
                 throw new Error("No existe un usuario con este mail")
                 }
            });

        }),

    body("passW")
      .notEmpty().withMessage("Debes completar este campo")
      .custom(function(value, {req}){
        return db.User.findOne({
            where: {passW: req.body.passW}
           })
            .then(function(user){
                if(user){
                    const passW = user.passW
                    const passwordOk = bcryptjs.compareSync(value, passW);
                    if(!passwordOk){
                        throw new Error("Contraseña incorrecta")
                    }
                }
            })
        })
  ];

  


  router.get('/register', controller.register);
  router.post('/register', validacionesRegister, controller.registerStore);


  router.get('/login', controller.login);
  router.post('/login', validacionesLogin, controller.loginProcess);

  router.post('/logout', controller.logout);

  router.get('/edit', controller.edit);
  

  router.get('/:id?', controller.general);
  
  router.post("/edit" , controller.storeEdit)




module.exports = router;