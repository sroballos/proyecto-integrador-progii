var express = require('express');
var router = express.Router();
let info = require("../db/info")

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
};

module.exports = users;