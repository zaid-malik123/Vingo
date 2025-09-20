import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCurrentCity from "./hooks/useGetCurrentCity";
import CreateEditShop from "./pages/CreateEditShop";
import useGetMyShop from "./hooks/useGetMyShop";
import AddFoodItem from "./pages/AddFoodItem";
import EditItem from "./pages/EditItem";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemsByCity from "./hooks/useGetItemsByCity";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrder from "./pages/MyOrder";
import useGetMyOrders from "./hooks/useGetMyOrders";

export const serverUrl = "http://localhost:3000";

const App = () => {
  const { user } = useSelector((state) => state.userSlice);
  useGetCurrentUser();
  useGetCurrentCity();
  useGetShopByCity();
  useGetItemsByCity();
  useGetMyOrders()
  useGetMyShop();

  return (
    <div>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/forgot-password"
          element={!user ? <ForgotPassword /> : <Navigate to={"/"} />}
        ></Route>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/create-edit-shop"
          element={user ? <CreateEditShop /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/add-food"
          element={user ? <AddFoodItem /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/edit-item/:itemId"
          element={user ? <EditItem /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/checkout"
          element={user ? <Checkout /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/order-placed"
          element={user ? <OrderPlaced /> : <Navigate to={"/login"} />}
        ></Route>
        <Route
          path="/my-orders"
          element={user ? <MyOrder /> : <Navigate to={"/login"} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
