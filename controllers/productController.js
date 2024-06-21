var express = require('express');
var router = express.Router();
let db = require("../database/models")
let info = require("../db/info")
const { validationResult } = require("express-validator");
const {Op} = require("sequelize");

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
    search: function(req, res) {
        let searchTerm = req.query.search || '';

        console.log("Search Term:", searchTerm);

        db.Product.findAll({
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${searchTerm}%` } },
                    { description: { [Op.like]: `%${searchTerm}%` } }
                ]
            },
            include: [{ association: 'user' }],
            order: [["createdAt", "DESC"]]
        })
        .then(function(products) {
            console.log("Products found:", products);
            res.render("product-search", { products, searchTerm });
        })
        .catch(function(error) {
            console.log("Error:", error);
            res.status(500).send("Error al realizar la búsqueda");
        });
    },

    store: function(req,res){
        db.Product.create({
            title: req.body.title,
            description: req.body.description,
            image: req.body.image, 
        })
        .then(function(product) {
             
        })
        .catch(function(error) {
            console.error("Error al agregar el producto:", error);
            return res.status(500).send("Error al agregar el producto");
        });
    },

    addComment: function(req,res) {

        console.log("lleguee")
        return res.render("profile");


    },

    editProduct: function(req,res){
        let errors = validationResult(req);
        if (errors.isEmpty()) {
            let product = {
                title: req.body.title,
                artist: req.body.artist,
                release_date: req.body.release_date,
                image: req.body.image,
                description: req.body.description,
                createdAt: new Date().toLocaleString()
            };

            db.Product.update(product, {where:{ id : req.body.id }})
                .then(function(){
                    return res.redirect("/");
                })
                .catch(function(err){
                    console.log("Error al editar el producto", err);
                    return res.status(500).send("Error al editar el producto");
                });

        } else {
            return res.send(errors.mapped())
            res.render("product-edit", {
                    errors: errors.mapped(),
                    old: req.body
                });
        } 
    }
};

module.exports = product;