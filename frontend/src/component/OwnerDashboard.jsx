import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import OwnerItemCard from "./OwnerItemCard";
const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { shop } = useSelector((state) => state.ownerSlice);
  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
      <Nav />
      {!shop?.shop && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Add your resturant
              </h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Join ovr food delivery platform and reach thousands of hungry
                customers every day.
              </p>
              <button
                onClick={() => navigate("/create-edit-shop")}
                className="bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {shop?.shop && (
        <div className="w-full flex flex-col items-center gap-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl text-gray-900 flex items-center gap-3 mt-8 text-center">
            <FaUtensils className="text-[#ff4d2d] w-14 h-14" />
            Welcome to {shop?.shop?.name}
          </h1>

          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative">
            <div
              onClick={() => navigate("/create-edit-shop")}
              className="absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
            >
              <FaPen size={20} />
            </div>
            <img
              className="w-full h-48 sm:h-64 object-cover"
              src={shop.shop.image}
              alt=""
            />
            <div className="p-4 sm:p-6">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                {shop.shop.name}
              </h1>
              <p className="text-gray-500 mb-4">
                {shop.shop.city},{shop.shop.state}
              </p>
              <p className="text-gray-500 mb-4">{shop.shop.address}</p>
            </div>
          </div>
        </div>
      )}

      {shop?.shop?.items?.length == 0 && (
        <div className="flex justify-center items-center p-4 sm:p-6">
          <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4" />
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                Add your Food Item
              </h2>
              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Join ovr food delivery platform and reach thousands of hungry
                customers every day.
              </p>
              <button
                onClick={() => navigate("/add-food")}
                className="bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {shop?.shop?.items?.length > 0 &&
        shop.shop.items.map((item, idx) => (
          <div className="flex flex-col items-center gap-4 w-full max-w-3xl mt-3" key={idx}>
            <OwnerItemCard item={item} />
          </div>
        ))}
    </div>
  );
};

export default OwnerDashboard;
