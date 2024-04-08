var express = require('express');
var router = express.Router();
let profileController = require("../controllers/usersController");


router.get('/', profileController.general);
router.get('/edit', profileController.edit);
router.get('/register', profileController.general);
router.get('/login', profileController.general);



module.exports = router;