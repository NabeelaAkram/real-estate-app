import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

function PropertyDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await api.get(`/properties/${id}`)
        setProperty(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      try {
        await api.delete(`/properties/${id}`)
        alert('Property deleted!')
        navigate('/properties')
      } catch (err) {
        alert('Error deleting property')
      }
    }
  }

  if (loading) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center text-white">
        <p className="text-gray-400">Loading property...</p>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Property Not Found</h2>
          <Link to="/properties" className="text-[#e94560] hover:underline">
            ← Back to Properties
          </Link>
        </div>
      </div>
    )
  }

  const isOwner = loggedInUser._id === property.postedBy?._id

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">

      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-6 pt-8 flex justify-between items-center">
        <Link to="/properties" className="text-gray-400 hover:text-[#e94560] transition">
          ← Back to Properties
        </Link>

        {isOwner && (
          <div className="flex gap-3">
            <Link
              to={`/edit-property/${id}`}
              className="bg-[#1a1a2e] border border-white/10 text-white px-5 py-2 rounded-xl hover:border-[#e94560] transition">
              ✏️ Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500/10 border border-red-500 text-red-500 px-5 py-2 rounded-xl hover:bg-red-500 hover:text-white transition">
              🗑️ Delete
            </button>
          </div>
        )}
      </div>

      {/* Image */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="relative rounded-2xl overflow-hidden h-[400px]">
          <img
            src={property.images[0] || 'https://via.placeholder.com/800x400/1a1a2e/e94560?text=No+Image'}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <span className={`absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-semibold capitalize ${
            property.purpose === 'sale'
              ? 'bg-[#e94560] text-white'
              : 'bg-green-500 text-white'
          }`}>
            For {property.purpose}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Side */}
        <div className="lg:col-span-2">
          <div className="text-[#e94560] font-bold text-3xl mb-2">
            AED {property.price.toLocaleString('en-US')}
          </div>
          <h1 className="text-3xl font-bold mb-3">{property.title}</h1>
          <p className="text-gray-400 mb-6">
            📍 {property.location.city}, {property.location.address}
          </p>

          {/* Quick Info */}
          <div className="flex gap-6 bg-[#1a1a2e] rounded-xl p-6 mb-8 border border-white/10">
            {property.features.bedrooms > 0 && (
              <div className="text-center">
                <div className="text-2xl mb-1">🛏</div>
                <div className="font-bold">{property.features.bedrooms}</div>
                <div className="text-gray-400 text-sm">Bedrooms</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-2xl mb-1">🚿</div>
              <div className="font-bold">{property.features.bathrooms}</div>
              <div className="text-gray-400 text-sm">Bathrooms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">📐</div>
              <div className="font-bold">{property.features.area} sqft</div>
              <div className="text-gray-400 text-sm">Area</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🏠</div>
              <div className="font-bold capitalize">{property.type}</div>
              <div className="text-gray-400 text-sm">Type</div>
            </div>
          </div>

          <h2 className="text-xl font-bold mb-3">Description</h2>
          <p className="text-gray-400 leading-relaxed">{property.description}</p>
        </div>

        {/* Right Side - Agent Card */}
        <div>
          <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/10 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Contact Agent</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#e94560] rounded-full flex items-center justify-center text-2xl font-bold">
                {property.postedBy?.name?.charAt(0) || 'A'}
              </div>
              <div>
                <div className="font-semibold">{property.postedBy?.name || 'Agent'}</div>
                <div className="text-gray-400 text-sm">Real Estate Agent</div>
              </div>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400">
                <span>✉️</span>
                <span>{property.postedBy?.email || 'N/A'}</span>
              </div>
            </div>
            <button className="w-full bg-[#e94560] text-white py-3 rounded-xl font-semibold hover:bg-[#c73652] transition mb-3">
              📞 Call Agent
            </button>
            <button className="w-full bg-[#0f0f0f] border border-white/10 text-white py-3 rounded-xl font-semibold hover:border-[#e94560] transition">
              ✉️ Send Message
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PropertyDetail