import { FaPhoneAlt } from "react-icons/fa";

const OwnerOrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 space-y-5 border border-gray-100 hover:shadow-lg transition">
      
      {/* User Info */}
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-gray-800">
          {order.user.fullName}
        </h2>
        <p className="text-sm text-gray-500">{order.user.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-600">
          <FaPhoneAlt className="text-[#ff4d2d]" />
          {order.user.mobileNo}
        </p>
      </div>

      {/* Delivery Address */}
      <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
        <p className="font-medium">{order?.deliveryAddress?.text}</p>
        <p className="text-xs text-gray-500 mt-1">
          Lat: {order?.deliveryAddress?.latitude}, Lon:{" "}
          {order?.deliveryAddress?.longitude}
        </p>
      </div>

      {/* Items */}
      <div className="flex space-x-4 overflow-x-auto pb-2">
        {order.shopOrders.shopOrderItems.map((item, idx) => (
          <div
            className="flex-shrink-0 w-40 border rounded-xl p-3 bg-white shadow-sm hover:shadow-md transition"
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
            <p className="text-xs text-gray-500 mt-1">
              Qty: {item.quantity} × ₹{item.item.price}
            </p>
          </div>
        ))}
      </div>

      {/* Status & Actions */}
      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
        <span className="text-sm">
          Status:{" "}
          <span className="font-semibold capitalize text-[#ff4d2d]">
            {order.shopOrders.status}
          </span>
        </span>
        <select
          className="rounded-lg border px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] border-[#ff4d2d] text-[#ff4d2d] bg-white"
          value={order.shopOrders.status}
        >
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out of delivery</option>
        </select>
      </div>

      {/* Total */}
      <div className="text-right font-semibold text-gray-800">
        Total: ₹{order.shopOrders.subtotal}
      </div>
    </div>
  );
};

export default OwnerOrderCard;
