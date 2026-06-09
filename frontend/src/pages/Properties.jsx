import { useState } from 'react'
import { Link } from 'react-router-dom'

const allProperties = [
  {
    id: 1,
    title: "Luxury Villa in Palm Jumeirah",
    price: "AED 5,500,000",
    location: "Palm Jumeirah, Dubai",
    beds: 5, baths: 6,
    area: "8,500 sqft",
    type: "Villa",
    purpose: "Sale",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500"
  },
  {
    id: 2,
    title: "Modern Apartment in Downtown",
    price: "AED 120,000/year",
    location: "Downtown Dubai",
    beds: 2, baths: 2,
    area: "1,200 sqft",
    type: "Apartment",
    purpose: "Rent",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500"
  },
  {
    id: 3,
    title: "Stunning Sea View Apartment",
    price: "AED 2,800,000",
    location: "Dubai Marina",
    beds: 3, baths: 3,
    area: "2,100 sqft",
    type: "Apartment",
    purpose: "Sale",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500"
  },
  {
    id: 4,
    title: "Spacious Office in Business Bay",
    price: "AED 180,000/year",
    location: "Business Bay, Dubai",
    beds: 0, baths: 2,
    area: "3,500 sqft",
    type: "Office",
    purpose: "Rent",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500"
  },
  {
    id: 5,
    title: "Elegant Villa in Emirates Hills",
    price: "AED 12,000,000",
    location: "Emirates Hills, Dubai",
    beds: 6, baths: 7,
    area: "12,000 sqft",
    type: "Villa",
    purpose: "Sale",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500"
  },
  {
    id: 6,
    title: "Cozy Studio in JVC",
    price: "AED 45,000/year",
    location: "Jumeirah Village Circle",
    beds: 1, baths: 1,
    area: "550 sqft",
    type: "Apartment",
    purpose: "Rent",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500"
  }
]

function Properties() {
  const [search, setSearch] = useState('')
  const [purpose, setPurpose] = useState('')
  const [type, setType] = useState('')

  const filtered = allProperties.filter(p => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
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
            placeholder="🔍 Search by title or location..."
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
            <option value="Sale">For Sale</option>
            <option value="Rent">For Rent</option>
          </select>

          {/* Type Filter */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-[#1a1a2e] text-white px-4 py-3 rounded-xl outline-none border border-white/10">
            <option value="">All Types</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Office">Office</option>
            <option value="Shop">Shop</option>
            <option value="Land">Land</option>
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
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No Properties Found</h3>
            <p className="text-gray-400">Try different search terms or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((property) => (
              <div key={property.id}
                className="bg-[#1a1a2e] rounded-2xl overflow-hidden border border-white/10 hover:border-[#e94560]/50 transition group cursor-pointer">

                {/* Image */}
                <div className="relative overflow-hidden h-52">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    property.purpose === 'Sale'
                      ? 'bg-[#e94560] text-white'
                      : 'bg-green-500 text-white'
                  }`}>
                    For {property.purpose}
                  </span>
                  <span className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {property.type}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="text-[#e94560] font-bold text-xl mb-2">
                    {property.price}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {property.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    📍 {property.location}
                  </p>
                  <div className="flex gap-4 text-gray-400 text-sm border-t border-white/10 pt-4">
                    {property.beds > 0 && <span>🛏 {property.beds} Beds</span>}
                    <span>🚿 {property.baths} Baths</span>
                    <span>📐 {property.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Properties