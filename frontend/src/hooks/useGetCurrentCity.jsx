import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/userSlice";

const useGetCurrentCity = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      const API_KEY = import.meta.env.VITE_GEOPIFY_API_KEY;

      try {
        const res = await axios.get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${API_KEY}`
        );

        const city = res?.data?.results[0]?.city;
        if (city) {
          dispatch(setCity(city));
        }
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    });
  }, [user]);
};

export default useGetCurrentCity;
