var express = require('express');
var router = express.Router();
let info = require("../db/info")
const db = require("../database/models");
const User = require('../database/models/User.js');
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

let usersController = {
    general: function(req,res){
        return res.render("profile", {"info": info})
    },


    register: function(req,res){
        return res.render("register")
    },

    registerStore: function(req, res) {

        const resultValidation = validationResult(req);

        if (!resultValidation.isEmpty()) {
            console.log("resultValidation:", JSON.stringify(resultValidation, null, 4));
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });

        } else {

            let user = {
                email: req.body.email,
                passW: bcrypt.hashSync(req.body.passW, 10),
                dateBorn: req.body.dateBorn,
                dni: req.body.dni,
                profilePic: req.body.profilePic
            };


            db.User.create(user)
                .then(function (user){
                    return res.redirect("/users/login");
                })
                .catch(function(err){
                    console.log("Error al guardar el usuario");
                });
        }
    },

    login: function(req,res){
        return res.render("login")
        },

    function (req ,res) {
        db.User.findOne({
            where : [{
                email : req.body.email
            }]
        })
        .then(function (user) {
            req.session.user = user;
            console.log("user : " , user)
            res.redirect("/")

        })
        .catch(function (err) {
            console.log("Error al logearse.")
        })

    } ,
        
    edit: function(req,res){
        return res.render("profile-edit")
    },

};



module.exports = usersController;