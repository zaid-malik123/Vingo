import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-[#fff5f2] via-[#fff9f6] to-[#ffece7]">
      {/* Background Decoration */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#ff4d2d]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#e64323]/20 rounded-full blur-3xl"></div>

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center text-center px-6 mt-20 z-10"
      >
        {/* Logo with subtle bounce */}
        {/* Logo (text version) */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-[#ff4d2d] to-[#e64323] bg-clip-text text-transparent"
        >
          Vingo
        </motion.h1>

        <h1 className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-[#ff4d2d] to-[#e64323] bg-clip-text text-transparent">
          Welcome to Foodie 🍴
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mb-10">
          Craving something delicious? <br /> Get your favorite meals delivered
          <span className="font-semibold text-[#ff4d2d]"> hot & fresh </span>
          to your doorstep.
        </p>

        {/* Get Started Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="px-12 py-3 rounded-full text-white font-semibold text-lg shadow-xl 
          bg-gradient-to-r from-[#ff4d2d] to-[#e64323] hover:shadow-[#ff4d2d]/50 hover:shadow-2xl transition-all"
        >
          🚀 Get Started
        </motion.button>

        {/* Small Info */}
        <p className="text-sm text-gray-400 mt-8">
          Powered by <span className="font-semibold">Foodie</span> ©{" "}
          {new Date().getFullYear()}
        </p>
      </motion.div>

      {/* Footer */}
       {/* <Footer /> */}
    </div>
  );
};

export default LandingPage;
