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
const Login = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    setLoading(true);
    let hasError = false;

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
    }

    // API call
    try {
      const res = await axios.post(
        `${serverUrl}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(res.data.user));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setLoading(false);
      const msg = error.response?.data?.message || "Login failed";
      setServerError(msg);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/auth/google-auth`,
        {
          email: result.user.email,
        },
        { withCredentials: true }
      );
      dispatch(setUserData(data.user));
      navigate("/");
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
          Login your account to get started with delicious food deliveries
        </p>

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

        {/* Forgot Password */}
        <p
          onClick={() => navigate("/forgot-password")}
          className="text-right text-[#ff4d2d] font-semibold mb-3 cursor-pointer"
        >
          Forgot Password?
        </p>

        {/* Server Error */}
        {serverError && (
          <p className="text-red-500 text-center font-medium mb-3">
            {serverError}
          </p>
        )}

        {/* Login Button */}
        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full font-semibold py-2 rounded-lg transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer"
        >
          {loading ? <ClipLoader color="white" size={20} /> : "Login"}
        </button>

        {/* Google Login */}
        <button
          onClick={handleGoogleAuth}
          className="w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100"
        >
          <FcGoogle size={20} />
          <span>Login with Google</span>
        </button>

        {/* Redirect to Signup */}
        <p className="text-center mt-3 font-medium">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#ff4d2d] cursor-pointer"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
