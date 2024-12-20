const Review = require('../models/Review');
const Property = require('../models/Property');
const { validationResult } = require('express-validator');

exports.getPropertyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ property: req.params.propertyId })
      .populate('user', 'name avatar')
      .sort('-createdAt');

    res.json(reviews);
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { rating, comment } = req.body;
    const propertyId = req.params.propertyId;

    // Check if user has already reviewed this property
    const existingReview = await Review.findOne({
      property: propertyId,
      user: req.user.userId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this property' });
    }

    const review = new Review({
      property: propertyId,
      user: req.user.userId,
      rating,
      comment
    });

    await review.save();

    // Update property average rating
    const property = await Property.findById(propertyId);
    const reviews = await Review.find({ property: propertyId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    property.rating = avgRating;
    await property.save();

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name avatar');

    res.status(201).json(populatedReview);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check ownership
    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    // Update property average rating
    const property = await Property.findById(review.property);
    const reviews = await Review.find({ property: review.property });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    property.rating = avgRating;
    await property.save();

    res.json(review);
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check ownership
    if (review.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await review.remove();

    // Update property average rating
    const property = await Property.findById(review.property);
    const reviews = await Review.find({ property: review.property });
    const avgRating = reviews.length 
      ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
      : 0;
    property.rating = avgRating;
    await property.save();

    res.json({ message: 'Review removed' });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 