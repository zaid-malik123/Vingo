import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux"
import { setUserData } from "../redux/userSlice"

const useGetCurrentUser = () => {
const dispatch =  useDispatch()
const fetchCurrentUser = async ()=>{
try {
  const res = await axios.get(`${serverUrl}/api/user/curr-user`,{withCredentials:true})
  dispatch(setUserData(res.data.user)) 
} catch (error) {
  console.log(error)
}
}
useEffect(()=>{
  fetchCurrentUser()
},[]) 
};

export default useGetCurrentUser;
