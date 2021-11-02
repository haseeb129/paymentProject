const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizations');

router.post('/add', organizationController.insert);
router.get('/get', organizationController.get);
router.patch('/update/:id', organizationController.update);
router.delete('/delete/:id', organizationController.delete);
module.exports = router;
