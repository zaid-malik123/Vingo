import Nav from './Nav'
import { categories } from '../category'
import CategoryCard from './CategoryCard'
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
const UserDashboard = () => {
  return (
    <div className='w-full min-h-screen bg-[#fff9f6] flex flex-col items-center overflow-y-auto'>
      <Nav/>
      <div className='w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]'>
       <h1 className='text-gray-800 text-2xl sm:text-3xl'>Inspiration for your first order</h1>
       <div className='w-full relative'>
        <button className='absolute left-0 top-1/2 -transform-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#ff4d2d] z-10'>
          <FaCircleChevronLeft />
        </button>
      
        <div className='w-full flex overflow-x-auto gap-4 pb-2 '>
           {categories.map((c,i)=>(
          <CategoryCard c={c} key={i}/>
         ))}
           <button  className='absolute right-0 top-1/2 -transform-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#ff4d2d] z-10'>
          <FaCircleChevronRight />
        </button>
        </div>
       </div>
      </div>
    </div>
  )
}

export default UserDashboard
