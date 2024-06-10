var express = require('express');
var router = express.Router();
let info = require("../db/info")
let db = require("../database/models")

let index = {
    index: function(req,res){
        db.Product.findAll()
        .then(function(data){
            res.send(data)
        })
        .catch()
        return console.log("hola")
        res.render("index", {"info":info})
    }
};

module.exports = index;