const { validationResult } = require('express-validator');

exports.propertyValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('type').isIn(['apartment', 'villa', 'house', 'plot', 'commercial'])
    .withMessage('Invalid property type'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('location.address').trim().notEmpty().withMessage('Address is required'),
  body('location.city').trim().notEmpty().withMessage('City is required'),
  body('features.bedrooms').optional().isNumeric()
    .withMessage('Bedrooms must be a number'),
  body('features.bathrooms').optional().isNumeric()
    .withMessage('Bathrooms must be a number'),
  body('features.area').optional().isNumeric()
    .withMessage('Area must be a number')
];

exports.reviewValidation = [
  body('rating').isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty()
    .withMessage('Comment is required')
    .isLength({ min: 10 })
    .withMessage('Comment must be at least 10 characters long')
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}; 