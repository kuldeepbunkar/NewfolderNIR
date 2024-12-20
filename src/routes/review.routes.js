const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const auth = require('../middleware/auth');

router.get('/property/:propertyId', reviewController.getPropertyReviews);

// Protected routes
router.use(auth);
router.post('/property/:propertyId', reviewController.createReview);
router.put('/:id', reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router; 