var express = require('express');
var router = express.Router();
let info = require("../db/info")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { "info": info });
});

module.exports = router;
