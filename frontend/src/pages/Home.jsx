import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await api.get('/properties')
        setFeatured(res.data.slice(0, 3))
      } catch (err) {
        console.log(err)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <div className="bg-[#0f0f0f] text-white">

      {/* Hero Section */}
      <div className="relative min-h-[600px] flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)' }}>

        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #e94560 0%, transparent 50%), radial-gradient(circle at 80% 50%, #e94560 0%, transparent 50%)' }} />

        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Find Your Dream
            <span className="text-[#e94560]"> Home in UAE</span>
          </h1>
          <p className="text-gray-400 text-xl mb-10">
            Discover premium properties across Dubai, Abu Dhabi and beyond
          </p>

          {/* Search Bar */}
          <div className="flex gap-3 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by city or property type..."
              className="flex-1 bg-[#1a1a2e] text-white px-6 py-4 rounded-2xl border border-white/10 outline-none focus:border-[#e94560] transition text-lg placeholder-gray-500"
            />
            <Link to="/properties"
              className="bg-[#e94560] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#c73652] transition text-lg">
              Search
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-[#1a1a2e] py-12 border-y border-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#e94560]">500+</div>
            <div className="text-gray-400 mt-2">Properties Listed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#e94560]">200+</div>
            <div className="text-gray-400 mt-2">Happy Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#e94560]">50+</div>
            <div className="text-gray-400 mt-2">Expert Agents</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#e94560]">15+</div>
            <div className="text-gray-400 mt-2">Cities Covered</div>
          </div>
        </div>
      </div>

      {/* Property Types */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Browse by <span className="text-[#e94560]">Type</span>
          </h2>
          <p className="text-gray-400">Find exactly what you're looking for</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { type: 'apartment', icon: '🏢', label: 'Apartment' },
            { type: 'villa', icon: '🏡', label: 'Villa' },
            { type: 'office', icon: '🏬', label: 'Office' },
            { type: 'shop', icon: '🏪', label: 'Shop' },
            { type: 'land', icon: '🌍', label: 'Land' }
          ].map(item => (
            <Link
              key={item.type}
              to={`/properties?type=${item.type}`}
              className="bg-[#1a1a2e] rounded-2xl p-6 text-center border border-white/10 hover:border-[#e94560] transition group">
              <div className="text-4xl mb-3">{item.icon}</div>
              <div className="font-semibold group-hover:text-[#e94560] transition">
                {item.label}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Properties */}
      <div className="bg-[#0a0a0a] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Featured <span className="text-[#e94560]">Properties</span>
            </h2>
            <p className="text-gray-400">Latest listings from our agents</p>
          </div>

          {featured.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400">No properties listed yet.</p>
              <Link to="/register"
                className="text-[#e94560] hover:underline mt-2 inline-block">
                Register as an agent to add listings →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featured.map(property => (
                <Link
                  key={property._id}
                  to={`/properties/${property._id}`}
                  className="bg-[#1a1a2e] rounded-2xl overflow-hidden border border-white/10 hover:border-[#e94560]/50 transition group block">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={property.images[0] || 'https://via.placeholder.com/500x300/1a1a2e/e94560?text=No+Image'}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold capitalize ${
                      property.purpose === 'sale'
                        ? 'bg-[#e94560] text-white'
                        : 'bg-green-500 text-white'
                    }`}>
                      For {property.purpose}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="text-[#e94560] font-bold text-xl mb-2">
                      AED {property.price.toLocaleString('en-US')}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">
                      📍 {property.location.city}, {property.location.address}
                    </p>
                    <div className="flex gap-4 text-gray-400 text-sm border-t border-white/10 pt-4">
                      {property.features.bedrooms > 0 &&
                        <span>🛏 {property.features.bedrooms} Beds</span>}
                      <span>🚿 {property.features.bathrooms} Baths</span>
                      <span>📐 {property.features.area} sqft</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/properties"
              className="bg-[#e94560] text-white px-10 py-4 rounded-2xl font-semibold hover:bg-[#c73652] transition text-lg">
              View All Properties →
            </Link>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1a1a2e] py-20 text-center border-t border-white/10">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">
            Are You a Real Estate <span className="text-[#e94560]">Agent?</span>
          </h2>
          <p className="text-gray-400 mb-8">
            List your properties and reach thousands of buyers across UAE
          </p>
          <Link to="/register"
            className="bg-[#e94560] text-white px-10 py-4 rounded-2xl font-semibold hover:bg-[#c73652] transition text-lg">
            Register as Agent →
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home