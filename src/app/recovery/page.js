'use client'

import { useState } from 'react'
import axios from 'axios'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState(1)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const sendOTP = async () => {
    console.log("🟡 sendOTP called")
    setError('')
    setMessage('')

    try {
      const res = await axios.post('/api/sendotp', { email })
      console.log("✅ request received")
      setMessage(res.data.message)
      setStep(2)
    } catch (err) {
      console.error('❌ sendOTP error:', err)
      setError(err.response?.data?.error || 'Failed to send OTP')
    }
  }

  const resetPassword = async () => {
    console.log("🟡 resetPassword called")
    setError('')
    setMessage('')

    try {
      const res = await axios.post('/api/rstpassword', {
        email,
        otp,
        newPassword,
      })
      console.log("✅ password reset response:", res.data)
      setMessage(res.data.message)
    } catch (err) {
      console.error('❌ resetPassword error:', err)
      setError(err.response?.data?.error || 'Failed to reset password')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white shadow rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">Forgot Password</h2>

      {/* Step 1: Email input */}
      {step === 1 && (
        <>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Enter your registered email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4 text-black"
            placeholder="you@example.com"
          />
          <button
            type="button"
            onClick={sendOTP}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          >
            Send OTP
          </button>
        </>
      )}

      {/* Step 2: OTP and new password */}
      {step === 2 && (
        <>
          <label className="block mt-4 mb-1 text-sm font-medium text-gray-700">
            Enter OTP sent to your email
          </label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4 text-black"
            placeholder="6-digit OTP"
          />

          <label className="block mb-1 text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4 text-black"
            placeholder="Enter new password"
          />

          <button
            type="button"
            onClick={resetPassword}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
          >
            Reset Password
          </button>
        </>
      )}

      {/* Feedback */}
      {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  )
}
