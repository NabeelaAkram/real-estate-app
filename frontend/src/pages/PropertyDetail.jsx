import { useParams, Link } from 'react-router-dom'

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
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    description: "This stunning luxury villa offers breathtaking views of the Palm Jumeirah. Featuring spacious living areas, a private pool, and premium finishes throughout. Perfect for families seeking a luxurious lifestyle in one of Dubai's most prestigious locations.",
    agent: { name: "Ahmed Al Mansoori", phone: "+971 50 123 4567", email: "ahmed@uaeproperties.com" }
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
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    description: "Beautiful modern apartment in the heart of Downtown Dubai. Walking distance to Dubai Mall and Burj Khalifa. Fully furnished with high-end appliances and stunning city views.",
    agent: { name: "Sara Khan", phone: "+971 50 987 6543", email: "sara@uaeproperties.com" }
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
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    description: "Spectacular sea view apartment in Dubai Marina. This property features floor to ceiling windows, a modern kitchen, and access to world class amenities including pool and gym.",
    agent: { name: "Mohammed Ali", phone: "+971 50 555 1234", email: "mohammed@uaeproperties.com" }
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
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    description: "Premium office space in Business Bay, ideal for growing businesses. Open floor plan with meeting rooms, pantry area, and stunning canal views.",
    agent: { name: "Fatima Hassan", phone: "+971 50 444 7890", email: "fatima@uaeproperties.com" }
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
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
    description: "An extraordinary mansion in the prestigious Emirates Hills community. This property boasts a private garden, infinity pool, home theater, and panoramic golf course views.",
    agent: { name: "Omar Sheikh", phone: "+971 50 222 3456", email: "omar@uaeproperties.com" }
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
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    description: "Affordable and cozy studio apartment in JVC. Perfect for singles or couples. Close to community parks, supermarkets and public transport.",
    agent: { name: "Layla Ahmed", phone: "+971 50 111 2222", email: "layla@uaeproperties.com" }
  }
]

function PropertyDetail() {
  const { id } = useParams()
  const property = allProperties.find(p => p.id === parseInt(id))

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

  return (
    <div className="bg-[#0f0f0f] min-h-screen text-white">

      {/* Back Link */}
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Link to="/properties" className="text-gray-400 hover:text-[#e94560] transition">
          ← Back to Properties
        </Link>
      </div>

      {/* Image */}
      <div className="max-w-6xl mx-auto px-6 mt-6">
        <div className="relative rounded-2xl overflow-hidden h-[400px]">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <span className={`absolute top-6 left-6 px-4 py-2 rounded-full text-sm font-semibold ${
            property.purpose === 'Sale'
              ? 'bg-[#e94560] text-white'
              : 'bg-green-500 text-white'
          }`}>
            For {property.purpose}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Left Side - Details */}
        <div className="lg:col-span-2">
          <div className="text-[#e94560] font-bold text-3xl mb-2">
            {property.price}
          </div>
          <h1 className="text-3xl font-bold mb-3">{property.title}</h1>
          <p className="text-gray-400 mb-6">📍 {property.location}</p>

          {/* Quick Info */}
          <div className="flex gap-6 bg-[#1a1a2e] rounded-xl p-6 mb-8 border border-white/10">
            {property.beds > 0 && (
              <div className="text-center">
                <div className="text-2xl mb-1">🛏</div>
                <div className="font-bold">{property.beds}</div>
                <div className="text-gray-400 text-sm">Bedrooms</div>
              </div>
            )}
            <div className="text-center">
              <div className="text-2xl mb-1">🚿</div>
              <div className="font-bold">{property.baths}</div>
              <div className="text-gray-400 text-sm">Bathrooms</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">📐</div>
              <div className="font-bold">{property.area}</div>
              <div className="text-gray-400 text-sm">Area</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🏠</div>
              <div className="font-bold">{property.type}</div>
              <div className="text-gray-400 text-sm">Type</div>
            </div>
          </div>

          {/* Description */}
          <h2 className="text-xl font-bold mb-3">Description</h2>
          <p className="text-gray-400 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Right Side - Agent Card */}
        <div>
          <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-white/10 sticky top-24">
            <h3 className="text-xl font-bold mb-4">Contact Agent</h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#e94560] rounded-full flex items-center justify-center text-2xl font-bold">
                {property.agent.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold">{property.agent.name}</div>
                <div className="text-gray-400 text-sm">Real Estate Agent</div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-400">
                <span>📞</span>
                <span>{property.agent.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <span>✉️</span>
                <span>{property.agent.email}</span>
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