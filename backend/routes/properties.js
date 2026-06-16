const express = require('express')
const router = express.Router()
const { protect, agentOnly } = require('../middleware/authMiddleware')
const {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController')

router.get('/', getAllProperties)
router.get('/:id', getProperty)
router.post('/', protect, agentOnly, createProperty)
router.put('/:id', protect, agentOnly, updateProperty)
router.delete('/:id', protect, agentOnly, deleteProperty)
module.exports = router