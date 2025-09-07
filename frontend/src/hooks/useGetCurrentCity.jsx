import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress, setCity, setState } from "../redux/userSlice";

const useGetCurrentCity = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const lon = position.coords.longitude;
      const lat = position.coords.latitude;
      const API_KEY = import.meta.env.VITE_GEOCODING_API_KEY;
      // const API_KEY= import.meta.env.VITE_GEOPIFY_API_KEY
      try {
        const res = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}`
        );
        // console.log(res.data)
        const components = res?.data?.results[0]?.components;

        const city =
          components?.city ||
          components?.town ||
          components?.village ||
          components?.suburb;
        const state = components?.state;
        const address = res.data.results[0].formatted
        
        if (city) {
          dispatch(setCity(city));
          dispatch(setState(state));
          dispatch(setAddress(address))
        }
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    });
  }, [user, dispatch]);
};

export default useGetCurrentCity;

// https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}

// https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${API_KEY}