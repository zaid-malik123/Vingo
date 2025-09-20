import React from 'react'
import { useSelector } from 'react-redux'
import { userSlice } from '../redux/userSlice'
import UserOrderCard from '../component/UserOrderCard';
import OwnerOrderCard from '../component/OwnerOrderCard';

const MyOrder = () => {
   const { user, myOrders } = useSelector((state) => state.userSlice); 
  return (
    <div>
     {user.role === "user" && (
        <UserOrderCard/>
     )}
     {user.role === "owner" && (
        <OwnerOrderCard/>
     )}
    </div>
  )
}

export default MyOrder
