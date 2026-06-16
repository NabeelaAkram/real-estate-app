import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'

function Properties() {
  const [allProperties, setAllProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [purpose, setPurpose] = useState('')
  const [type, setType] = useState('')

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await api.get('/properties')
        setAllProperties(res.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchProperties()
  }, [])

  const filtered = allProperties.filter(p => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.city.toLowerCase().includes(search.toLowerCase())
    ) &&
    (purpose === '' || p.purpose === purpose) &&
    (type === '' || p.type === type)
  })

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">

      {/* Header */}
      <div className="bg-[#1a1a2e] py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">
          All <span className="text-[#e94560]">Properties</span>
        </h1>
        <p className="text-gray-400">Find your perfect property in UAE</p>
      </div>

      {/* Filters */}
      <div className="bg-[#111111] py-6 px-6 border-b border-white/10">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-4">

          {/* Search */}
          <input
            type="text"
            placeholder="🔍 Search by title or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-[#1a1a2e] text-white px-4 py-3 rounded-xl outline-none border border-white/10 min-w-[200px] placeholder-gray-400"
          />

          {/* Purpose Filter */}
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="bg-[#1a1a2e] text-white px-4 py-3 rounded-xl outline-none border border-white/10">
            <option value="">All Purposes</option>
            <option value="sale">For Sale</option>
            <option value="rent">For Rent</option>
          </select>

          {/* Type Filter */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-[#1a1a2e] text-white px-4 py-3 rounded-xl outline-none border border-white/10">
            <option value="">All Types</option>
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="office">Office</option>
            <option value="shop">Shop</option>
            <option value="land">Land</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => { setSearch(''); setPurpose(''); setType('') }}
            className="bg-[#e94560] text-white px-6 py-3 rounded-xl hover:bg-[#c73652] transition">
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <p className="text-gray-400">
          Showing <span className="text-white font-bold">{filtered.length}</span> properties
        </p>
      </div>

      {/* Properties Grid */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-400">Loading properties...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No Properties Found</h3>
            <p className="text-gray-400">Try different search terms or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property) => (
              <Link to={`/properties/${property._id}`} key={property._id}
                className="bg-[#1a1a2e] rounded-2xl overflow-hidden border border-white/10 hover:border-[#e94560]/50 transition group cursor-pointer block">

                {/* Image */}
                <div className="relative overflow-hidden h-52">
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
                  <span className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm capitalize">
                    {property.type}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="text-[#e94560] font-bold text-xl mb-2">
                    AED {property.price.toLocaleString()}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    📍 {property.location.city}, {property.location.address}
                  </p>
                  <div className="flex gap-4 text-gray-400 text-sm border-t border-white/10 pt-4">
                    {property.features.bedrooms > 0 && <span>🛏 {property.features.bedrooms} Beds</span>}
                    <span>🚿 {property.features.bathrooms} Baths</span>
                    <span>📐 {property.features.area} sqft</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Properties