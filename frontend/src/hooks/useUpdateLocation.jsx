import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App";

const useUpdateLocation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);

  useEffect(() => {
    const updateLocation = async (lat, lon)=>{
        const res = await axios.post(`${serverUrl}/api/user/update-location`,{lat,lon},{withCredentials:true})
        console.log(res.data)
    }
    
    navigator.geolocation.watchPosition((pos)=>{
        updateLocation(pos.coords.latitude, pos.coords.longitude)
    })

  }, [user]);
};

export default useUpdateLocation;
