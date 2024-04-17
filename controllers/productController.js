var express = require('express');
var router = express.Router();


let product = {
    general: function(req,res){
        return res.render("product")  
    },
    add: function(req,res){
        return res.render("product-add")
    },
    searchresults: function(req,res){
        return res.render("search-results")
    }
    }

module.exports = product;