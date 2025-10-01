import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAddress, setCity, setState } from "../redux/userSlice";
import { setLocation, setUserAddress } from "../redux/mapSlice";

const useGetCurrentCity = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by this browser.");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lon = position.coords.longitude;
          const lat = position.coords.latitude;
          const API_KEY = import.meta.env.VITE_GEOPIFY_API_KEY;
          dispatch(setLocation({lat: lat, lon: lon}))
          try {
            const res = await axios.get(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API_KEY}`
            );
            // console.log(res?.data?.results[0]?.address_line2)
            const place = res?.data?.features?.[0]?.properties;
            if (!place) {
              console.error("No location data found.");
              return;
            }

            // 🔹 City extraction with fallbacks
            const city =
              place?.city ||
              place?.town ||
              place?.village ||
              place?.county ||
              place?.state_district ||
              place?.suburb ||
              "Unknown";

            const state = place?.state || "Unknown";
            const address = place?.formatted || "Unknown Address";

            // 🔹 Dispatching to Redux
            dispatch(setCity(city));
            dispatch(setState(state));
            dispatch(setAddress(address));
            dispatch(setUserAddress(res?.data?.features[0]?.properties?.formatted))
          } catch (error) {
            console.error("Error fetching city:", error);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error.message);
        }
      );
    };

    getLocation();
  }, [dispatch]);
};

export default useGetCurrentCity;
