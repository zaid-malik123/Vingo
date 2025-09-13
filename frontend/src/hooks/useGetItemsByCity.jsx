import axios from "axios";
import { useEffect, useState } from "react";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setItemsInMyCity } from "../redux/userSlice";


const useGetItemsByCity = () => {
  const dispatch = useDispatch();
  const { user, currentCity } = useSelector((state) => state.userSlice);
  const [loading, setLoading] = useState(true); // new state

  const fetchItemsByCity = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/item/get-item-by-city/${currentCity}`, { withCredentials: true });
      dispatch(setItemsInMyCity(res.data.shops));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // stop loading
    }
  };

  useEffect(() => {
    fetchItemsByCity();
  }, [currentCity]);

  return loading; // return loading state
};

export default useGetItemsByCity;
