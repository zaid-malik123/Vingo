import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";


const useGetMyShop = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // new state

  const fetchShop = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/shop/get-my`, { withCredentials: true });
      dispatch(setMyShopData(res.data.shop));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchShop();
  }, []);

  return loading; // return loading state
};

export default useGetMyShop;
