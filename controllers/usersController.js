var express = require('express');
var router = express.Router();
let info = require("../db/info")
const db = require("../database/models");
const User = require('../database/models/User');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

let users = {
    general: function(req,res){
        return res.render("profile", {"info": info})
    },
    register: function(req,res){
        return res.render("register")
    },
    login: function(req,res){
        return res.render("profile", {"info": info})
        },
    edit: function(req,res){
        return res.render("profile-edit", {"info": info})
    },
    store: function(req, res) {
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
            console.log("resultValidation:", JSON.stringify(resultValidation, null, 4));
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        } else {
            bcrypt.hash(req.body.passW, 10)
                .then(hashedPassword => {
                    let user = {
                        email: req.body.email,
                        passW: hashedPassword,
                        dateBorn: req.body.dateBorn,
                        dni: req.body.dni,
                        profilePic: req.body.profilePic
                    };

                    return db.User.create(user);
                })
                .then(result => {
                    return res.redirect("/users/login");
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).send("Hubo un error en el registro. Intenta de nuevo.");
                });
        }
    }
};

module.exports = users;