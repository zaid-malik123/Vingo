import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { useSelector } from "react-redux";

const Nav = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [ showInfo, setShowInfo] = useState(false)
  const [ showSearch, setShowSearch] = useState(false)
  return (
    <div className="w-full h-[80px] flex items-center justify-between md:justify-center gap-[30px] px-[20px] fixed top-0 z-[999] bg-[#fff9f6]">
      <h1 className="text-3xl font-bold mb-2 text-[#ff4d2d]">Vingo</h1>
      <div className="md:w-[60%] lg:w-[40%] h-[70px] bg-white shadow-lg rounded-lg  items-center gap-[20px] hidden md:flex">
        <div className="flex items-center w-[30%] overflow-hidden gap-[10px] px-[10px] border-r-[2px] border-x-gray-400">
          <FaLocationDot className="w-[25px] h-[25px] text-[#ff4d2d] " />
          <div className="w-[80%] text-gray-600 truncate">Saharanpur</div>
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
      <div className="flex items-center gap-4">
         <IoSearch size={25} className="text-[#ff4d2d] md:hidden" />
        <div className="relative cursor-pointer">
          <IoCart size={25} className="text-[#ff4d2d]" />
          <span className="absolute top-[-12px] right-[-9px] text-[#ff4d2d]">
            0
          </span>
        </div>
        <button className="hidden md:block px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] text-sm font-medium ">
          My Orders
        </button>
        <div onClick={()=> setShowInfo(prev => !prev)} className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[20px] shadow-xl font-semibold cursor-pointer">
          {user?.fullName.slice(0, 1)}
        </div>
        
       {showInfo &&  <div className="fixed top-[80px] right-[10px] md:right-[10%] lg:right-[25%] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[999]">
           <div className="text-[17px] font-semibold">{user.fullName}</div>
           <div className="md:hidden text-[#ff4d2d] font-semibold cursor-pointer">My Orders</div>
           <div className="text-[17px] font-semibold text-[#ff4d2d]">Logout</div>
        </div>}

      </div>
    </div>
  );
};

export default Nav;
