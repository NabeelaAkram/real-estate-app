import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'

function AddProperty() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    type: 'apartment',
    purpose: 'sale',
    city: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    parking: false,
    furnished: false,
    image: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        type: formData.type,
        purpose: formData.purpose,
        location: {
          city: formData.city,
          address: formData.address
        },
        features: {
          bedrooms: Number(formData.bedrooms) || 0,
          bathrooms: Number(formData.bathrooms) || 0,
          area: Number(formData.area) || 0,
          parking: formData.parking,
          furnished: formData.furnished
        },
        images: formData.image ? [formData.image] : []
      }

      await api.post('/properties', propertyData)

      alert('Property added successfully! 🎉')
      navigate('/properties')

    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Add New <span className="text-[#e94560]">Property</span>
          </h1>
          <p className="text-gray-400">Fill in the details to list your property</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-5 text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#1a1a2e] rounded-2xl p-8 border border-white/10 space-y-5">

          {/* Title */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Luxury Villa in Palm Jumeirah"
              className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the property..."
              rows="4"
              className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
              required
            />
          </div>

          {/* Price + Purpose */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Price (AED)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="500000"
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
                required
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Purpose</label>
              <select
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition">
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Property Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition">
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="shop">Shop</option>
              <option value="land">Land</option>
            </select>
          </div>

          {/* Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Dubai"
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
                required
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Palm Jumeirah"
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
                required
              />
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                placeholder="3"
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                placeholder="2"
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Area (sqft)</label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="1200"
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                name="parking"
                checked={formData.parking}
                onChange={handleChange}
                className="w-4 h-4"
              />
              Parking Available
            </label>
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                name="furnished"
                checked={formData.furnished}
                onChange={handleChange}
                className="w-4 h-4"
              />
              Furnished
            </label>
          </div>

          {/* Image URL */}
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
            />
            <p className="text-gray-500 text-xs mt-2">
              Tip: Search "Dubai apartment" on unsplash.com, right click an image → "Copy image address"
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#e94560] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#c73652] transition disabled:opacity-50">
            {loading ? 'Adding Property...' : 'Add Property'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default AddProperty
