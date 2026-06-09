import { useState } from 'react'
import { Link } from 'react-router-dom'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register data:', formData)
    alert('Register Coming Soon — Backend connection next!')
  }

  return (
    <div className="bg-[#0f0f0f] min-h-screen flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-5xl">🏠</span>
          <h1 className="text-white text-3xl font-bold mt-4">
            UAE<span className="text-[#e94560]">Properties</span>
          </h1>
          <p className="text-gray-400 mt-2">Create your account today</p>
        </div>

        {/* Form */}
        <div className="bg-[#1a1a2e] rounded-2xl p-8 border border-white/10">
          <h2 className="text-white text-2xl font-bold mb-6">Register</h2>

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="mb-5">
              <label className="text-gray-400 text-sm mb-2 block">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nabeela Akram"
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
                required
              />
            </div>

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
            <div className="mb-5">
              <label className="text-gray-400 text-sm mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition placeholder-gray-600"
                required
              />
            </div>

            {/* Role */}
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">
                I am a
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-[#0f0f0f] text-white px-4 py-3 rounded-xl border border-white/10 outline-none focus:border-[#e94560] transition">
                <option value="user">Property Buyer / Tenant</option>
                <option value="agent">Real Estate Agent</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[#e94560] text-white py-3 rounded-xl font-semibold text-lg hover:bg-[#c73652] transition">
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <p className="text-gray-400 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[#e94560] hover:underline font-semibold">
              Login here
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register