import { FaTrash, FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, decreaseQuantity } from "../redux/userSlice";

const CartCard = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-between bg-[#fff9f6] p-4 rounded-xl shadow-sm hover:shadow-md transition">
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg border"
      />

      {/* Product Details */}
      <div className="flex-1 px-4">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-orange-600 font-medium">₹{item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => dispatch(decreaseQuantity(item.id))}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          <FaMinus size={12} />
        </button>
        <span className="px-3 py-1 bg-white rounded-lg border text-gray-800">
          {item.quantity}
        </span>
        <button
          onClick={() => dispatch(addToCart(item))}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          <FaPlus size={12} />
        </button>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        className="ml-4 text-red-500 hover:text-red-600 transition"
      >
        <FaTrash size={18} />
      </button>
    </div>
  );
};

export default CartCard;
