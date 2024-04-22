var express = require('express');
var router = express.Router();
let info = require("../db/info")


let index = {
    index: function(req,res){
        return res.render("index", {"info": info})
    }
};

module.exports = index;