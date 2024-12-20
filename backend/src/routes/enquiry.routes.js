const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiry.controller');
const auth = require('../middleware/auth');

router.post('/property/:propertyId', auth, enquiryController.createEnquiry);
router.get('/sent', auth, enquiryController.getUserEnquiries);
router.get('/received', auth, enquiryController.getAgentEnquiries);
router.post('/:id/respond', auth, enquiryController.respondToEnquiry);
router.put('/:id/status', auth, enquiryController.updateEnquiryStatus);

module.exports = router; 