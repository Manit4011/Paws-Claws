'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const router = useRouter();

  const sendOTP = async () => {
    setError('')
    setMessage('')

    try {
      const res = await axios.post('/api/sendotp', { email })
      setMessage(res.data.message)
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP')
    }
  }

  const resetPassword = async () => {
    setError('')
    setMessage('')

    try {
      const res = await axios.post('/api/rstpassword', {
        email,
        otp,
        newPassword,
      })
      setMessage(res.data.message)
      router.push('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to reset password')
    }
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0a0a0a] text-white font-sans">
      <div className="flex-grow flex justify-center items-center px-4 py-16">
        <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-xl shadow-lg border border-gray-800">
          <h2 className="text-3xl font-semibold text-center mb-6">Forgot Password</h2>

          {/* Step 1 */}
          {step === 1 && (
            <>
              <label className="text-sm mb-1 block text-gray-300">Registered Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#121212] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
              />
              <button
                onClick={sendOTP}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg transition"
              >
                Send OTP
              </button>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
              <label className="text-sm mt-4 mb-1 block text-gray-300">OTP</label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#121212] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              />

              <label className="text-sm mb-1 block text-gray-300">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-[#121212] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              />

              <button
                onClick={resetPassword}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
              >
                Reset Password
              </button>
            </>
          )}

          {/* Feedback */}
          {message && <p className="text-green-500 text-center mt-4">{message}</p>}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>

      {/* Fixed Footer */}
      <footer className="bg-[#111111] text-gray-500 text-sm text-center py-4 border-t border-gray-800 w-full">
        &copy; {new Date().getFullYear()} Paws&Claws. All rights reserved.
      </footer>
    </div>
  )
}
