import React from "react";
import { useNavigate } from "react-router-dom";

const UserOrderCard = ({ order }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClasses = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "preparing":
        return "bg-blue-100 text-blue-700";
      case "out of delivery":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md space-y-6 border border-gray-200 hover:shadow-lg transition">
      {/* Top Header */}
      <div className="flex justify-between items-start border-b pb-3">
        <div>
          <p className="font-semibold text-gray-800">
            Order #{order._id.slice(-6)}
          </p>
          <p className="text-sm text-gray-500">
            Date: {formatDate(order.createdAt)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">Payment:</span>{" "}
            {order.paymentMethod === "online" ? (
              order.payment ? (
                <span className="text-green-600 font-semibold">Paid</span>
              ) : (
                <span className="text-red-500 font-semibold">Unpaid</span>
              )
            ) : (
              <span className="text-gray-700 capitalize">{order.paymentMethod}</span>
            )}
          </p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-xs text-gray-500 uppercase">
            {order.paymentMethod}
          </p>
          <span
            className={`inline-block px-3 py-1 text-xs font-bold rounded-full capitalize ${getStatusClasses(
              order.shopOrders?.[0].status
            )}`}
          >
            {order.shopOrders?.[0].status}
          </span>
        </div>
      </div>

      {/* Shop Orders */}
      {order.shopOrders.map((o, i) => (
        <div
          className="border rounded-xl p-4 bg-[#fffaf7] space-y-4 shadow-sm"
          key={i}
        >
          <p className="font-medium text-gray-800">{o.shop.name}</p>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {o.shopOrderItems.map((item, idx) => (
              <div
                className="flex-shrink-0 w-40 border rounded-lg p-3 bg-white shadow-sm"
                key={idx}
              >
                <img
                  className="w-full h-24 object-cover rounded-lg"
                  src={item.item.image}
                  alt={item.item.name}
                />
                <p className="text-sm font-semibold mt-2 text-gray-800 truncate">
                  {item.item.name}
                </p>
                <p className="text-xs text-gray-500">
                  Qty: {item.quantity} × ₹{item.item.price}
                </p>
              </div>
            ))}
          </div>

          {/* Subtotal & Status */}
          <div className="flex justify-between items-center border-t pt-2">
            <p className="font-semibold text-gray-700">
              Subtotal: ₹{o.subtotal}
            </p>
            <span
              className={`px-2 py-1 rounded-md text-xs font-medium capitalize ${getStatusClasses(
                o.status
              )}`}
            >
              {o.status}
            </span>
          </div>
        </div>
      ))}

      {/* Total & Track Button */}
      <div className="flex justify-between items-center border-t pt-3">
        <p className="font-bold text-gray-900 text-xl">
          Total: ₹{order.totalAmount}
        </p>
        {order.shopOrders[0].status !== "delivered" && (
          <button
            onClick={() => navigate(`/track-order/${order._id}`)}
            className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-6 py-2 rounded-full text-sm font-semibold shadow transition"
          >
            Track Order
          </button>
        )}
      </div>
    </div>
  );
};

export default UserOrderCard;
