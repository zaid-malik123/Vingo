import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartCard from "../component/CartCard";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.userSlice);

  // Total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#fff9f6] flex justify-center p-6">
      <div className="w-full max-w-[900px] relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-0 -left-2 flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition"
        >
          <IoArrowBackOutline size={24} />
          Back
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Cart Items */}
            <div className="flex-1 bg-white p-4 rounded-2xl shadow-md space-y-4">
              {cartItems.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>

            {/* Summary Section */}
            <div className="w-full md:w-1/3 bg-white p-5 rounded-2xl shadow-md h-fit">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Summary</h2>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t my-2"></div>
              <div className="flex justify-between font-semibold text-gray-900 text-lg">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>
              <button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-lg transition">
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
