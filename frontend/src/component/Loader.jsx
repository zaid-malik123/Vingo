import React from "react";

const Loader = ({ count = 6, width = "180px", height = "180px" }) => {
  return (
    <div className="w-full flex gap-4 overflow-x-auto pb-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 rounded-2xl bg-gray-200 overflow-hidden animate-pulse"
          style={{ width, height }}
        >
          {/* Image placeholder */}
          <div className="w-full h-[70%] bg-gray-300" />

          {/* Text placeholders */}
          <div className="p-2 flex flex-col gap-2">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
