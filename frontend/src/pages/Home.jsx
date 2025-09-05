import { useSelector } from "react-redux";
import UserDashboard from "../component/UserDashboard";
import OwnerDashboard from "../component/OwnerDashboard";
import DeliveryBoy from "../component/DeliveryBoy";

const Home = () => {
  const { user } = useSelector((state) => state.userSlice);
  return (
    <div className='w-[100vw] min-h-screen pt-[100px] flex flex-col items-center bg-[#fff9f6]'>
     {user.role == "user" && <UserDashboard/>}
     {user.role == "owner" && <OwnerDashboard/>}
     {user.role == "deliveryBoy" && <DeliveryBoy/>}
    </div>
  )
}

export default Home
