import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"
import { setMyShopData } from "../redux/ownerSlice";

const useGetMyShop = () => {
const dispatch =  useDispatch()
const fetchShop = async ()=>{
try {
  const res = await axios.get(`${serverUrl}/api/shop/get-my`,{withCredentials:true})
  dispatch(setMyShopData(res.data))
} catch (error) {
  console.log(error)
}
}
useEffect(()=>{0;
  fetchShop()
},[]) 
};

export default useGetMyShop;
