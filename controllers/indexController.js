var express = require('express');
var router = express.Router();
let info = require("../db/info")
const db = require("../database/models")

let indexController = {
    index: function(req,res){
        db.Product.findAll({
            include: [{ model: db.User, as: "user" }],
            order: [["createdAt", "DESC"]],
        })

        .then(function(products){
            res.render("index",{products})
        })

        .catch(function(error){
            console.error("Error con los productos:", error)
            res.status(500).send("Error retrieving products");
        });
    }
};

module.exports = indexController;