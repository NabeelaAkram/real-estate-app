import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'

function EditProperty() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    title: '', description: '', price: '',
    type: 'apartment', purpose: 'sale',
    city: '', address: '',
    bedrooms: '', bathrooms: '', area: '',
    parking: false, furnished: false, image: ''
  })

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`)
        const p = res.data
        setFormData({
          title: p.title,
          description: p.description,
          price: p.price,
          type: p.type,
          purpose: p.purpose,
          city: p.location.city,
          address: p.location.address,
          bedrooms: p.features.bedrooms,
          bathrooms: p.features.bathrooms,
          area: p.features.area,
          parking: p.features.parking,
          furnished: p.features.furnished,
          image: p.images[0] || ''
        })
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)
    try {
      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        type: formData.type,
        purpose: formData.purpose,
        location: { city: formData.city, address: formData.address },
        features: {
          bedrooms: Number(formData.bedrooms) || 0,
          bathrooms: Number(formData.bathrooms) || 0,
          area: Number(formData.area) || 0,
          parking: formData.parking,
          furnished: formData.furnished
        },
        images: formData.image ? [formData.image] : []
      }
      await api.put(`/properties/${id}`, propertyData)
      alert('Property updated successfully! ✅')
      navigate(`/properties/${id}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center text-white">
      <p>Loading...</p>
    </div>
  )

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white px-6 py-10">
      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Edit <span className="text-[#e94560]">Property</span>
          </h1>
          <p className="text-gray-400">Update your property details</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-5 text-sm">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-[#1a1a2e] rounded-2xl p-8 border border-white/10 space-y-5">

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition" required />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              rows="4" className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Price (AED)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange}
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition" required />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Purpose</label>
              <select name="purpose" value={formData.purpose} onChange={handleChange}
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition">
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Property Type</label>
            <select name="type" value={formData.type} onChange={handleChange}
              className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition">
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="office">Office</option>
              <option value="shop">Shop</option>
              <option value="land">Land</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">City</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange}
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition" required />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange}
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition" required />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Bedrooms</label>
              <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleChange}
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Bathrooms</label>
              <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange}
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition" />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Area (sqft)</label>
              <input type="number" name="area" value={formData.area} onChange={handleChange}
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition" />
            </div>
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" name="parking" checked={formData.parking} onChange={handleChange} className="w-4 h-4" />
              Parking Available
            </label>
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" name="furnished" checked={formData.furnished} onChange={handleChange} className="w-4 h-4" />
              Furnished
            </label>
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-2 block">Image URL</label>
            <input type="text" name="image" value={formData.image} onChange={handleChange}
              placeholder="https://images.unsplash.com/..."
              className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600" />
          </div>

          <div className="flex gap-4">
            <button type="submit" disabled={saving}
              className="flex-1 bg-[#e94560] text-white py-3 rounded-xl font-semibold hover:bg-[#c73652] transition disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button type="button" onClick={() => navigate(`/properties/${id}`)}
              className="flex-1 bg-[#0f0f0f] border border-white/10 text-white py-3 rounded-xl font-semibold hover:border-[#e94560] transition">
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default EditProperty