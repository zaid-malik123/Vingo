import nodemailer from "nodemailer"
import {config} from "dotenv"
config()
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendOtpMail = async(to, otp)=>{
await transporter.sendMail({
    from: process.env.EMAIL,
    to: to,
    subject: "Reset your Password",
    html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`
})
}
