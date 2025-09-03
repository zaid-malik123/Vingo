import axios from "axios";
import { useEffect } from "react";
import { serverUrl } from "../App";

const useGetCurrentUser = () => {
const fetchCurrentUser = async ()=>{
try {
  const res = await axios.get(`${serverUrl}/api/user/curr-user`,{withCredentials:true})
  console.log(res.data)
} catch (error) {
  console.log(error)
}
}
useEffect(()=>{
  fetchCurrentUser()
},[]) 
};

export default useGetCurrentUser;
