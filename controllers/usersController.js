var express = require('express');
var router = express.Router();
let info = require("../db/info")
let db = require("../database/models");
const User = require('../database/models/User');

let users = {
    general: function(req,res){
        return res.render("profile", {"info": info})
    },
    edit: function(req,res){
        return res.render("profile-edit", {"info": info})
    },
    register: function(req,res){
        return res.render("register", {"info": info})
    },
    login: function(req,res){
        return res.render("login", {"info": info})
    },
    store: (req,res) => {
        let errors = validaciones(req);
        if (errors.isEmpty()) {
            let user = req.body;
            userID = User.create(user);
            res.redirect("/users/" + userID);
        } else {
            res.render("users/create")
        }

    },
};

module.exports = users;