var express = require('express');
var router = express.Router();


let index = {
    index: function(req,res){
        return res.render("index")
    }
};

module.exports = index;