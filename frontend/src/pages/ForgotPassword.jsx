import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // field specific error states
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSendOtp = async () => {
    setLoading(true);
    if (!email) {
      setEmailError("Email is required");
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true }
      );
      setLoading(false);
      setEmailError("");
      setStep(2);
    } catch (error) {
      setLoading(false);
      setEmailError(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    if (!otp) {
      setOtpError("OTP is required");
      setLoading(false);
      return;
    }

    try {
     const res = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true }
      );
      setLoading(false);
      setOtpError("");
      setStep(3);
    } catch (error) {
      setLoading(false);
      setOtpError(error.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    let hasError = false;

    if (!newPassword) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      hasError = true;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      hasError = true;
    } else {
      setConfirmPasswordError("");
    }

    if (hasError) {
      setLoading(false);
    }

    try {
      await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, newPassword, confirmPassword },
        { withCredentials: true }
      );
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setPasswordError(
        error.response?.data?.message || "Password reset failed"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fff9f6] p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="w-full flex items-center gap-5 mb-4">
          <IoMdArrowBack
            onClick={() => navigate("/login")}
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d] ">
            Forgot Password
          </h1>
        </div>

        {step === 1 && (
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
                  emailError ? "border-red-500" : "border-gray-200"
                }`}
                type="email"
                placeholder="Enter your Email"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>
            <button
              disabled={loading}
              onClick={handleSendOtp}
              className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
            >
              {loading ? <ClipLoader size={20} /> : "Send OTP"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-1">
                OTP
              </label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
                  otpError ? "border-red-500" : "border-gray-200"
                }`}
                type="text"
                placeholder="Enter OTP"
              />
              {otpError && (
                <p className="text-red-500 text-sm mt-1">{otpError}</p>
              )}
            </div>
            <button
              disabled={loading}
              onClick={handleVerifyOtp}
              className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
            >
              {loading ? <ClipLoader size={20} /> : "Verify OTP"}
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Enter new Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
                    passwordError ? "border-red-500" : "border-gray-200"
                  }`}
                  type={showPass ? "text" : "password"}
                  placeholder="Enter new Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-3 top-[14px] text-gray-500"
                >
                  {!showPass ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
                    confirmPasswordError ? "border-red-500" : "border-gray-200"
                  }`}
                  type={showPass ? "text" : "password"}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-3 top-[14px] text-gray-500"
                >
                  {!showPass ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
              {confirmPasswordError && (
                <p className="text-red-500 text-sm mt-1">
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <button
              disabled={loading}
              onClick={handleResetPassword}
              className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
            >
              {loading ? <ClipLoader size={20} /> : "Reset Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
