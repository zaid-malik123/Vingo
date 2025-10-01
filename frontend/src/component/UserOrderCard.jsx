import React from "react";
import { useNavigate } from "react-router-dom";

const UserOrderCard = ({ order }) => {
  const navigate = useNavigate()
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
        return "bg-green-100 text-green-700";
      case "out of delivery":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md space-y-6">
      {/* Top Header */}
      <div className="flex justify-between items-start border-b pb-3">
        <div>
          <p className="font-semibold text-gray-800">
            Order #{order._id.slice(-6)}
          </p>
          <p className="text-sm text-gray-500">
            Date: {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-xs text-gray-500 uppercase">
            {order.paymentMethod}
          </p>
          <span
            className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(
              order.shopOrders?.[0].status
            )}`}
          >
            {order.shopOrders?.[0].status}
          </span>
        </div>
      </div>

      {/* Shop Orders */}
      {order.shopOrders.map((o, i) => (
        <div className="border rounded-xl p-4 bg-[#fffaf7] space-y-4" key={i}>
          <p className="font-medium text-gray-800">{o.shop.name}</p>
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {o.shopOrderItems.map((item, idx) => (
              <div
                className="flex-shrink-0 w-40 border rounded-lg p-3 bg-white"
                key={idx}
              >
                <img
                  className="w-full h-24 object-cover rounded-lg"
                  src={item.item.image}
                  alt={item.item.name}
                />
                <p className="text-sm font-semibold mt-2 text-gray-800">
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
              className={`px-2 py-1 rounded-md text-xs font-medium ${getStatusClasses(
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
        <p className="font-bold text-gray-800 text-lg">
          Total: ₹{order.totalAmount}
        </p>
       {order.shopOrders[0].status != "delivered" && (
         <button onClick={()=> navigate(`/track-order/${order._id}`) } className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-6 py-2 rounded-full text-sm font-medium shadow">
          Track Order
        </button>
       )}
      </div>
    </div>
  );
};

export default UserOrderCard;
