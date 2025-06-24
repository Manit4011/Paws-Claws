import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export const sendOTPEmail = async (to, otp) => {
  try {
    const msg = {
      to,
      from: process.env.EMAIL_SENDER,
      subject: 'Your OTP for Password Reset',
      html: `
        <div style="font-family: sans-serif;">
          <h2>Reset Your Password</h2>
          <p>Here is your OTP: <strong>${otp}</strong></p>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `
    }

    await sgMail.send(msg)
    console.log(`✅ OTP email sent to ${to}`)
  } catch (error) {
    console.error('❌ Error sending OTP email with SendGrid:', error.response?.body || error.message)
    throw new Error('Failed to send OTP email')
  }
}
