import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyShop = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const [loading, setLoading] = useState(true);

  const fetchShop = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/shop/get-my`, { withCredentials: true });
      dispatch(setMyShopData(res.data.shop));
    } catch (error) {
      console.log("get-my error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {   // ✅ sirf jab user available ho tabhi call karo
      fetchShop();
    }
  }, [user]);

  return loading;
};

export default useGetMyShop;
