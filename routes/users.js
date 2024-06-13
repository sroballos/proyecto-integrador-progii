var express = require('express');
var router = express.Router();
let usersController = require("../controllers/usersController.js");
let validacionesRegister = require("../middlewares/validacionesRegister.js")


router.get('/', usersController.general);
router.get('/edit', usersController.edit);
router.get('/register', usersController.register);
router.get('/login', usersController.login);

router.post('/register', validacionesRegister, usersController.registerStore);

module.exports = router;