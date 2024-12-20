const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/property.controller');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const upload = require('../middleware/upload');
const cache = require('../middleware/cache');

// Public routes
router.get('/', cache.cacheMiddleware(300), propertyController.getAllProperties);
router.get('/search', propertyController.searchProperties);
router.get('/:id', cache.cacheMiddleware(300), propertyController.getPropertyById);

// Protected routes
router.use(auth);
router.post('/', 
  checkRole(['agent', 'admin']),
  upload.array('images', 10),
  propertyController.createProperty
);

router.put('/:id',
  checkRole(['agent', 'admin']),
  upload.array('images', 10),
  propertyController.updateProperty
);

router.delete('/:id',
  checkRole(['agent', 'admin']),
  propertyController.deleteProperty
);

router.post('/:id/favorite', propertyController.toggleFavorite);
router.get('/user/favorites', propertyController.getUserFavorites);

module.exports = router; 