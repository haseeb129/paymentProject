const express = require ('express');
const router = express.Router();
const stripeDetailsController = require ('../controllers/stripeDetails');

router.get('/getByCustomer/:id', stripeDetailsController.getByCustomer);
router.post('/add',stripeDetailsController.add);

module.exports = router;