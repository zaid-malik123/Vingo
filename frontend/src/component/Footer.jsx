import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white shadow-inner mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-extrabold text-[#ff4d2d] mb-2">Vingo</h2>
          <p className="text-gray-600 text-sm">
            Fast, Fresh & Delicious food delivered to your doorstep. Your hunger, our priority!
          </p>
          <div className="flex mt-4 space-x-3">
            <a href="#" className="text-gray-500 hover:text-[#ff4d2d] transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="text-gray-500 hover:text-[#ff4d2d] transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-500 hover:text-[#ff4d2d] transition-colors">
              <FaTwitter />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-[#ff4d2d] transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-[#ff4d2d] transition-colors">Restaurants</a></li>
            <li><a href="#" className="hover:text-[#ff4d2d] transition-colors">Menu</a></li>
            <li><a href="#" className="hover:text-[#ff4d2d] transition-colors">My Orders</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li><a href="#" className="hover:text-[#ff4d2d] transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-[#ff4d2d] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#ff4d2d] transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-[#ff4d2d] transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact</h3>
          <p className="text-gray-600 text-sm mb-2">Email: support@vingo.com</p>
          <p className="text-gray-600 text-sm mb-2">Phone: +91 98765 43210</p>
          <p className="text-gray-600 text-sm">Address: 123 Vingo Street, Mumbai, India</p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="w-full bg-[#fdf0eb] text-center py-4 text-gray-500 text-sm border-t" style={{ borderColor: "#ddd" }}>
        © {new Date().getFullYear()} Vingo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
