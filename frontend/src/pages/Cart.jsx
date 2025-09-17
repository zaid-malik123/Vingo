import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CartCard from "../component/CartCard";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.userSlice);

  // Total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#fafafa] flex justify-center p-6">
      <div className="w-full max-w-[1100px] relative">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-2 -left-2 flex items-center gap-2 
                     text-orange-600 font-medium hover:text-orange-700 transition"
        >
          <IoArrowBackOutline size={24} />
          Back
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-10">
          🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl shadow-md">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
              alt="empty cart"
              className="w-32 mb-6 opacity-80"
            />
            <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg font-semibold transition"
            >
              Browse Foods
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 bg-white p-5 rounded-2xl shadow-md space-y-4">
              {cartItems.map((item) => (
                <CartCard key={item.id} item={item} />
              ))}
            </div>

            {/* Summary Section */}
            <div className="w-full md:w-1/3 sticky top-6 self-start">
              <div className="bg-white p-6 rounded-2xl shadow-md">
                <h2 className="text-xl font-semibold mb-5 text-gray-800">
                  Order Summary
                </h2>
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-gray-700 mb-2">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t my-3"></div>
                <div className="flex justify-between font-semibold text-gray-900 text-lg">
                  <span>Total</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 
                             hover:from-orange-600 hover:to-orange-700 
                             text-white font-semibold py-3 rounded-xl transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
