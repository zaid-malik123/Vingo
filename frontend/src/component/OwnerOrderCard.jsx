import { FaPhoneAlt } from "react-icons/fa";

const OwnerOrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{order.user.fullName}</h2>
        <p className="text-sm text-gray-500">{order.user.email}</p>
        <p className="flex items-center gap-2 text-sm text-gray-600 mt-1"><span><FaPhoneAlt /></span>{order.user.mobileNo}</p>
      </div>

      <div className="flex items-start gap-2 text-gray-600 text-sm flex-col">
        <p>{order?.deliveryAddress.text}</p>
        <p className="text-xs text-gray-500"> Lat : {order?.deliveryAddress?.latitude}, Lon : {order?.deliveryAddress?.longitude}</p>
      </div>

    </div>
  );
};

export default OwnerOrderCard;
