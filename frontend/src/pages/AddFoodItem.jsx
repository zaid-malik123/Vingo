import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice";

const AddFoodItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.ownerSlice);
  const categories = [
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category)
      formData.append("foodType", foodType)
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const res = await axios.post(
        `${serverUrl}/api/item/create-item`,
        formData, 
        { withCredentials: true }
      );
      dispatch(setMyShopData(res.data));
      navigate("/");
    } catch (error) {
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
          <div className="text-3xl font-extrabold text-gray-900">Add Food</div>
        </div>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-5">
          {/* Name    */}
          <div>
            <label className="block:text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
              type="text"
              placeholder="Enter Food Name"
            />
          </div>

          {/* Food Price */}
          <div>
            <label className="block:text-sm font-medium text-gray-700 mb-1">
              Food Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
              type="text"
              placeholder="Enter Food Price"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block:text-sm font-medium text-gray-700 mb-1">
              Food Image
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
                  alt=""
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
            >
              <option value="">Select Food Category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          
          {/* Food Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Food Type
            </label>
            <select
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2"
            >
             <option value="veg">Veg</option>
             <option value="non-veg">Non-Veg</option>
            </select>
          </div>

          <button className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all cursor-pointer">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFoodItem;
