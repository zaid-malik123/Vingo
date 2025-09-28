import { useSelector } from "react-redux";
import Nav from "./Nav";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import { FaStore, FaMapMarkerAlt, FaBox } from "react-icons/fa";
import DeliveryBoyMapping from "./DeliveryBoyMapping";

const DeliveryBoy = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [availableAssignment, setAvailableAssignment] = useState([]);
  const [currentOrder, setCurrentOrder] = useState();
  console.log(currentOrder);
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
      const res = await axios.get(
        `${serverUrl}/api/order/accept-order/${assignmentId}`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
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

  useEffect(() => {
    handleGetAssignment();
    handleGetCurrentOrder();
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
      <Nav />
      <div className="w-full max-w-3xl flex flex-col gap-6 items-center px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center w-full border border-orange-100 gap-3">
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

        {/* Orders Section */}
        {!currentOrder == null && (
          <div className="bg-white rounded-2xl p-6 shadow-lg w-full border border-orange-100">
            <h1 className="text-xl font-bold mb-5 flex items-center gap-2 text-[#ff4d2d]">
              <FaBox /> Available Orders
            </h1>
            <div className="space-y-4">
              {availableAssignment.length > 0 ? (
                availableAssignment.map((a, i) => (
                  <div
                    key={i}
                    className="border border-gray-200 rounded-xl p-5 flex justify-between items-start hover:shadow-md transition"
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
        {currentOrder && (
          <div className="bg-white rounded-2xl p-6 shadow-lg w-full border border-orange-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-[#ff4d2d]">
              <FaBox /> Current Order
            </h2>

            {/* Shop + Items */}
            <div className="mb-4">
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
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Customer Details
              </h3>
              <p className="text-gray-800">{currentOrder.user.fullName}</p>
              <p className="text-gray-600 text-sm">
                {currentOrder.user.mobileNo}
              </p>
              <p className="text-gray-600 text-sm">{currentOrder.user.email}</p>
            </div>

            {/* Delivery Address */}
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">
                Delivery Address
              </h3>
              <p className="text-gray-700 text-sm">
                📍 {currentOrder.deliveryAddress.text}
              </p>
            </div>

            {/* Location Info */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
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

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              <button className="bg-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-300 transition">
                Cancel
              </button>
              <button className="bg-[#ff4d2d] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#e8432b] transition">
                Mark as Delivered
              </button>
            </div>
            <DeliveryBoyMapping currentOrder={currentOrder}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryBoy;
