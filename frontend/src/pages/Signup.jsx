import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import {useNavigate} from "react-router-dom"
const Signup = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const navigate = useNavigate()
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("user");

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-lg w-full max-w-md p-8 `}
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2 `}
          style={{ color: primaryColor }}
        >
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          {" "}
          Create your account to get started with delicious food deliveries
        </p>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="fullName"
          >
            Full Name
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            style={{ border: `1px solid ${borderColor}` }}
            type="text"
            placeholder="Enter your Full Name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="Email"
          >
            Email
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            style={{ border: `1px solid ${borderColor}` }}
            type="email"
            placeholder="Enter your Email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="Mobile No"
          >
            Mobile No
          </label>
          <input
            className="w-full border rounded-lg px-3 py-2 focus:outline-none "
            style={{ border: `1px solid ${borderColor}` }}
            type="text"
            placeholder="Enter your Mobile No"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-1"
            htmlFor="Password"
          >
            Password
          </label>
          <div className="relative  ">
            <input
              className="w-full border rounded-lg px-3 py-2 focus:outline-none "
              style={{ border: `1px solid ${borderColor}` }}
              type={`${showPass ? "text" : "password"}`}
              placeholder="Enter your Password"
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
            htmlFor="Role"
          >
            Role
          </label>
          <div className="flex gap-2  ">
            {["user", "owner", "deliveryBoy"].map((r)=>(
              <button onClick={()=> setRole(r)} className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer" 
              style={
                role==r? {backgroundColor: primaryColor, color:"white"}:{border: `1px solid ${primaryColor}`, color:primaryColor}
              }>{r}</button>
            ))}
          </div>
        </div>
        <button className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer">Sign Up</button>
        <button className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100" >
        <FcGoogle size={20} />
        <span>Sign up with google</span>
        </button>
       
       <p className="text-center mt-3 font-medium">Already have an Account ? <span onClick={()=> navigate("/login")} className="text-[#ff4d2d] cursor-pointer">Login</span></p>

      </div>
      
    </div>
  );
};

export default Signup;
