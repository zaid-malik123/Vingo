import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice";
import { ClipLoader } from "react-spinners";

const CreateEditShop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.ownerSlice);
  const { currentCity, currentState, currentAddress } = useSelector((state) => state.userSlice);

  // ✅ no need for shop?.shop anymore
  const [name, setName] = useState(shop?.name || "");
  const [city, setCity] = useState(shop?.city || currentCity || "");
  const [state, setState] = useState(shop?.state || currentState || "");
  const [address, setAddress] = useState(shop?.address || currentAddress || "");
  const [frontendImage, setFrontendImage] = useState(shop?.image || null);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("address", address);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const res = await axios.post(`${serverUrl}/api/shop/create-edit`, formData, {
        withCredentials: true,
      });

      // ✅ backend always returns { shop }
      dispatch(setMyShopData(res.data.shop));

      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
              type="text"
              placeholder="Enter Shop Name"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Image
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  className="w-full h-48 object-cover rounded-lg border"
                  src={frontendImage}
                  alt="Preview"
                />
              </div>
            )}
          </div>

          {/* City & State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shop City
              </label>
              <input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
                type="text"
                placeholder="Enter Shop City"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shop State
              </label>
              <input
                onChange={(e) => setState(e.target.value)}
                value={state}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
                type="text"
                placeholder="Enter Shop State"
                required
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Shop Address
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
              type="text"
              placeholder="Enter Shop Address"
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all cursor-pointer"
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditShop;
