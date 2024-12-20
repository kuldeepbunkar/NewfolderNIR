const Property = require('../models/Property');
const Activity = require('../models/Activity');
const cloudinary = require('../config/cloudinary');
const { clearCache } = require('../middleware/cache');
const { NotFoundError, ValidationError } = require('../utils/errors');
const catchAsync = require('../utils/catchAsync');

exports.getAllProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, type, status, minPrice, maxPrice } = req.query;
    const query = {};

    if (type) query.type = type;
    if (status) query.status = status;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    const properties = await Property.find(query)
      .populate('owner', 'name email')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Property.countDocuments(query);

    res.json({
      properties,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProperty = catchAsync(async (req, res, next) => {
  const validationError = new ValidationError('Invalid property data');
  
  if (!req.body.title) {
    validationError.addError('title', 'Title is required');
  }
  if (!req.body.price) {
    validationError.addError('price', 'Price is required');
  }
  
  if (Object.keys(validationError.validationErrors).length > 0) {
    return next(validationError);
  }

  const property = await Property.create({
    ...req.body,
    owner: req.user._id
  });

  res.status(201).json(property);
});

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (property.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Object.assign(property, req.body);
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProperty = catchAsync(async (req, res, next) => {
  const property = await Property.findById(req.params.id);
  
  if (!property) {
    return next(new NotFoundError('Property'));
  }

  res.json(property);
});
  