
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.post('/addAdmin', authController.addAdmin);
router.post('/signup', authController.signupWithEmail);
router.post('/login', authController.loginWithEmail);
router.get('/customers',authController.getAllCustomers);
router.get('/admins',authController.getAllAdmins);
router.get('/', authController.getAll);
router.delete('/delete/:id', authController.delete);
router.patch('/updatePassword/:id', authController.updatePassword);
module.exports = router;