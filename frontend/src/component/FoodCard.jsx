import { FaLeaf } from "react-icons/fa6";
import { FaDrumstickBite } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/userSlice";
const FoodCard = ({ data }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  // Render stars based on rating
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

  // Increase / Decrease Quantity
  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="w-[260px] rounded-2xl border-2 border-[#ff4d2d] bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-[170px] flex justify-center items-center bg-gray-50">
        <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow-md">
          {data.foodType === "veg" ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>
        <img
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          src={data.image}
          alt={data.name}
        />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col p-4">
        {/* Title */}
        <h1 className="font-semibold text-gray-900 text-base truncate">
          {data.name}
        </h1>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {renderStars(data.rating?.average || 0)}
          <span className="text-xs text-gray-500">
            ({data.rating?.count || 0})
          </span>
        </div>

        {/* Price + Controls */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="font-bold text-[#ff4d2d] text-lg">
            ₹{data.price}
          </span>

          <div className="flex items-center border rounded-full overflow-hidden shadow-sm bg-gray-50">
            {/* Decrease */}
            <button
              onClick={handleDecrease}
              className="px-2 py-1 hover:bg-gray-200 transition"
            >
              <FaMinus />
            </button>

            {/* Qty */}
            <span className="px-2 text-sm font-medium">{quantity}</span>

            {/* Increase */}
            <button
              onClick={handleIncrease}
              className="px-2 py-1 hover:bg-gray-200 transition"
            >
              <FaPlus />
            </button>

            {/* Cart */}
            <button
              onClick={() =>
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
              className="bg-[#ff4d2d] text-white px-3 py-2 hover:bg-[#e04428] transition"
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
