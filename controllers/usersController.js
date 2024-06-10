var express = require('express');
var router = express.Router();
let info = require("../db/info")
let db = require("../database/models");
const User = require('../database/models/User');
const { validationResult } = require("express-validator");

let users = {
    general: function(req,res){
        return res.render("profile", {"info": info})
    },
    edit: function(req,res){
        return res.render("profile-edit", {"info": info})
    },
    register: (req, res) => {
        let errors = validationResult(req);
        if (errors.isEmpty()){

        } else {
            res.render ("register",{errors: errors.mapped(), old: req.body});
        }
    },
    login: function(req,res){
        return res.render("login", {"info": info})
    },
};

module.exports = users;