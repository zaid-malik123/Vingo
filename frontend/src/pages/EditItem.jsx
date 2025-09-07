import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { setMyShopData } from "../redux/ownerSlice";
import { ClipLoader } from "react-spinners";



const EditItem = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shop } = useSelector((state) => state.ownerSlice);

  const [currItem, setCurrItem] = useState("");
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
  const [loading, setLoading] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("foodType", foodType);
      if (backendImage) {
        formData.append("image", backendImage);
      }
      const res = await axios.post(
        `${serverUrl}/api/item/edit-item/${itemId}`,
        formData,
        { withCredentials: true }
      );
      dispatch(setMyShopData(res.data.shop));
      setLoading(false)
      navigate("/");
    } catch (error) {
      setLoading(false)  
      console.log(error);
    }
  };

  const getSingleItem = async () => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/item/get-single-item/${itemId}`,
        { withCredentials: true }
      );
      setCurrItem(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleItem();
  }, []);

  useEffect(() => {
    if (currItem) {
      setName(currItem.name || "");
      setPrice(currItem.price || "");
      setCategory(currItem.category || "");
      setFoodType(currItem.foodType || "veg");
      setFrontendImage(currItem.image || null);
    }
  }, [currItem]);

  return (
    <div className="flex justify-center items-center p-6 bg-gradient-to-br from-orange-50 via-white to-orange-100 min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition"
      >
        <IoArrowBackOutline size={28} />
        Back
      </button>

      {/* Card */}
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-3xl p-8 border border-orange-100">
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-orange-100 p-5 rounded-full shadow-inner mb-4">
            <FaUtensils className="w-14 h-14 text-[#ff4d2d]" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Food</h1>
          <p className="text-gray-500 text-sm mt-1">Update your menu item</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2 transition"
              type="text"
              placeholder="Enter food name"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2 transition"
              type="number"
              placeholder="Enter food price"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Food Image
            </label>
            <input
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2 transition"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
            {frontendImage && (
              <div className="mt-4">
                <img
                  className="w-full h-52 object-cover rounded-xl border shadow"
                  src={frontendImage}
                  alt=""
                />
              </div>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2 transition"
            >
              <option value="">Select category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Food Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Food Type
            </label>
            <select
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
              className="w-full px-4 py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 mt-2 transition"
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>

          {/* Save Button */}
          <button disabled={loading} className="w-full bg-gradient-to-r from-[#ff4d2d] to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-[1.02] transition-all">
           {loading ? <ClipLoader size={20} color="white"/> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditItem;
