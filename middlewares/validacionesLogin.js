const {body} = require("express-validator");
const db = require("../database/models");
const bcryptjs = require("bcryptjs");

const validacionesLogin = [
    body("email")
        .notEmpty()
        .withMessage("Debes completar este campo").bail()
        .isEmail()
        .withMessage("Escribí un mail válido")
        .custom(function(value, {req}){
            return db.User.findOne({
                where: {email: value}
            })
            .then(function(userToLogin){
                if(!userToLogin){
                    throw new Error("No existe un usuario con este mail")
                }
            })

        }),

    body("passW")
        .notEmpty()
        .withMessage("Debes completar este campo")
        .custom(function(value, {req}){
            return db.User.findOne({
                where: {email: req.body.email}
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