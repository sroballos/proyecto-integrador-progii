var express = require('express');
var router = express.Router();
let productController = require("../controllers/productController");
const {body} = require("express-validator");

const validacionesEdicionCreacion = [
    body("title").notEmpty().withMessage("Por favor, inserte un título.").bail(),
    body("artist").notEmpty().withMessage("Por favor, inserte un artista.").bail(),
    body("release_date").notEmpty().withMessage("Por favor, inserte una fecha de publicación.").bail(),
    body("imagen").notEmpty().withMessage("Por favor, inserte una imagen.").bail(),
    body("descripcion").notEmpty().withMessage("Por favor, inserte una descripción.")
]

router.get('/add', productController.add);
router.get('/edit/:id', productController.edit);
router.post("/agregar_producto", productController.store);
router.get('/search', productController.search);
router.get('/:id?', productController.general);

router.post("/edit", validacionesEdicionCreacion, productController.editProduct);


module.exports = router;


