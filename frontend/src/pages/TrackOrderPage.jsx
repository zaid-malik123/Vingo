import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { IoArrowBackOutline } from "react-icons/io5";
import {
  FaStore,
  FaUserTie,
  FaBox,
  FaMoneyBill,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import DeliveryBoyMapping from "../component/DeliveryBoyMapping";
import { useSelector } from "react-redux";

const TrackOrderPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [currentOrder, setCurrentOrder] = useState();
  const { user, socket } = useSelector((state) => state.userSlice);
  const [liveLocation, setLiveLocation] = useState({});

  const handleGetOrder = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/order/get-order-by-id/${orderId}`,
        { withCredentials: true }
      );
      setCurrentOrder(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetOrder();
  }, [orderId]);

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = ({ deliveryBoyId, latitude, longitude }) => {
      setLiveLocation((prev) => ({
        ...prev,
        [deliveryBoyId]: { lat: latitude, lon: longitude },
      }));
    };

    socket.on("updateDeliveryLocation", handleUpdate);

    // cleanup listener
    return () => {
      socket.off("updateDeliveryLocation", handleUpdate);
    };
  }, [socket]);

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6 relative">
      {/* Back Button */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate("/my-orders")}
          className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition"
        >
          <IoArrowBackOutline size={22} />
          Back
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center flex-1">
          Track Order
        </h1>

        {/* Empty div to balance flex so heading stays center */}
        <div className="w-[60px]"></div>
      </div>

      {currentOrder?.shopOrders?.length > 0 ? (
        currentOrder.shopOrders.map((so, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-md border border-orange-100 space-y-4 hover:shadow-lg transition-shadow"
          >
            {/* Shop Info */}
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <FaStore className="text-orange-500" />
              <span>{so.shop?.name || "Shop Name"}</span>
            </div>

            {/* Assigned Delivery Boy */}
            {so.assignedDeliveryBoy ? (
              <div className="flex items-center justify-between text-gray-600">
                {/* Name */}
                <div className="flex items-center gap-2">
                  <FaUserTie className="text-orange-400" />
                  <span>
                    Assigned To:{" "}
                    <span className="font-medium">
                      {so.assignedDeliveryBoy.fullName}
                    </span>
                  </span>
                </div>

                {/* Phone */}
                {so.assignedDeliveryBoy.mobileNo && (
                  <a
                    href={`tel:${so.assignedDeliveryBoy.mobileNo}`}
                    className="flex items-center gap-2 text-green-600 hover:underline"
                  >
                    <FaPhoneAlt />
                    <span className="font-medium">
                      {so.assignedDeliveryBoy.mobileNo}
                    </span>
                  </a>
                )}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Delivery Boy is not assigned yet.
              </p>
            )}

            {/* Items */}
            <div className="flex items-start gap-3 text-gray-600">
              <FaBox className="text-orange-400 mt-1" />
              <div className="flex flex-wrap gap-2">
                {so.shopOrderItems?.map((item, i) => (
                  <span
                    key={i}
                    className="bg-orange-50 text-orange-600 px-2 py-1 rounded-md text-sm border border-orange-200"
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Subtotal */}
            <div className="flex items-center gap-3 text-gray-700 font-medium">
              <FaMoneyBill className="text-green-500" />
              <span>
                Subtotal:{" "}
                <span className="font-semibold text-gray-800">
                  ₹{so.subtotal}
                </span>
              </span>
            </div>

            {/* Delivery Address */}
            <div className="flex items-start gap-3 text-gray-600">
              <FaMapMarkerAlt className="text-red-500 mt-1" />
              <span className="leading-snug">
                {currentOrder.deliveryAddress?.text || "No address provided"}
              </span>
            </div>
            {so.assignedDeliveryBoy && (
              <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-md">
                <DeliveryBoyMapping
                  currentOrder={{
                    deliveryBoyLocation: liveLocation[
                      so.assignedDeliveryBoy._id
                    ] || {
                      lat: so.assignedDeliveryBoy.location.coordinates[1],
                      lon: so.assignedDeliveryBoy.location.coordinates[0],
                    },
                    customerLocation: {
                      lat: currentOrder.deliveryAddress.latitude,
                      lon: currentOrder.deliveryAddress.longitude,
                    },
                  }}
                />
              </div>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-6">No shop orders found.</p>
      )}
    </div>
  );
};

export default TrackOrderPage;
