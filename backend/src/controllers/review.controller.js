const Review = require('../models/Review');
const Property = require('../models/Property');
const Activity = require('../models/Activity');

exports.createReview = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { rating, comment } = req.body;

    // Check if user has already reviewed
    const existingReview = await Review.findOne({
      property: propertyId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this property' });
    }

    const review = new Review({
      property: propertyId,
      user: req.user._id,
      rating,
      comment
    });

    await review.save();

    // Record activity
    await Activity.create({
      user: req.user._id,
      type: 'review_create',
      property: propertyId
    });

    res.status(201).json(review);
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// More review controller methods... 