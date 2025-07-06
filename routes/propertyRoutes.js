const express = require('express')
const router = express.Router();

const {
  createProperty,
  getProperties,
  getProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

const auth = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware')
const rateLimiter = require('../middlewares/rateLimiter')

//Public Routes — anyone can browse/search properties
router.get('/', rateLimiter, getProperties); // Search, filters, pagination
router.get('/:id', getProperty); // View a single property

//Admin-only Routes — only admins can manage property listings
router.post('/', auth, authorizeRoles('admin'), createProperty);
router.put('/:id', auth, authorizeRoles('admin'), updateProperty);
router.delete('/:id', auth, authorizeRoles('admin'), deleteProperty);

module.exports = router;
