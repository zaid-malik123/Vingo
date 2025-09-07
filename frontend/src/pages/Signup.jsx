import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { ClipLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Signup = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Error states
  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSignup = async () => {
    let hasError = false;
    setLoading(true);
    // Full Name validation
    if (!fullName.trim()) {
      setFullNameError("Full Name is required");
      hasError = true;
    } else if (fullName.trim().length < 3) {
      setFullNameError("Full Name must be at least 3 characters");
      hasError = true;
    } else {
      setFullNameError("");
    }

    // Email validation
    if (!email) {
      setEmailError("Email is required");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      hasError = true;
    } else {
      setEmailError("");
    }

    // Mobile No validation
    if (!mobileNo) {
      setMobileError("Mobile number is required");
      hasError = true;
    } else if (!/^\d{10,}$/.test(mobileNo)) {
      setMobileError("Enter a valid mobile number (min 10 digits)");
      hasError = true;
    } else {
      setMobileError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) {
      setLoading(false);
      return;
    }

    // API call
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, password, mobileNo, role },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data.user));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      // backend error handling
      const msg = error.response?.data?.message || "Signup failed";
      if (msg.toLowerCase().includes("email")) setEmailError(msg);
      else if (msg.toLowerCase().includes("mobile")) setMobileError(msg);
      else setPasswordError(msg);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      if (!mobileNo) {
        return alert("mobile no is required");
      }
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      try {
        const { data } = await axios.post(
          `${serverUrl}/api/auth/google-auth`,
          {
            fullName: result.user.displayName,
            email: result.user.email,
            role,
            mobileNo,
          },
          { withCredentials: true }
        );
        dispatch(setUserData(data.user));
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <h1 className="text-3xl font-bold mb-2" style={{ color: primaryColor }}>
          Vingo
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started with delicious food deliveries
        </p>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Full Name
          </label>
          <input
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
              fullNameError ? "border-red-500" : "border-gray-200"
            }`}
            type="text"
            placeholder="Enter your Full Name"
          />
          {fullNameError && (
            <p className="text-red-500 text-sm mt-1">{fullNameError}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
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

        {/* Mobile */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Mobile No
          </label>
          <input
            onChange={(e) => setMobileNo(e.target.value)}
            value={mobileNo}
            className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
              mobileError ? "border-red-500" : "border-gray-200"
            }`}
            type="text"
            placeholder="Enter your Mobile No"
          />
          {mobileError && (
            <p className="text-red-500 text-sm mt-1">{mobileError}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Password
          </label>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none ${
                passwordError ? "border-red-500" : "border-gray-200"
              }`}
              type={showPass ? "text" : "password"}
              placeholder="Enter your Password"
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

        {/* Role */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Role</label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className="flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer"
                style={
                  role === r
                    ? { backgroundColor: primaryColor, color: "white" }
                    : {
                        border: `1px solid ${primaryColor}`,
                        color: primaryColor,
                      }
                }
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <button
          disabled={loading}
          onClick={handleSignup}
          className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
        >
          {loading ? <ClipLoader color="white" size={20} /> : "Signup"}
        </button>
        <button
          onClick={handleGoogleAuth}
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100"
        >
          <FcGoogle size={20} />
          <span>Sign up with google</span>
        </button>

        <p className="text-center mt-3 font-medium">
          Already have an Account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#ff4d2d] cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
