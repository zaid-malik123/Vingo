import { FaPhoneAlt } from "react-icons/fa";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../redux/userSlice";
import { useState } from "react";

const statusColors = {
  pending: "bg-gray-100 text-gray-600",
  preparing: "bg-blue-100 text-blue-600",
  "out of delivery": "bg-orange-100 text-orange-600",
};

const OwnerOrderCard = ({ order }) => {
  const dispatch = useDispatch();
  const [deliveryBoys, setDeliveryBoys] = useState([]);

  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/order/update-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true }
      );
      setDeliveryBoys(res.data.availableBoys || []);
      dispatch(updateOrderStatus({ orderId, shopId, status }));
    } catch (error) {
      console.log(error);
    }
  };

  const currentStatus = order?.shopOrders?.status || "pending";
  const assignedBoy = order?.shopOrders?.assignedDeliveryBoy;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-5 border border-gray-200 hover:shadow-xl transition duration-200">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-800">{order?.user?.fullName}</h2>
          <p className="text-sm text-gray-500">{order?.user?.email}</p>
          <p className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <FaPhoneAlt className="text-[#ff4d2d]" />
            {order?.user?.mobileNo}
          </p>
          {order.paymentMethod === "online" ? (
            <p className="text-sm mt-1">
              <span className="font-medium text-gray-700">Payment:</span>{" "}
              {order.payment ? (
                <span className="text-green-600 font-semibold">Paid</span>
              ) : (
                <span className="text-red-500 font-semibold">Pending</span>
              )}
            </p>
          ) : (
            <p className="text-sm mt-1">Payment Method: {order.paymentMethod}</p>
          )}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${statusColors[currentStatus]}`}
        >
          {currentStatus}
        </span>
      </div>

      {/* Delivery Address */}
      <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
        <p className="font-medium">{order?.deliveryAddress?.text}</p>
        <p className="text-xs text-gray-500 mt-1">
          Lat: {order?.deliveryAddress?.latitude}, Lon:{" "}
          {order?.deliveryAddress?.longitude}
        </p>
      </div>

      {/* Items */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {order?.shopOrders?.shopOrderItems?.map((item, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-36 border rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition"
          >
            <img
              className="w-full h-20 object-cover rounded-lg"
              src={item.item.image}
              alt={item.item.name}
            />
            <p className="text-sm font-semibold mt-2 text-gray-800 truncate">
              {item.item.name}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Qty: {item.quantity} × ₹{item.item.price}
            </p>
          </div>
        ))}
      </div>

      {/* Status & Actions */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="text-sm text-gray-700 font-medium">Update Status:</span>
        <select
          value=""
          onChange={(e) =>
            handleUpdateStatus(order?._id, order?.shopOrders?.shop?._id, e.target.value)
          }
          className="rounded-lg border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] border-[#ff4d2d] text-[#ff4d2d] bg-white"
        >
          <option value="">Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out of Delivery</option>
        </select>
      </div>

      {/* Delivery Boys Section */}
      {(currentStatus === "out of delivery" || deliveryBoys.length > 0) && (
        <div className="mt-3 p-4 border rounded-lg text-sm bg-orange-50 space-y-2">
          {assignedBoy ? (
            <>
              <p className="font-medium text-gray-700">Assigned Delivery Boy:</p>
              <p className="text-gray-800">
                {assignedBoy.fullName} - {assignedBoy.mobileNo}
              </p>
            </>
          ) : deliveryBoys.length > 0 ? (
            <>
              <p className="font-medium text-gray-700">Available Delivery Boys:</p>
              {deliveryBoys.map((b, idx) => (
                <p key={idx} className="text-gray-800">
                  {b.fullName} - {b.mobileNo}
                </p>
              ))}
            </>
          ) : (
            <p className="text-gray-600 italic">
              Waiting for delivery boys to accept...
            </p>
          )}
        </div>
      )}

      {/* Total */}
      <div className="text-right font-bold text-gray-900 text-xl">
        Total: ₹{order?.shopOrders?.subtotal}
      </div>
    </div>
  );
};

export default OwnerOrderCard;
