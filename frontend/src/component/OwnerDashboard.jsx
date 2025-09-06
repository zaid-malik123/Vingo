import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const OwnerDashboard = () => {
  const navigate = useNavigate()
  const { shop } = useSelector((state) => state.ownerSlice);
  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
      <Nav />
      {!shop && 
      <div className="flex justify-center items-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col items-center text-center">
           <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20 mb-4" />
           <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Add your resturant</h2>
           <p className="text-gray-600 mb-4 text-sm sm:text-base">Join ovr food delivery platform and reach thousands of hungry customers every day.</p>
           <button onClick={()=> navigate("/create-edit-shop")} className="bg-[#ff4d2d] text-white px-5 sm:px-6 py-2 rounded-full font-medium shadow-md hover:bg-orange-600 transition-colors duration-200">Get Started</button>
          </div>
        </div>
      </div>}

      {shop && 
      <div className="w-full flex flex-col items-center gap-4 sm:px-6">  
        <h1>Welcome to {shop?.shop?.name}</h1>
      </div>}
    </div>
  );
};

export default OwnerDashboard;
