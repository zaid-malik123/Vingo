import { useSelector } from "react-redux";
import Nav from "./Nav";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import { FaStore, FaMapMarkerAlt, FaBox } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import DeliveryBoyMapping from "./DeliveryBoyMapping";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DeliveryBoy = () => {
  const { user, socket } = useSelector((state) => state.userSlice);
  const [availableAssignment, setAvailableAssignment] = useState([]);
  const [currentOrder, setCurrentOrder] = useState();
  const [showBox, setShowBox] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [todayDeliveries, setTodayDeliveries] = useState([]);
  const [totalEarning, setTotalEarning] = useState(0);

  useEffect(() => {
    if (!socket || user.role != "deliveryBoy") return;
    let watchId;
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        socket.emit("updateLocation", {
          latitude,
          longitude,
          userId: user._id,
        });
      });
      (error) => {
        console.log(error);
      },
        {
          enableHighAccuracy: true,
        };
      return () => {
        if (watchId) navigator.geolocation.clearWatch(watchId);
      };
    }
  }, [socket, user]);

  const handleGetAssignment = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/get-assignments`, {
        withCredentials: true,
      });
      setAvailableAssignment(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAcceptAssignment = async (assignmentId) => {
    try {
      await axios.get(`${serverUrl}/api/order/accept-order/${assignmentId}`, {
        withCredentials: true,
      });
      await handleGetCurrentOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetCurrentOrder = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/current-order`, {
        withCredentials: true,
      });
      setCurrentOrder(res.data);
    } catch (error) {
      setCurrentOrder(null);
      console.log(error);
    }
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${serverUrl}/api/order/send-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setShowBox(true);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/order/verify-delivery-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
          otp,
        },
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTodayDeliveries = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/order/get-today-deliveries`,
        { withCredentials: true }
      );
      setTodayDeliveries(res.data);
      const totalDeliveries = res.data.reduce(
        (sum, item) => sum + item.count,
        0
      );
      setTotalEarning(totalDeliveries * 50);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleTodayDeliveries();
  }, []);

  useEffect(() => {
    handleGetAssignment();
    handleGetCurrentOrder();
  }, [user]);

  useEffect(() => {
    socket?.on("newAssignment", (data) => {
      if (data.sentTo == user._id) {
        setAvailableAssignment((prev) => [...prev, data]);
      }
    });
    return () => {
      socket?.off("newAssignment");
    };
  }, [socket]);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
      <Nav />
      <div className="w-full max-w-3xl flex flex-col gap-6 items-center px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center w-full border border-orange-100 gap-3">
          <h1 className="text-2xl font-bold text-[#ff4d2d]">
            Welcome, {user.fullName}
          </h1>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            <FaMapMarkerAlt className="text-[#ff4d2d]" />
            <span>
              <span className="font-semibold">Lat:</span>{" "}
              {user.location.coordinates[1]} ,{" "}
              <span className="font-semibold">Lng:</span>{" "}
              {user.location.coordinates[0]}
            </span>
          </p>
        </div>

        {/* Today Deliveries Chart */}
        {todayDeliveries.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-md w-full border border-orange-100 mt-6">
            <h2 className="text-xl font-bold mb-4 text-[#ff4d2d] flex items-center gap-2">
              <FaBox /> Today's Deliveries
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={todayDeliveries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="hour"
                  label={{
                    value: "Hour",
                    position: "insideBottomRight",
                    offset: 0,
                  }}
                />
                <YAxis
                  allowDecimals={false}
                  label={{
                    value: "Deliveries",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#ff4d2d" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="max-w-sm mx-auto mt-6 p-6 bg-orange-50 border border-orange-100 rounded-2xl shadow-md text-center">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Today's Earnings
              </h3>
              <p className="text-3xl font-bold text-[#ff4d2d]">
                ₹{totalEarning}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {todayDeliveries.reduce((sum, item) => sum + item.count, 0)}{" "}
                Deliveries Completed
              </p>
            </div>
          </div>
        )}

        {/* Available Orders */}
        {currentOrder == null && (
          <div className="bg-white rounded-2xl p-6 shadow-md w-full border border-orange-100">
            <h1 className="text-xl font-bold mb-5 flex items-center gap-2 text-[#ff4d2d]">
              <FaBox /> Available Orders
            </h1>
            <div className="space-y-4">
              {availableAssignment.length > 0 ? (
                availableAssignment.map((a, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-xl p-5 flex justify-between items-start hover:shadow-lg transition"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="font-semibold text-gray-800 flex items-center gap-2">
                        <FaStore className="text-orange-500" /> {a.shopName}
                      </p>
                      <p className="text-sm text-gray-600">
                        📍 {a.deliveryAddress.text}
                      </p>
                      <p className="text-sm text-gray-500">
                        {a.items.length} items | ₹{a.subtotal}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAcceptAssignment(a.assignmentId)}
                      className="bg-[#ff4d2d] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#e8432b] transition"
                    >
                      Accept
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center text-sm">
                  🚫 No Available Orders
                </p>
              )}
            </div>
          </div>
        )}

        {/* Current Order */}
        {currentOrder && (
          <div className="bg-white rounded-2xl p-6 shadow-md w-full border border-orange-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-[#ff4d2d]">
              <FaBox /> Current Order
            </h2>

            {/* Shop + Items */}
            <div className="mb-6">
              <p className="font-semibold text-gray-800 flex items-center gap-2">
                <FaStore className="text-orange-500" /> Shop Order
              </p>
              <p className="text-sm text-gray-600">
                {currentOrder.shopOrder.shopOrderItems.length} items | ₹
                {currentOrder.shopOrder.subtotal}
              </p>
              <p
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                  currentOrder.shopOrder.status === "out of delivery"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {currentOrder.shopOrder.status}
              </p>
            </div>

            {/* Customer Details */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Customer Details
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg border text-sm">
                <p className="text-gray-800 font-medium">
                  {currentOrder.user.fullName}
                </p>
                <p className="text-gray-600">{currentOrder.user.mobileNo}</p>
                <p className="text-gray-600">{currentOrder.user.email}</p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Delivery Address
              </h3>
              <div className="bg-gray-50 p-3 rounded-lg border text-sm text-gray-700">
                📍 {currentOrder.deliveryAddress.text}
              </div>
            </div>

            {/* Location Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <p className="font-semibold text-gray-700 mb-1">
                  Delivery Boy Location
                </p>
                <p className="text-gray-600">
                  Lat: {currentOrder.deliveryBoyLocation.lat}
                </p>
                <p className="text-gray-600">
                  Lng: {currentOrder.deliveryBoyLocation.lon}
                </p>
              </div>
              <div className="bg-orange-50 p-3 rounded-xl border border-orange-100">
                <p className="font-semibold text-gray-700 mb-1">
                  Customer Location
                </p>
                <p className="text-gray-600">
                  Lat: {currentOrder.customerLocation.lat}
                </p>
                <p className="text-gray-600">
                  Lng: {currentOrder.customerLocation.lon}
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden shadow-md mb-6">
              <DeliveryBoyMapping currentOrder={currentOrder} />
            </div>

            {/* Action Button */}
            {!showBox ? (
              <button
                onClick={sendOtp}
                className="bg-[#ff4d2d] w-full py-3 text-white rounded-xl text-base font-medium hover:bg-[#e8432b] transition"
              >
                {loading ? (
                  <ClipLoader color="white" size={20} />
                ) : (
                  "Mark as Delivered"
                )}
              </button>
            ) : (
              <div className="mt-4 p-4 border border-orange-100 rounded-xl bg-orange-50/40">
                <p className="text-sm font-semibold mb-3 text-gray-700">
                  Enter OTP sent to{" "}
                  <span className="text-orange-500 font-bold">
                    {currentOrder.user.fullName}
                  </span>
                </p>
                <div className="flex items-center gap-3">
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    maxLength={6}
                    placeholder="Enter 4-digit OTP"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-orange-400 outline-none text-sm tracking-widest font-mono"
                  />
                  <button
                    onClick={verifyOtp}
                    className="px-5 py-2 bg-[#ff4d2d] text-white rounded-lg text-sm font-medium hover:bg-[#e8432b] transition"
                  >
                    {loading ? (
                      <ClipLoader color="white" size={20} />
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Didn’t receive the OTP?{" "}
                  <button
                    onClick={sendOtp}
                    className="text-orange-500 hover:underline font-medium"
                  >
                    Resend
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryBoy;
