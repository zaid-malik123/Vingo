import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const { shop } = useSelector((state) => state.ownerSlice);
  return (
    <div className="flex justify-center flex-col items-center p-6 bg-gradient-to-br from-orange-50 relative to-white min-h-screen">
      <div
        onClick={() => navigate("/")}
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px]"
      >
        <IoArrowBackOutline size={35} className="text-[#ff4d2d]" />
      </div>
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-8 border border-orange-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4">
            <FaUtensils className="w-16 h-16 text-[#ff4d2d]" />
          </div>
          <div className="text-3xl font-extrabold text-gray-900">
            {shop ? "Edit Shop" : "Add Shop"}
          </div>
        </div>
        <form className="space-y-5">
          {/* Name    */}
          <div>
            <label className="block:text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
              type="text"
              placeholder="Enter Shop Name"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block:text-sm font-medium text-gray-700 mb-1">
              Shop Image
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
              type="file"
              accept="image/*"
            />
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block:text-sm font-medium text-gray-700 mb-1">
                Shop City
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
                type="text"
                placeholder="Enter Shop City"
              />
            </div>
            <div>
              <label className="block:text-sm font-medium text-gray-700 mb-1">
                Shop State
              </label>
              <input
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
                type="text"
                placeholder="Enter Shop State"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block:text-sm font-medium text-gray-700 mb-1">
              Shop Address
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
              type="text"
              placeholder="Enter Shop Address"
            />
          </div>
          <button className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all cursor-pointer">Save</button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
