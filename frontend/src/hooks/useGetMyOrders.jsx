import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice";

const useGetMyOrders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/my-orders`, { withCredentials: true });
      console.log(res.data.orders)
      dispatch(setMyOrders(res.data.orders));
    } catch (error) {
      console.log("get-my error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   fetchOrders()
  }, [user]);

  return loading;
};

export default useGetMyOrders;
