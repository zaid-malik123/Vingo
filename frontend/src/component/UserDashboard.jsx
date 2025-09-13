import Nav from "./Nav";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaCircleChevronLeft } from "react-icons/fa6";
import { FaCircleChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
const UserDashboard = () => {
  const cateScrollRef = useRef();
  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
  const [showCateRightButton, setShowCateRightButton] = useState(false);
  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction == "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(element.scrollLeft+ element.clientWidth < element.scrollWidth)
    }
  };
  useEffect(() => {
    if (cateScrollRef.current) {
      cateScrollRef.current.addEventListener("scroll", () => {
        updateButton(
          cateScrollRef,
          setShowCateLeftButton,
          setShowCateRightButton
        );
      });
    }
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center overflow-y-auto">
      <Nav />
      <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-[10px]">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Inspiration for your first order
        </h1>
        <div className="w-full relative">
          {showCateLeftButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "left")}
              className="absolute left-0 top-1/2 -transform-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#ff4d2d] z-10"
            >
              <FaCircleChevronLeft />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-2 "
            ref={cateScrollRef}
          >
            {categories.map((c, i) => (
              <CategoryCard c={c} key={i} />
            ))}
            {showCateRightButton && (
              <button
                onClick={() => scrollHandler(cateScrollRef, "right")}
                className="absolute right-0 top-1/2 -transform-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#ff4d2d] z-10"
              >
                <FaCircleChevronRight />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
