import { useSelector } from 'react-redux';
import Nav from './Nav'
import axios from 'axios';
import { serverUrl } from '../App';
import { useEffect } from 'react';

const DeliveryBoy = () => {
  const { user } = useSelector((state) => state.userSlice);

  const handleGetAssignment = async ()=>{
  try {
    const res = await axios.get(`${serverUrl}/api/order/get-assignments`,{withCredentials:true})
    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
  }
  
  useEffect(()=>{
    handleGetAssignment()
  },[user])
  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center overflow-y-auto">
      <Nav/>
      <div className='w-full max-w-[800px] flex flex-col gap-5 items-center'>
         <div className='bg-white rounded-2xl shadow-md p-5 flex flex-col justify-start text-center items-center w-[90%] border border-orange-100 gap-2'>
           <h1 className='text-xl font-bold text-[#ff4d2d]'>Welcome,  {user.fullName}</h1>
           <p className='text-[#ff4d2d]'><span className='font-semibold'>Latitude :</span> {user.location.coordinates[1]} , <span className='font-semibold'>Longitude :</span> {user.location.coordinates[0]}</p>
         </div>
      </div>
    </div>
  )
}

export default DeliveryBoy
