var express = require('express');
var router = express.Router();


let product = {
    general: function(req,res){
        res.render("product")
    },
    add: function(req,res){
        res.render("product-add")
    }

}

module.exports = product;