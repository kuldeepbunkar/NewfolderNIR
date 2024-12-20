const { ValidationError } = require('../utils/errors');
const { validationResult } = require('express-validator');

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationError = new ValidationError('Validation failed');
    
    errors.array().forEach(error => {
      validationError.addError(error.param, error.msg);
    });

    return next(validationError);
  }
  next();
};

// Example validation schema
exports.propertyValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('location.address').notEmpty().withMessage('Address is required'),
  validate
]; 