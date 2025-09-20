import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const OrderPlaced = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fff9f6] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
      {/* Success Icon */}
      <div className="bg-green-100 rounded-full p-4 mb-6 animate-bounce">
        <FaCircleCheck className="text-green-600 text-6xl" />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Order Placed Successfully 🎉
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 max-w-md mb-6">
        Thank you for your order! We’re preparing your delicious food.  
        You’ll receive a notification once it’s on the way 🚀
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 rounded-2xl bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
        >
          Go to Home
        </button>
        <button
          onClick={() => navigate("/orders")}
          className="px-6 py-3 rounded-2xl border border-gray-300 text-gray-700 font-medium shadow hover:bg-gray-100 transition"
        >
          View Orders
        </button>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-[-80px] right-[-80px] w-60 h-60 bg-green-100 rounded-full opacity-40 blur-2xl" />
      <div className="absolute bottom-[-100px] left-[-100px] w-72 h-72 bg-orange-100 rounded-full opacity-40 blur-2xl" />
    </div>
  );
};

export default OrderPlaced;
