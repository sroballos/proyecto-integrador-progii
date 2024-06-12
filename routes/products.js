var express = require('express');
var router = express.Router();
let productController = require("../controllers/productController");


router.get('/add', productController.add);
router.get('/edit/:id', productController.edit);
router.post("/agregar_producto", productController.store)
router.get('/searchresult', productController.searchresults)
router.get('/:id?', productController.general);


module.exports = router;


