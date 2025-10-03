import { useDispatch, useSelector } from "react-redux";
import UserOrderCard from "../component/UserOrderCard";
import OwnerOrderCard from "../component/OwnerOrderCard";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import { useEffect } from "react";
import { setMyOrders, updateRealTimeOrderStatus } from "../redux/userSlice";

const MyOrder = () => {
  const { user, myOrders, socket } = useSelector((state) => state.userSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(()=>{
    socket?.on("newOrder", (data)=>{
      if(data.shopOrders.owner._id == user._id){
        dispatch(setMyOrders([data, ...myOrders]))
      }
    })

   socket?.on("updateStatus",({orderId, shopId, status, userId})=>{
   if(userId == user._id){
    dispatch(updateRealTimeOrderStatus({orderId, shopId, status}))
   }
   })

    return ()=>{
      socket?.off("newOrder")
      socket?.off("updateStatus")
    }
  },[socket])

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex justify-center px-4">
      <div className="w-full max-w-[800px] p-4">
        {/* Top bar with back button + heading */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition"
          >
            <IoArrowBackOutline size={22} />
            Back
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center flex-1">
            My Orders
          </h1>

          {/* Empty div to balance flex so heading stays center */}
          <div className="w-[60px]"></div>
        </div>

        <div className="space-y-6">
          {myOrders?.map((order, idx) => (
            <div key={order._id || idx}>
              {user.role === "user" && <UserOrderCard order={order} />}
              {user.role === "owner" && <OwnerOrderCard order={order} />}
            </div>
          ))}
        </div>

        {/* Role-based order cards */}
      </div>
    </div>
  );
};

export default MyOrder;
