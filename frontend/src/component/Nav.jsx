import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";
import { setCity, setUserData } from "../redux/userSlice";
import { IoReceiptOutline } from "react-icons/io5";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, city } = useSelector((state) => state.userSlice);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const logoutHandler = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      dispatch(setCity(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[999] bg-[#fff9f6]">
      {showSearch && user.role == "user " && (
        <div className="w-[90%] h-[70px] bg-white shadow-lg rounded-lg  items-center gap-[20px]  flex fixed top-[80px] left-[5%] md:hidden">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-x-gray-400">
            <FaLocationDot className="w-[25px] h-[25px] text-[#ff4d2d] " />
            <div className="w-[80%] text-gray-600 truncate">{city}</div>
          </div>
          <div className="flex items-center gap-[10px] w-[80%]">
            <IoSearch size={25} className="text-[#ff4d2d]" />
            <input
              className="px-[10px] text-gray-700 outline-0 w-full text-[20px]"
              type="text"
              placeholder="search delicious food..."
            />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
      {user.role == "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-lg rounded-lg  items-center gap-[20px] hidden md:flex">
          <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-x-gray-400">
            <FaLocationDot className="w-[25px] h-[25px] text-[#ff4d2d] " />
            <div className="w-[80%] text-gray-600 truncate">{city}</div>
          </div>
          <div className="flex items-center gap-[10px] w-[80%]">
            <IoSearch size={25} className="text-[#ff4d2d]" />
            <input
              className="px-[10px] text-gray-700 outline-0 w-full text-[20px]"
              type="text"
              placeholder="search delicious food..."
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {user.role == "user" &&
          (showSearch ? (
            <RxCross1
              onClick={() => setShowSearch(false)}
              size={25}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
            />
          ) : (
            <IoSearch
              onClick={() => setShowSearch(true)}
              size={25}
              className="text-[#ff4d2d] md:hidden cursor-pointer"
            />
          ))}

        {user.role == "owner" ? (
          <>
            <button className="hidden md:flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]">
              <FaPlus size={20} />
              <span>Add Food Item</span>
            </button>

            <button className="md:hidden flex items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]">
              <FaPlus size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium">        
                <IoReceiptOutline size={20} />
                <span>Pending Orders</span>
                <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px] ">0</span>     
            </div>
              <div className="md:hidden flex items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium">        
                <IoReceiptOutline size={20} />  
                <span className="absolute -right-2 -top-2 text-xs font-bold text-white bg-[#ff4d2d] rounded-full px-[6px] py-[1px] ">0</span>  
            </div>
          </>
        ) : (
          <>
            <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium ">
              My Orders
            </button>
            <div className="relative cursor-pointer">
              <IoCart size={25} className="text-[#ff4d2d]" />
              <span className="absolute top-[-12px] right-[-9px] text-[#ff4d2d]">
                0
              </span>
            </div>
          </>
        )}

        <div
          onClick={() => setShowInfo((prev) => !prev)}
          className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[20px] shadow-xl font-semibold cursor-pointer"
        >
          {user?.fullName.slice(0, 1)}
        </div>

        {showInfo && (
          <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[999]">
            <div className="text-[17px] font-semibold">{user.fullName}</div>
            <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">
              My Orders
            </div>
            <div
              onClick={logoutHandler}
              className="text-[17px] font-semibold text-[#ff4d2d]"
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
