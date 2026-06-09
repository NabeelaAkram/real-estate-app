const Property = require('../models/Property')

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate('postedBy', 'name email phone')
      .sort({ createdAt: -1 })
    res.json(properties)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Get single property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('postedBy', 'name email phone')
    if (!property) {
      return res.status(404).json({ error: 'Property not found' })
    }
    res.json(property)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// Create property
const createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      postedBy: req.user._id
    })
    res.status(201).json(property)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Update property
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.json(property)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}

// Delete property
const deleteProperty = async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id)
    res.json({ message: 'Property deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  getAllProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty
}