const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', propertyController.getAllProperties);
router.get('/featured', propertyController.getFeaturedProperties);
router.get('/:id', propertyController.getPropertyById);
router.get('/search', propertyController.searchProperties);

// Protected routes
router.use(auth);
router.post('/', upload.array('images', 10), propertyController.createProperty);
router.put('/:id', upload.array('images', 10), propertyController.updateProperty);
router.delete('/:id', propertyController.deleteProperty);
router.post('/:id/favorite', propertyController.toggleFavorite);

module.exports = router; 