const express = require ('express');
const router = express.Router();
const paymentController = require ('../controllers/payment');

router.get('/getByOrganization/:id',paymentController.getByOrganization);
router.get('/getByCustomer/:id', paymentController.getByCustomer);
router.post('/addStripeOneTime/:id',paymentController.addStripeOneTime);
router.post('/addSquareOneTime/:id',paymentController.addSquareOneTime);
router.post('/addUserPayment/:id',paymentController.addUserPayment);

module.exports = router;