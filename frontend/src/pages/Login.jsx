import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await api.post('/auth/login', formData)

      const { token, ...userData } = res.data
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))

      alert('Login successful! 🎉')
      navigate('/')

    } catch (err) {
      setError(err.response?.data?.error || 'Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-5xl">🏠</span>
          <h1 className="text-white text-3xl font-bold mt-4">
            UAE<span className="text-[#e94560]">Properties</span>
          </h1>
          <p className="text-gray-400 mt-2">Welcome back! Please login</p>
        </div>

        {/* Form */}
        <div className="bg-[#1a1a2e] rounded-2xl p-8 border border-white/10">
          <h2 className="text-white text-2xl font-bold mb-6">Login</h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-xl mb-5 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-5">
              <label className="text-gray-400 text-sm mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nabeela@gmail.com"
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#e94560] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#c73652] transition disabled:opacity-50">
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>

          {/* Register Link */}
          <p className="text-gray-400 text-center mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#e94560] hover:underline font-semibold">
              Register here
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login