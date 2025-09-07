import { FaPen } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

const OwnerItemCard = ({ item }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
   const handleDeleteItem = async ()=>{
  try {
    const res = await axios.get(`${serverUrl}/api/item/delete-item/${item._id}`,{withCredentials:true})
    dispatch(setMyShopData(res.data.shop))
  } catch (error) {
    console.log(error)
  }
  }

  return (
    <div className="flex bg-white rounded-xl shadow-md hover:shadow-lg overflow-hidden border border-gray-200 hover:border-[#ff4d2d] transition-all duration-300 w-full max-w-2xl transform hover:scale-[1.01]">
      {/* Image Section */}
      <div className="w-36 h-36 flex-shrink-0 relative overflow-hidden">
        <img
          className="w-full h-full object-cover rounded-l-xl hover:scale-110 transition-transform duration-300"
          src={item.image}
          alt={item.name}
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between p-4 flex-1">
        <div className="space-y-2">
          <h2 className="text-lg font-semibold text-gray-900">{item.name}</h2>
          
          <div className="flex flex-wrap gap-2 text-sm">
            <span className="px-2 py-1 bg-orange-50 text-[#ff4d2d] rounded-full font-medium">
              {item.category}
            </span>
            <span className="px-2 py-1 bg-green-50 text-green-600 rounded-full font-medium">
              {item.foodType}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          <div className="text-lg font-bold text-[#ff4d2d]">₹{item.price}</div>

          <div className="flex items-center gap-2">
            {/* Edit Button */}
            <div
              onClick={() => navigate(`/edit-item/${item._id}`)}
              className="p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer transition"
              title="Edit Item"
            >
              <FaPen size={18} />
            </div>

            {/* Delete Button */}
            <div 
              onClick={handleDeleteItem} 
              className="p-2 rounded-full hover:bg-red-50 text-red-500 cursor-pointer transition"
              title="Delete Item"
            >
              <ImBin2  size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerItemCard;
