var express = require('express');
var router = express.Router();
let info = require("../db/info")
const db = require("../database/models");
const User = require('../database/models/User');
const { validationResult } = require("express-validator");

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
};

module.exports = users;