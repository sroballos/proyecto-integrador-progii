var express = require('express');
var router = express.Router();
let info = require("../db/info");
let indexController = require("../controllers/indexController")

/* GET home page. */
router.get('/', indexController.index);

module.exports = router;
