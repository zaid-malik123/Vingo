import Nav from "./Nav";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import Loader from "./Loader";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FoodCard from "./FoodCard";

const UserDashboard = () => {
  const { currentCity, shopsInMyCity, itemsInMyCity } = useSelector(
    (state) => state.userSlice
  );
  const cateScrollRef = useRef();
  const shopScrollRef = useRef();

  const [showCateLeftButton, setShowCateLeftButton] = useState(false);
  const [showCateRightButton, setShowCateRightButton] = useState(false);
  const [showShopLeftButton, setShowShopLeftButton] = useState(false);
  const [showShopRightButton, setShowShopRightButton] = useState(false);

  // Real loading based on data availability
  const isCategoryLoading = !categories || categories.length === 0;
  const isShopLoading =
    !currentCity || !shopsInMyCity || shopsInMyCity.length === 0;

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === "left" ? -250 : 250,
        behavior: "smooth",
      });
    }
  };

  const updateButton = (ref, setLeftButton, setRightButton) => {
    const element = ref.current;
    if (element) {
      setLeftButton(element.scrollLeft > 0);
      setRightButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth
      );
    }
  };

  // Scroll listeners
  useEffect(() => {
    if (!cateScrollRef.current) return;
    const handleScroll = () =>
      updateButton(
        cateScrollRef,
        setShowCateLeftButton,
        setShowCateRightButton
      );
    handleScroll();
    const element = cateScrollRef.current;
    element.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [categories]);

  useEffect(() => {
    if (!shopScrollRef.current) return;
    const handleScroll = () =>
      updateButton(
        shopScrollRef,
        setShowShopLeftButton,
        setShowShopRightButton
      );
    handleScroll();
    const element = shopScrollRef.current;
    element.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [currentCity, shopsInMyCity]);

  return (
    <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center overflow-y-auto">
      <Nav />

      {/* Category Section */}
      <section className="w-full max-w-6xl flex flex-col gap-6 items-start p-4">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Inspiration for your first order
        </h1>
        <div className="w-full relative">
          {showCateLeftButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "left")}
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-[#ff4d2d]/90 text-white p-3 rounded-full shadow-lg hover:bg-[#ff4d2d] z-10"
            >
              <FaCircleChevronLeft />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-3 scroll-smooth scrollbar-hide"
            ref={cateScrollRef}
          >
            {isCategoryLoading ? (
              <Loader count={6} width="180px" height="180px" />
            ) : (
              categories.map((c, i) => (
                <CategoryCard image={c.image} name={c.category} key={i} />
              ))
            )}
          </div>

          {showCateRightButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "right")}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ff4d2d]/90 text-white p-3 rounded-full shadow-lg hover:bg-[#ff4d2d] z-10"
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </section>

      {/* Shop Section */}
      <section className="w-full max-w-6xl flex flex-col gap-6 items-start p-4">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Best Shops in {currentCity || "your city"}
        </h1>

        <div className="w-full relative">
          {showShopLeftButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "left")}
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-[#ff4d2d]/90 text-white p-3 rounded-full shadow-lg hover:bg-[#ff4d2d] z-10"
            >
              <FaCircleChevronLeft />
            </button>
          )}

          <div
            className="w-full flex overflow-x-auto gap-4 pb-3 scroll-smooth scrollbar-hide"
            ref={shopScrollRef}
          >
            {isShopLoading ? (
              <Loader count={5} width="200px" height="200px" />
            ) : (
              shopsInMyCity?.map((c, i) => (
                <CategoryCard image={c.image} name={c.name} key={i} />
              ))
            )}
          </div>

          {showShopRightButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "right")}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#ff4d2d]/90 text-white p-3 rounded-full shadow-lg hover:bg-[#ff4d2d] z-10"
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </section>

      {/* Food Section */}
      <section className="w-full max-w-6xl flex flex-col gap-6 items-start p-4">
        <h1 className="text-gray-800 text-2xl sm:text-3xl">
          Suggested Food Items
        </h1>

        <div className="w-full h-auto flex flex-wrap gap-5 justify-center sm:justify-start">
          {!itemsInMyCity || itemsInMyCity.length === 0 ? (
            <Loader count={5} width="250px" height="260px" />
          ) : (
            itemsInMyCity.map((item, idx) => (
              <div
                key={idx}
                className="w-full max-w-[280px] sm:w-[250px] flex-shrink-0"
              >
                <FoodCard data={item} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
