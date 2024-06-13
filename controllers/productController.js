var express = require('express');
var router = express.Router();
let db = require("../database/models")
let info = require("../db/info")


let product = {
    general: function(req,res){
        db.Product.findByPk(req.params.id,{
            include: [{association:"user"}, {association:"comments", include:[{association:"commentUser"}]}]
        })
        .then(function(data){
            if (data){
            return res.render("product", {info:data})} else{
            return res.render("product", {info:-1})
            }
        })
        .catch(function(error){
            return console.log(error)
        })
    },
    add: function(req,res){
        return res.render("product-add", {"info": info})
    },
    edit: function(req,res){
        db.Product.findByPk(req.params.id,{
            include: [{association:"user"}]
        })
        .then(function(data){
            return res.render("product-edit", {info:data})
        })
        .catch(function(error){
            return console.log(error)
        })
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