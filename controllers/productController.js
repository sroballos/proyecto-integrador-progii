var express = require('express');
var router = express.Router();


let product = {
    general: function(req,res){
        res.render("product")
    },
    add: function(req,res){
        res.render("product-add")
    },
    searchresults: function(req,res){
        res.render("search-results")
    }
    }

module.exports = product;