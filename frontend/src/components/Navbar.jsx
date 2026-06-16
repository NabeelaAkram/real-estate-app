import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser && storedUser !== 'undefined') {
        setUser(JSON.parse(storedUser))
      } else {
        setUser(null)
        localStorage.removeItem('user')
      }
    } catch (e) {
      setUser(null)
      localStorage.removeItem('user')
    }
  }, [location])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    navigate('/login')
  }

  return (
    <nav className="bg-[#0a0a0a] border-b border-[#e94560]/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🏠</span>
          <div>
            <span className="text-white font-bold text-xl">UAE</span>
            <span className="text-[#e94560] font-bold text-xl">Properties</span>
          </div>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-gray-300 hover:text-[#e94560] transition font-medium">
            Home
          </Link>
          <Link to="/properties" className="text-gray-300 hover:text-[#e94560] transition font-medium">
            Properties
          </Link>

          {user ? (
            <>
              {user.role === 'agent' && (
                <Link to="/add-property" className="bg-[#e94560] text-white px-6 py-2 rounded-full hover:bg-[#c73652] transition font-medium">
                  + Add Property
                </Link>
              )}
              <span className="text-gray-300 font-medium">
                👋 Welcome, <span className="text-[#e94560]">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-[#1a1a2e] border border-white/10 text-white px-6 py-2 rounded-full hover:border-[#e94560] transition font-medium">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-[#e94560] transition font-medium">
                Login
              </Link>
              <Link to="/register" className="bg-[#e94560] text-white px-6 py-2 rounded-full hover:bg-[#c73652] transition font-medium">
                Register
              </Link>
            </>
          )}
        </div>

      </div>
    </nav>
  )
}

export default Navbar