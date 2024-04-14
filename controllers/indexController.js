var express = require('express');
var router = express.Router();


let product = {
    index: function(req,res){
        res.render("index")
    }
};

module.exports = product;