import React from 'react';

const CategoryCard = ({ name, image }) => {
  return (
    <div className="relative w-[120px] h-[120px] md:w-[180px] md:h-[180px] rounded-2xl border-2 border-[#ff4d2d] shrink-0 overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
      <img
        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
        src={image}

      />
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white/95 via-white/80 to-transparent px-3 py-2 text-center">
        <p className="text-sm md:text-base font-semibold text-gray-800 truncate">
          {name}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;
