var express = require('express');
var router = express.Router();
let productController = require("../controllers/productController")


router.get('/', productController.general);
router.get('/add', productController.add);

module.exports = router;


