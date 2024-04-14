var express = require('express');
var router = express.Router();
let info = require("../db/info")

let users = {
    general: function(req,res){
        res.render("profile", {"info": info})
    },
    edit: function(req,res){
        res.render("profile-edit")
    },
    register: function(req,res){
        res.render("register")
    },
    login: function(req,res){
        res.render("login")
    }
};

module.exports = users;