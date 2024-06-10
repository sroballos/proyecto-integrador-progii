var express = require('express');
var router = express.Router();
let info = require("../db/info")
let db = require("../database/models")

let index = {
    index: function(req,res){
        db.Product.findAll()
        .then(function(data){
           return res.render("index",{info:data})
        })
        .catch(function(error){
        return console.log(error)})
    }
};

module.exports = index;