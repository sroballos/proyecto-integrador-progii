var express = require('express');
var router = express.Router();
let info = require("../db/info")
const db = require("../database/models");
const User = require('../database/models/User');
const { validationResult } = require("express-validator");
const { store } = require('./productController');

let users = {
    general: function(req,res){
        return res.render("profile", {"info": info})
    },
    edit: function(req,res){
        return res.render("profile-edit", {"info": info})
    },
    register: function(req, res) {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            res.render("register", { title: "Formulario de Registro" });
        } else {
            res.render("register", { title: "Formulario de Registro", errors: errors.mapped(), old: req.body });
        }
    },
    login: function(req,res){
        return res.render("login", {"info": info})
    },

    store: function(req, res){
        let form = req.body;

        let user = {
            email: form.email,
            passW: form.passW,
            dateBorn : form.dateBorn,
            dni : form.dni,
            profilePic : form.profilePic
        };

        db.User.create(user)
            .then((result) => {
                return res.redirect("/profile/login");
            }).catch((err) => {
                return console.log(err);
            });
    },
};


module.exports = users;