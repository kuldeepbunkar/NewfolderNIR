const Property = require('../models/Property');
const { validationResult } = require('express-validator');
const cloudinary = require('../utils/cloudinary');

exports.getAllProperties = async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
    const properties = await Property.find()
      .populate('owner', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Property.countDocuments();

    res.json({
      properties,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('owner', 'name email phone')
      .populate({
        path: 'reviews',
        populate: { path: 'user', select: 'name avatar' }
      });

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.json(property);
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createProperty = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const propertyData = {
      ...req.body,
      owner: req.user.userId
    };

    // Handle image uploads
    if (req.files) {
      const imagePromises = req.files.map(file => 
        cloudinary.uploader.upload(file.path)
      );
      const imageResults = await Promise.all(imagePromises);
      propertyData.images = imageResults.map(result => ({
        url: result.secure_url,
        caption: ''
      }));
    }

    const property = new Property(propertyData);
    await property.save();

    res.status(201).json(property);
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Handle new image uploads
    if (req.files?.length) {
      const imagePromises = req.files.map(file => 
        cloudinary.uploader.upload(file.path)
      );
      const imageResults = await Promise.all(imagePromises);
      const newImages = imageResults.map(result => ({
        url: result.secure_url,
        caption: ''
      }));
      req.body.images = [...property.images, ...newImages];
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json(updatedProperty);
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check ownership
    if (property.owner.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await property.remove();
    res.json({ message: 'Property removed' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchProperties = async (req, res) => {
  try {
    const {
      type,
      location,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      amenities
    } = req.query;

    const query = {};

    if (type) query.type = type;
    if (location) query['location.city'] = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }
    if (bedrooms) query['features.bedrooms'] = bedrooms;
    if (bathrooms) query['features.bathrooms'] = bathrooms;
    if (amenities) query.amenities = { $all: amenities.split(',') };

    const properties = await Property.find(query)
      .populate('owner', 'name email')
      .sort('-createdAt');

    res.json(properties);
  } catch (error) {
    console.error('Search properties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getFeaturedProperties = async (req, res) => {
  try {
    const properties = await Property.find({ featured: true })
      .populate('owner', 'name email')
      .limit(6);

    res.json(properties);
  } catch (error) {
    console.error('Get featured properties error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 