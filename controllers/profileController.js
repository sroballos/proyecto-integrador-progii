var express = require('express');
var router = express.Router();
let info = require("../db/info")

let profile = {
    general: function(req,res){
        res.render("profile", {"info": info})
    },
    edit: function(req,res){
        res.render("profile-edit")
    }

}

module.exports = profile;