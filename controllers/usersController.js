var express = require('express');
var router = express.Router();
let info = require("../db/info")
const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');

let usersController = {
    general: function(req, res) {
        return res.render("profile", { "info": req.session.user }); 
    },

    register: function(req,res){
        let errors = validationResult(req);
        if (errors.isEmpty()){
            return res.render("register");
        } else {
            res.render("register", { errors: errors.mapped(), old: req.body });
        }
    },

    registerStore: function(req, res) {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let user = {
                username: req.body.username,
                email: req.body.email,
                passW: bcrypt.hashSync(req.body.passW, 10),
                dateBorn: req.body.dateBorn,
                dni: req.body.dni,
                profilePic: req.body.profilePic
            };

            db.User.create(user)
                .then(function (user){
                    return res.redirect("/profile/login");
                })
                .catch(function(err){
                    console.log("Error al guardar el usuario", err);
                    return res.status(500).send("Error al guardar el usuario");
                });

        } else {
            res.render("register", {
                    errors: errors.mapped(),
                    old: req.body
                });
        }           
     },
       
    login: function(req,res){
        return res.render("login")
    },

    loginProcess: function (req ,res) {
        db.User.findOne({
            where : {email : req.body.email}
        })
        .then(function(user) {
            if (user && bcrypt.compareSync(req.body.passW, user.passW)) {
                req.session.user = user;
                return res.redirect("/");
            } else {
                return res.render("login", {
                    errors: { email: { msg: "Credenciales inválidas" } }
                });
            }
        })
        .catch(function (err) {
            console.log("Error al logearse.", err)
            return res.status(500).send("Error al logearse");
        });

    },
        
    edit: function(req,res){
        return res.render("profile-edit");
    }

};



module.exports = usersController;