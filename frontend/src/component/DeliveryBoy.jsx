import { useSelector } from "react-redux";
import Nav from "./Nav";
import axios from "axios";
import { serverUrl } from "../App";
import { useEffect, useState } from "react";
import { FaStore, FaMapMarkerAlt, FaBox } from "react-icons/fa";

const DeliveryBoy = () => {
  const { user } = useSelector((state) => state.userSlice);
  const [availableAssignment, setAvailableAssignment] = useState([]);
  console.log(availableAssignment);

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

  useEffect(() => {
    handleGetAssignment();
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
                  <button className="bg-[#ff4d2d] text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#e8432b] transition">
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
      </div>
    </div>
  );
};

export default DeliveryBoy;
