import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { MdDeliveryDining } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import "leaflet/dist/leaflet.css";
import { setLocation, setUserAddress } from "../redux/mapSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const RecenterMap = ({ location }) => {
  const map = useMap();
  useEffect(() => {
    if (location?.lat && location?.lon) {
      map.setView([location.lat, location.lon], 16, { animate: true });
    }
  }, [location, map]);
  return null;
};

const Checkout = () => {
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_GEOPIFY_API_KEY;
  const { location, address } = useSelector((state) => state.mapSlice);
  const { cartItems } = useSelector((state) => state.userSlice);
  const [addressInput, setAddressInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Drag marker -> update lat/lng + address
  const onDragEnd = (e) => {
    const { lat, lng } = e.target._latlng;
    dispatch(setLocation({ lat, lon: lng }));
    getAddressByLatLng(lat, lng);
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${API_KEY}`
      );
      dispatch(setUserAddress(res?.data?.features[0]?.properties?.formatted));
    } catch (error) {
      console.log(error);
    }
  };

  const getLatLngByAddress = async () => {
    try {
      const res = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput
        )}&apiKey=${API_KEY}`
      );
      const { lat, lon } = res.data.features[0].properties;
      dispatch(setLocation({ lat, lon }));
      getAddressByLatLng(lat, lon);
    } catch (error) {
      console.log(error);
    }
  };

  // 📍 Get Current Location (Blue Button)
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          dispatch(setLocation({ lat, lon }));
          getAddressByLatLng(lat, lon);
        },
        (err) => {
          console.log("Error getting current location:", err);
          alert("Unable to fetch your location. Please enable GPS.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    setAddressInput(address);
  }, [address]);

  return (
    <div className="min-h-screen bg-[#fff9f6] flex items-center justify-center p-6 relative">
      {/* Back Button */}
      <button
        onClick={() => navigate("/cart")}
        className="absolute top-6 left-6 flex items-center gap-2
          text-orange-600 font-medium hover:text-orange-700 transition-all"
      >
        <IoArrowBackOutline size={20} />
        <span>Back</span>
      </button>

      {/* Checkout Card */}
      <div className="w-full max-w-[900px] bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Checkout</h1>

        {/* Delivery Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-800">
            <FaLocationDot size={16} className="text-[#ff4d2d]" />
            Delivery Location
          </h2>

          {/* Address Input */}
          <div className="flex gap-2 mb-4">
            <input
              placeholder="Enter your delivery address"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm 
                focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] transition-all"
              type="text"
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
            />
            <button
              onClick={getLatLngByAddress}
              className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-3 py-2 rounded-lg 
                flex items-center justify-center shadow-md transition-all"
            >
              <IoIosSearch size={17} />
            </button>
            <button
              onClick={getCurrentLocation}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg 
                flex items-center justify-center shadow-md transition-all"
            >
              <TbCurrentLocation size={17} />
            </button>
          </div>

          {/* Map */}
          <div className="rounded-xl border overflow-hidden shadow-md">
            <div className="h-72 w-full flex items-center justify-center">
              <MapContainer
                className="w-full h-full"
                zoom={16}
                center={[location?.lat, location?.lon]}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RecenterMap location={location} />
                <Marker
                  draggable
                  eventHandlers={{ dragend: onDragEnd }}
                  position={[location?.lat, location?.lon]}
                />
              </MapContainer>
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Payment Method
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                paymentMethod === "cod"
                  ? "border-[#ff4d2d] bg-orange-50 shadow"
                  : "border-gray-200 hover:border-x-gray-300"
              }`}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <MdDeliveryDining className="text-green-600 text-xl" />
              </span>
              <div>
                <p className="font-medium text-gray-800">Cash On Delivery</p>
                <p className="text-xs text-gray-500">
                  Pay when your food arrives
                </p>
              </div>
            </div>

            <div
              onClick={() => setPaymentMethod("online")}
              className={`flex items-center gap-3 rounded-xl border p-4 text-left transition ${
                paymentMethod === "online"
                  ? "border-[#ff4d2d] bg-orange-50 shadow"
                  : "border-gray-200 hover:border-x-gray-300"
              }`}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <FaMobileAlt className="text-purple-700 text-lg" />
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <FaRegCreditCard className="text-blue-700 text-lg" />
              </span>
              <div>
                <p className="font-medium text-gray-800">
                  UPI / Credit / Debit Card
                </p>
                <p className="text-xs text-gray-500">Pay Securely Online</p>
              </div>
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section>
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>

          {/* Items List */}
          <div className="rounded-2xl border bg-white shadow-sm divide-y">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4"
              >
                {/* Item Info */}
                <div className="flex items-center gap-3">
                  {/* Placeholder image (or use item.image if available) */}

                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <span className="font-semibold text-gray-800">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Price Details */}
          <div className="mt-4 rounded-2xl border bg-gray-50 p-4 space-y-3 shadow-inner">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery Fee</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 pt-2 border-t">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="mt-6">
            <button
              onClick={() => alert("Order Placed! 🎉")}
              className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 
                 hover:brightness-110 active:scale-95 transition-all
                 text-white py-3.5 rounded-2xl font-semibold text-lg shadow-lg"
            >
              {paymentMethod == "cod" ? "Place Order": "Pay & Place Order"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
