import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
const ForgotPassword = () => {
  const [step, setStep] = useState(2);
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
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
        {step == 1 && (
          <div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="Email"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                type="email"
                placeholder="Enter your Email"
              />
            </div>
            <button className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer">
              Send OTP
            </button>
          </div>
        )}

        {step == 2 && (
          <div>
            <div className="mb-6">
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="OTP"
              >
                OTP
              </label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                type="email"
                placeholder="Enter OTP"
              />
            </div>
            <button className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer">
              Verify OTP
            </button>
          </div>
        )}

        {step == 3 && (
          <div>
            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="Password"
              >
                Enter new Password
              </label>
              <div className="relative  ">
                <input
                  onChange={(e)=> setNewPassword(e.target.value)}
                  value={newPassword}
                  className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                  type={`${showPass ? "text" : "password"}`}
                  placeholder="Enter new Password"
                />
                <button
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-3 top-[14px] text-gray-500"
                >
                  {!showPass ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 font-medium mb-1"
                htmlFor="Password"
              >
                Confirm Password
              </label>
              <div className="relative  ">
                <input
                  onChange={(e)=> setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none "
                  type={`${showPass ? "text" : "password"}`}
                  placeholder="Confirm Password"
                />
                <button
                  onClick={() => setShowPass((prev) => !prev)}
                  className="absolute right-3 top-[14px] text-gray-500"
                >
                  {!showPass ? <IoMdEyeOff /> : <IoMdEye />}
                </button>
              </div>
            </div>
              <button className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer">
              Reset Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
