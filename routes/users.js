var express = require('express');
var router = express.Router();
let usersController = require("../controllers/usersController");


router.get('/', usersController.general);
router.get('/edit', usersController.edit);
router.get('/register', usersController.general);
router.get('/login', usersController.general);



module.exports = router;