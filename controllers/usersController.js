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
    store: function (req, res) {      
        const resultValidation = validationResult(req)    
        if (!resultValidation.isEmpty()) {
            console.log("resultValidation:", JSON.stringify(resultValidation, null, 4));
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }else {
            
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

        }
    },
};



module.exports = users;