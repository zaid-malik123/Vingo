import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { genToken } from "../utils/Token.js";
import { sendOtpMail } from "../service/otp.service.js";

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password, mobileNo, role } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already registered" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be atleast 6 characters" });
    }
    if (mobileNo.length < 10) {
      return res
        .status(400)
        .json({ message: "mobile no. must be atleast 10 digits" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      fullName,
      email,
      password: hashed,
      mobileNo,
      role,
    });
    const token = genToken(createdUser._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(201).json({ message: "user created Successfully", createdUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(400).json({ message: "password is incorrect" });
    }

    const token = genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({ message: "login Successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "logout Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "user does not exist" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();

    await sendOtpMail(email, otp);

    res.status(200).json({ message: "OTP send successfully 👍" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.resetOtp != otp || user.otpExpires < Date.now()) {
       return res.status(400).json({ message: "Invalid/expired Otp" });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: "OTP verify successfully 👍" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;

    const user = await User.findOne({ email });

    if (!user || !user.isOtpVerified) {
      res.status(400).json({ message: "Otp verification required" });
    }

    if (newPassword != confirmPassword) {
      return res
        .status(400)
        .json({ message: "new password and confirm password does not same" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.isOtpVerified = false;
    user.resetOtp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({ message: "password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const googleAuth = async (req, res, next)=>{
try {
  const {fullName, email, mobileNo, role} = req.body;
  let user = await User.findOne({email})

  if(!user){
    user = await User.create({fullName, email, mobileNo, role})
  }
  const token = genToken(user._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
  res.status(200).json({message: user})

} catch (error) {
  res.status(500).json({ message: error.message });
}
}
