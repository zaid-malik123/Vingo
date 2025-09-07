import { useSelector } from "react-redux";
import Nav from "./Nav";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import OwnerItemCard from "./OwnerItemCard";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const { shop } = useSelector((state) => state.ownerSlice);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col items-center">
      {/* Navbar */}
      <Nav />

      {/* No Shop Added */}
      {!shop && (
        <div className="flex justify-center items-center p-6 mt-12">
          <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] w-20 h-20 mb-5" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Add Your Restaurant
              </h2>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                Join our food delivery platform and reach thousands of hungry
                customers every day.
              </p>
              <button
                onClick={() => navigate("/create-edit-shop")}
                className="bg-gradient-to-r from-[#ff4d2d] to-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-[1.02] transition-transform"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shop Details */}
      {shop && (
        <div className="w-full flex flex-col items-center gap-6 px-6 mt-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3 text-center">
            <FaUtensils className="text-[#ff4d2d] w-12 h-12" />
            Welcome to {shop?.name}
          </h1>

          <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-orange-100 hover:shadow-2xl transition-all duration-300 w-full max-w-4xl relative">
            {/* Edit Button */}
            <div
              onClick={() => navigate("/create-edit-shop")}
              className="absolute top-5 right-5 bg-[#ff4d2d] text-white p-3 rounded-full shadow-md hover:bg-orange-600 cursor-pointer transition-colors"
            >
              <FaPen size={18} />
            </div>

            {/* Banner Image */}
            <img
              className="w-full h-56 sm:h-72 object-cover"
              src={shop.image}
              alt="Restaurant"
            />

            {/* Shop Info */}
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {shop.name}
              </h1>
              <p className="text-gray-600 mb-2">
                {shop.city}, {shop.state}
              </p>
              <p className="text-gray-600">{shop.address}</p>
            </div>
          </div>
        </div>
      )}

      {/* No Items Added */}
      {shop?.items?.length === 0 && (
        <div className="flex justify-center items-center p-6 mt-12">
          <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8 border border-gray-100 hover:shadow-2xl transition-all">
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] w-20 h-20 mb-5" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Add Your Food Item
              </h2>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                Start building your menu and attract food lovers to your
                restaurant.
              </p>
              <button
                onClick={() => navigate("/add-food")}
                className="bg-gradient-to-r from-[#ff4d2d] to-orange-500 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:scale-[1.02] transition-transform"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Items Grid */}
      {shop?.items?.length > 0 && (
        <div className="w-full max-w-6xl px-6 mt-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Your Menu
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shop.items.map((item, idx) => (
              <OwnerItemCard key={idx} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnerDashboard;
