import ConnectDB from '@/lib/db'

import { sendOTPEmail } from '@/app/utils/sendEmail'
import { NextResponse } from 'next/server' 
import { User } from '@/lib/models/userModel'
export async function POST(req) {
  try {
    const { email } = await req.json()
    await ConnectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 }) 
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    user.otp = otp
    user.otpExpires = Date.now() + 5 * 60 * 1000
    await user.save()

    await sendOTPEmail(email, otp)

    return NextResponse.json({ message: 'OTP has been sent to your email' }) 
  } catch (error) {
    console.error('Send OTP error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }) 
  }
}
