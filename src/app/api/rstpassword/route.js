

import db from '@/lib/db'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export async function POST(req) {
  try {
    const { email, otp, newPassword } = await req.json()
    await db.connect()

    const user = await User.findOne({ email })

    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    const isOtpValid = user.otp === otp && Date.now() <= user.otpExpires

    if (!isOtpValid) {
      return Response.json({ error: 'Invalid or expired OTP' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)

    user.password = hashedPassword
    user.otp = null
    user.otpExpires = null
    await user.save()

    return Response.json({ message: 'Password has been reset successfully' })
  } catch (error) {
    console.error('Reset password error:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
