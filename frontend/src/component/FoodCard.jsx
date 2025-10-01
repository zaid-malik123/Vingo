import { FaLeaf, FaDrumstickBite, FaMinus, FaPlus } from "react-icons/fa6"; // FA6 icons
import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";      // FA5 icons
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/userSlice";

const FoodCard = ({ data }) => {
  const [quantity, setQuantity] = useState(0);
  const { cartItems } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();

  const renderStars = (rating = 0) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? (
          <FaStar key={i} className="text-yellow-500 text-sm" />
        ) : (
          <FaRegStar key={i} className="text-yellow-500 text-sm" />
        )
      );
    }
    return stars;
  };

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="w-[260px] rounded-3xl border border-gray-100 bg-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-[180px] flex justify-center items-center bg-gray-50 overflow-hidden rounded-t-3xl">
        <div className="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md">
          {data.foodType === "veg" ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4 gap-2">
        <h1 className="font-semibold text-gray-900 text-base truncate">{data.name}</h1>

        <div className="flex items-center gap-1">
          {renderStars(data.rating?.average || 0)}
          <span className="text-xs text-gray-400">({data.rating?.count || 0})</span>
        </div>

        <span className="text-lg font-bold text-[#ff4d2d] mt-1">₹{data.price}</span>

        {/* Quantity + Cart */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center border rounded-full bg-gray-100 overflow-hidden shadow-sm">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition"
            >
              <FaMinus />
            </button>
            <span className="px-4 font-medium">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition"
            >
              <FaPlus />
            </button>
          </div>

          <button
            onClick={() =>
              quantity > 0 &&
              dispatch(
                addToCart({
                  id: data._id,
                  name: data.name,
                  price: data.price,
                  image: data.image,
                  shop: data.shop,
                  quantity,
                  foodType: data.foodType,
                })
              )
            }
            className={`ml-2 px-4 py-2 rounded-full text-white font-semibold transition ${
              cartItems.some((i) => i.id === data._id)
                ? "bg-gray-800 hover:bg-gray-900"
                : "bg-[#ff4d2d] hover:bg-[#e04428]"
            }`}
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
