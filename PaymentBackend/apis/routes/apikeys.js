
const express = require('express');
const router = express.Router();
const apikeyController = require('../controllers/apikeys');

router.post('/add', apikeyController.add);
router.get('/get', apikeyController.get);
module.exports = router;