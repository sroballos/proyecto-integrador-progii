var express = require('express');
var router = express.Router();
let info = require("../db/info")


let product = {
    general: function(req,res){
        return res.render("product", {"info": info})  
    },
    add: function(req,res){
        return res.render("product-add", {"info": info})
    },
    searchresults: function(req,res){
        return res.render("search-results", {"info": info})
    }
    }

module.exports = product;