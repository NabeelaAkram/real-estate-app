import { Link } from 'react-router-dom'

const properties = [
  {
    id: 1,
    title: "Luxury Villa in Palm Jumeirah",
    price: "AED 5,500,000",
    location: "Palm Jumeirah, Dubai",
    beds: 5,
    baths: 6,
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
    beds: 2,
    baths: 2,
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
    beds: 3,
    baths: 3,
    area: "2,100 sqft",
    type: "Apartment",
    purpose: "Sale",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500"
  }
]

function Home() {
  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#0f3460] py-32 px-6 text-center overflow-hidden">

        {/* Background circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#e94560]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0f3460]/50 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="bg-[#e94560]/20 text-[#e94560] px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block">
            #1 Real Estate Platform in UAE
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find Your Dream
            <span className="text-[#e94560]"> Property </span>
            in UAE
          </h1>
          <p className="text-xl text-gray-400 mb-10">
            Discover thousands of premium properties for sale and rent across Dubai, Abu Dhabi and UAE
          </p>

          {/* Search Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex flex-wrap gap-3 max-w-3xl mx-auto border border-white/20">
            <input
              type="text"
              placeholder="🔍 Search by city, area or property..."
              className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 outline-none text-lg min-w-[200px]"
            />
            <select className="bg-white/20 text-white px-4 py-3 rounded-xl outline-none">
              <option value="">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
            <button className="bg-[#e94560] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#c73652] transition text-lg">
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-16 flex-wrap">
            {[
              { number: '500+', label: 'Properties' },
              { number: '200+', label: 'Happy Clients' },
              { number: '50+', label: 'Expert Agents' },
              { number: '15+', label: 'UAE Cities' }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-[#e94560]">{stat.number}</div>
                <div className="text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Types */}
      <div className="py-20 px-6 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Browse by <span className="text-[#e94560]">Property Type</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">Find the perfect property that suits your needs</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: '🏢', label: 'Apartment', count: '120+' },
              { icon: '🏡', label: 'Villa', count: '85+' },
              { icon: '🏬', label: 'Office', count: '60+' },
              { icon: '🏪', label: 'Shop', count: '45+' },
              { icon: '🌍', label: 'Land', count: '30+' }
            ].map((type) => (
              <div key={type.label}
                className="bg-[#1a1a2e] border border-white/10 rounded-2xl p-6 text-center cursor-pointer hover:border-[#e94560] hover:bg-[#e94560]/10 transition group">
                <div className="text-4xl mb-3">{type.icon}</div>
                <div className="font-semibold text-white group-hover:text-[#e94560] transition">{type.label}</div>
                <div className="text-gray-400 text-sm mt-1">{type.count} listings</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="py-20 px-6 bg-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Featured <span className="text-[#e94560]">Properties</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">Handpicked premium properties just for you</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {properties.map((property) => (
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
                </div>

                {/* Details */}
                <div className="p-6">
                  <div className="text-[#e94560] font-bold text-xl mb-2">{property.price}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{property.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">📍 {property.location}</p>

                  <div className="flex gap-4 text-gray-400 text-sm border-t border-white/10 pt-4">
                    <span>🛏 {property.beds} Beds</span>
                    <span>🚿 {property.baths} Baths</span>
                    <span>📐 {property.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/properties"
              className="bg-[#e94560] text-white px-10 py-4 rounded-xl font-semibold hover:bg-[#c73652] transition text-lg inline-block">
              View All Properties →
            </Link>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-20 px-6 bg-[#111111]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Why Choose <span className="text-[#e94560]">UAE Properties</span>
          </h2>
          <p className="text-gray-400 text-center mb-12">We make property search simple and trusted</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🔍', title: 'Smart Search', desc: 'Find properties using AI powered search and filters' },
              { icon: '✅', title: 'Verified Listings', desc: 'All properties are verified by our expert team' },
              { icon: '🤝', title: 'Trusted Agents', desc: 'Connect with certified real estate agents in UAE' }
            ].map((feature) => (
              <div key={feature.title}
                className="bg-[#1a1a2e] rounded-2xl p-8 text-center border border-white/10 hover:border-[#e94560]/50 transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 bg-gradient-to-r from-[#e94560] to-[#c73652] text-center">
        <h2 className="text-4xl font-bold mb-4">Are You a Real Estate Agent?</h2>
        <p className="text-xl mb-8 text-white/80">List your properties and reach thousands of buyers across UAE</p>
        <Link to="/register"
          className="bg-white text-[#e94560] px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition inline-block">
          Register as Agent →
        </Link>
      </div>

      {/* Footer */}
      <div className="bg-[#0a0a0a] text-center py-8 text-gray-500 border-t border-white/10">
        <p>© 2026 UAE Properties. Built with MERN Stack 🏠</p>
      </div>

    </div>
  )
}

export default Home