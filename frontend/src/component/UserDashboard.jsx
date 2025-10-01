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
  const [updatedItemList, setUpdatedItemList] = useState([])

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";

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

  const handleFilterByCategory = (category)=>{
  if(category == "All"){
    setUpdatedItemList(itemsInMyCity)
  }
  else{
    const filteredList = itemsInMyCity.filter(i => i.category == category)
    setUpdatedItemList(filteredList)
  }
  }

  useEffect(()=>{
   setUpdatedItemList(itemsInMyCity)
  },[itemsInMyCity])

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

  const sectionTitleClass = "text-gray-800 text-2xl sm:text-3xl font-semibold mb-4";

  const scrollButtonClass =
    "absolute top-1/2 -translate-y-1/2 p-3 rounded-full shadow-lg z-10 text-white";

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center overflow-y-auto"
      style={{ backgroundColor: bgColor }}
    >
      <Nav />

      {/* Category Section */}
      <section className="w-full max-w-6xl flex flex-col gap-6 items-start p-4">
        <h1 className={sectionTitleClass}>Inspiration for your first order</h1>
        <div className="w-full relative">
          {showCateLeftButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "left")}
              className={scrollButtonClass}
              style={{ left: 8, backgroundColor: `${primaryColor}/90` }}
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
                <CategoryCard
                  onClick={()=> handleFilterByCategory(c.category)}
                  key={i}
                  image={c.image}
                  name={c.category}
                  style={{
                    borderRadius: "12px",
                    boxShadow: `0 4px 8px rgba(0,0,0,0.1)`,
                    transition: "transform 0.3s",
                  }}
                  hoverStyle={{ transform: "scale(1.05)" }}
                />
              ))
            )}
          </div>

          {showCateRightButton && (
            <button
              onClick={() => scrollHandler(cateScrollRef, "right")}
              className={scrollButtonClass}
              style={{ right: 8, backgroundColor: `${primaryColor}/90` }}
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </section>

      {/* Shop Section */}
      <section className="w-full max-w-6xl flex flex-col gap-6 items-start p-4">
        <h1 className={sectionTitleClass}>
          Best Shops in {currentCity || "your city"}
        </h1>

        <div className="w-full relative">
          {showShopLeftButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "left")}
              className={scrollButtonClass}
              style={{ left: 8, backgroundColor: `${primaryColor}/90` }}
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
                <CategoryCard
                  key={i}
                  image={c.image}
                  name={c.name}
                  style={{
                    borderRadius: "12px",
                    boxShadow: `0 4px 8px rgba(0,0,0,0.1)`,
                    transition: "transform 0.3s",
                  }}
                  hoverStyle={{ transform: "scale(1.05)" }}
                />
              ))
            )}
          </div>

          {showShopRightButton && (
            <button
              onClick={() => scrollHandler(shopScrollRef, "right")}
              className={scrollButtonClass}
              style={{ right: 8, backgroundColor: `${primaryColor}/90` }}
            >
              <FaCircleChevronRight />
            </button>
          )}
        </div>
      </section>

      {/* Food Section */}
      <section className="w-full max-w-6xl flex flex-col gap-6 items-start p-4">
        <h1 className={sectionTitleClass}>Suggested Food Items</h1>

        <div className="w-full h-auto flex flex-wrap gap-5 justify-center sm:justify-start">
          {!itemsInMyCity || itemsInMyCity.length === 0 ? (
            <Loader count={5} width="250px" height="260px" />
          ) : (
            updatedItemList.map((item, idx) => (
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
