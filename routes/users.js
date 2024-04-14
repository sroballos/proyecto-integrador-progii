var express = require('express');
var router = express.Router();
let usersController = require("../controllers/usersController");


router.get('/', usersController.general);
router.get('/edit', usersController.edit);
router.get('/register', usersController.register);
router.get('/login', usersController.login);



module.exports = router;