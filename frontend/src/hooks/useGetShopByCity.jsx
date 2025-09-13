import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyShopData } from "../redux/ownerSlice";
import { setShopsInMyCity } from "../redux/userSlice";


const useGetShopByCity = () => {
  const dispatch = useDispatch();
  const { user, currentCity } = useSelector((state) => state.userSlice);
  const [loading, setLoading] = useState(true); // new state

  const fetchShopByCity = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/shop/get-by-city/${currentCity}`, { withCredentials: true });
      console.log(res.data)
      dispatch(setShopsInMyCity(res.data.shops));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchShopByCity();
  }, [currentCity]);

  return loading; // return loading state
};

export default useGetShopByCity;
