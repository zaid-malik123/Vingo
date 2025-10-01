import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import { FaStore, FaUtensils } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoArrowBackOutline } from "react-icons/io5";
import FoodCard from "../component/FoodCard";

const Shop = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [item, setItem] = useState([]);

  const handleShop = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/item/get-by-shop/${id}`, {
        withCredentials: true,
      });
      setShop(res.data.shop);
      setItem(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShop();
  }, [id]);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="fixed top-5 left-5 z-30 flex items-center gap-2 
        bg-white/20 backdrop-blur-md hover:bg-white/30 
        text-gray-300 px-4 py-2 rounded-full shadow-md transition-all duration-200"
      >
        <IoArrowBackOutline size={20} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Shop Banner */}
      {shop && (
        <div className="relative w-full h-72 md:h-96 lg:h-[28rem] overflow-hidden">
          <img
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-500"
            src={shop.image}
            alt={shop.name}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/20 flex flex-col justify-center items-center text-center px-6">
            <FaStore className="text-white text-5xl mb-4 drop-shadow-lg" />
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {shop.name}
            </h1>
            <div className="flex items-center gap-2 mt-3">
              <FaLocationDot size={22} className="text-red-400" />
              <p className="text-lg font-medium text-gray-200">
                {shop.address}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Menu Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="flex items-center justify-center gap-3 text-3xl font-bold mb-12 text-gray-800">
          <FaUtensils className="text-red-500" /> Our Menu
        </h2>

        {item.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-8">
            {item.map((food, idx) => (
              <FoodCard key={idx} data={food} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <FaUtensils className="text-gray-300 text-6xl mb-4" />
            <p className="text-lg font-medium text-gray-500">
              No items available at this shop yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
