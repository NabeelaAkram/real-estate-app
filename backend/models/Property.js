const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['apartment', 'villa', 'office', 'shop', 'land'],
    required: true
  },
  purpose: {
    type: String,
    enum: ['sale', 'rent'],
    required: true
  },
  location: {
    city: String,
    address: String
  },
  features: {
    bedrooms: Number,
    bathrooms: Number,
    area: Number,
    parking: Boolean,
    furnished: Boolean
  },
  images: [String],
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true })

module.exports = mongoose.model('Property', propertySchema)