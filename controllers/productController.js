var express = require('express');
var router = express.Router();
let db = require("../database/models")
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
    },
    store: function(req,res){
        db.Product.create(req.body)
        return res.redirect("/profile")
    }
    }

module.exports = product;