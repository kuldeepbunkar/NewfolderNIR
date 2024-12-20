const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const paymentController = require('../controllers/payment.controller');
const auth = require('../middleware/auth');

router.post(
  '/process',
  auth,
  [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('paymentMethodId').notEmpty().withMessage('Payment method is required')
  ],
  paymentController.processPayment
);

router.get('/history', auth, paymentController.getPaymentHistory);

module.exports = router; 