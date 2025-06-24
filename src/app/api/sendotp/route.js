
import db from '@/lib/db'
import User from '@/models/User'
import { sendOTPEmail } from '@/app/utils/sendEmail'
export async function POST(req) {
  try {
    const { email } = await req.json()
    await db.connect()

    const user = await User.findOne({ email })
    if (!user) {
      return Response.json({ error: 'User not found' }, { status: 404 })
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    user.otp = otp
    user.otpExpires = Date.now() + 5 * 60 * 1000 
    await user.save()

    await sendOTPEmail(email, otp)

    return Response.json({ message: 'OTP has been sent to your email' })
  } catch (error) {
    console.error('Send OTP error:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
