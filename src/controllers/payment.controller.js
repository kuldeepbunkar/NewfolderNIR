const Payment = require('../models/Payment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
  try {
    const { amount, paymentMethodId } = req.body;

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'inr',
      payment_method: paymentMethodId,
      confirm: true
    });

    // Save payment record
    const payment = new Payment({
      user: req.user.userId,
      amount,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status
    });

    await payment.save();

    res.json({
      success: true,
      payment
    });
  } catch (error) {
    console.error('Payment processing error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.userId })
      .sort('-createdAt');

    res.json(payments);
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 