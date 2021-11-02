const express = require ('express');
const router = express.Router();
const squareDetailsController = require ('../controllers/squareDetails');

router.get('/getByCustomer/:id', squareDetailsController.getByCustomer);
router.post('/add',squareDetailsController.add);

module.exports = router;