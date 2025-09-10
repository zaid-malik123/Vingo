import { useState } from "react";
import { FaLocationDot, FaPlus } from "react-icons/fa6";
import { IoSearch, IoCart } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { IoReceiptOutline } from "react-icons/io5";
import { ImSpinner2 } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { setCity, setUserData } from "../redux/userSlice";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, currentCity } = useSelector((state) => state.userSlice);
  const { shop } = useSelector((state) => state.ownerSlice);

  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const logoutHandler = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      dispatch(setUserData(null));
      dispatch(setCity(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center px-5 gap-6 fixed top-0 z-[999] bg-[#fff9f6] shadow-md">
      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-3xl font-bold text-[#ff4d2d] cursor-pointer"
      >
        Vingo
      </h1>

      {/* Search bar for user (desktop) */}
      {user?.role === "user" && (
        <div className="hidden md:flex w-[60%] lg:w-[40%] h-[50px] bg-white shadow-md rounded-lg items-center">
          <div className="flex items-center w-[30%] px-3 border-r border-gray-300">
            <FaLocationDot className="w-5 h-5 text-[#ff4d2d]" />
            <div className="ml-2 text-gray-600 truncate flex items-center gap-2">
              {currentCity ? (
                currentCity
              ) : (
                <span className="flex items-center gap-2 text-gray-400">
                  <ImSpinner2 className="animate-spin" /> Loading...
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 w-full px-3">
            <IoSearch size={22} className="text-[#ff4d2d]" />
            <input
              className="px-2 py-1 text-gray-700 outline-none w-full text-sm"
              type="text"
              placeholder="Search delicious food..."
            />
          </div>
        </div>
      )}

      {/* Right side icons */}
      <div className="flex items-center gap-4">
        {/* Mobile search toggle */}
        {user?.role === "user" && (
          showSearch ? (
            <RxCross1
              onClick={() => setShowSearch(false)}
              size={22}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
            />
          ) : (
            <IoSearch
              onClick={() => setShowSearch(true)}
              size={22}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
            />
          )
        )}

        {/* Owner Controls */}
        {user?.role === "owner" ? (
          <>
            {shop && (
              <>
                {/* Add food buttons */}
                <button
                  onClick={() => navigate("/add-food")}
                  className="hidden md:flex items-center gap-1 px-3 py-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] hover:bg-[#ff4d2d]/20 transition"
                >
                  <FaPlus size={16} />
                  <span className="text-sm">Add Food Item</span>
                </button>
                <button
                  onClick={() => navigate("/add-food")}
                  className="md:hidden p-2 rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d] hover:bg-[#ff4d2d]/20 transition"
                >
                  <FaPlus size={18} />
                </button>
              </>
            )}

            {/* Orders */}
            <div className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium cursor-pointer hover:bg-[#ff4d2d]/20 transition">
              <IoReceiptOutline size={20} />
              <span className="hidden md:block text-sm">Pending Orders</span>
              <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">
                0
              </span>
            </div>
          </>
        ) : (
          /* User Controls */
          <>
            <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium hover:bg-[#ff4d2d]/20 transition">
              My Orders
            </button>
            <div className="relative cursor-pointer">
              <IoCart size={24} className="text-[#ff4d2d]" />
              <span className="absolute -top-2 -right-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px]">
                0
              </span>
            </div>
          </>
        )}

        {/* Profile Circle */}
        <div
          onClick={() => setShowInfo((prev) => !prev)}
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-lg shadow-lg font-semibold cursor-pointer hover:scale-105 transition"
        >
          {user?.fullName?.[0]}
        </div>

        {/* Dropdown */}
        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[200px] bg-white shadow-2xl rounded-xl p-4 flex flex-col gap-3 z-[999]">
            <div className="text-[16px] font-semibold">{user?.fullName}</div>
            {user?.role === "user" && (
              <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
                My Orders
              </div>
            )}
            <div
              onClick={logoutHandler}
              className="text-[16px] font-semibold text-[#ff4d2d] cursor-pointer hover:underline"
            >
              Logout
            </div>
          </div>
        )}
      </div>

      {/* Mobile Search Box */}
      {showSearch && user?.role === "user" && (
        <div className="absolute top-[82px] left-[5%] w-[90%] h-[55px] bg-white shadow-lg rounded-lg flex items-center gap-3 px-3 md:hidden">
          <FaLocationDot className="w-5 h-5 text-[#ff4d2d]" />
          <div className="flex-1 text-gray-600 truncate"> {currentCity ? (
                currentCity
              ) : (
                <span className="flex items-center gap-2 text-gray-400">
                  <ImSpinner2 className="animate-spin" /> Loading...
                </span>
              )}</div>
          <IoSearch size={22} className="text-[#ff4d2d]" />
          <input
            className="flex-1 px-2 text-gray-700 outline-none text-sm"
            type="text"
            placeholder="Search delicious food..."
          />
        </div>
      )}
    </div>
  );
};

export default Nav;
