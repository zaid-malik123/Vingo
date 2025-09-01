import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import {useNavigate} from "react-router-dom"
const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#fff9f6] p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="w-full flex items-center gap-5 mb-4">
          <IoMdArrowBack onClick={()=> navigate("/login")} size={30} className="text-[#ff4d2d]" />
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
      </div>
    </div>
  );
};

export default ForgotPassword;
