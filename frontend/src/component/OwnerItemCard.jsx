import { FaPen } from "react-icons/fa";
import { ImBin2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
const OwnerItemCard = ({item}) => {
  const navigate = useNavigate()  
  return (
    <div className='flex bg-white rounded-lg shadow-md overflow-hidden border border-[#ff4d2d] w-full max-w-2xl'>
      <div className='w-36 h-full flex-shrink-0 bg-gray-50'>
        <img className='w-full h-full object-cover' src={item.image} alt="" />
      </div>
      <div className='flex flex-col justify-between p-3 flex-1'>
        <div>
            <h2 className='text-base font-semibold text-[#ff4d2d]'>{item.name}</h2>
            <p><span className='font-medium text-gray-70'>Category:</span> {item.category}</p>
            <p><span className='font-medium text-gray-70'>Food Type: </span>{item.foodType}</p>
        </div>
        <div className="flex items-center justify-between">
            <div className="font-bold text-[#ff4d2d]">{item.price}</div>
            <div className="flex items-center gap-2">
                <div onClick={()=> navigate("/edit-item")} className="p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] flex items-center gap-2 cursor-pointer"> <FaPen size={20} /></div>
                <div className="p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] flex items-center gap-2 cursor-pointer"><ImBin2 size={20} /></div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OwnerItemCard
