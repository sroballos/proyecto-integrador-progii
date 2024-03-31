var express = require('express');
var router = express.Router();
let profileController = require("../controllers/profileController");


router.get('/', profileController.general);
router.get('/edit', profileController.edit);


module.exports = router;