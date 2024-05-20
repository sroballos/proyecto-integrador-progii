var express = require('express');
var router = express.Router();
let productController = require("../controllers/productController");


router.get('/', productController.general);
router.get('/add', productController.add);
router.post("/agregar_producto", productController.store)
router.get('/searchresult', productController.searchresults);


module.exports = router;


