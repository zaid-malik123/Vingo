import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage"; // 👈 new page
import CreateEditShop from "./pages/CreateEditShop";
import AddFoodItem from "./pages/AddFoodItem";
import EditItem from "./pages/EditItem";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrder from "./pages/MyOrder";
import TrackOrderPage from "./pages/TrackOrderPage";
import { useSelector } from "react-redux";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import useGetCurrentCity from "./hooks/useGetCurrentCity";
import useGetMyShop from "./hooks/useGetMyShop";
import useGetMyOrders from "./hooks/useGetMyOrders";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemsByCity from "./hooks/useGetItemsByCity";
import useUpdateLocation from "./hooks/useUpdateLocation";
import Shop from "./pages/Shop"

export const serverUrl = "http://localhost:3000";

const App = () => {
  const { user } = useSelector((state) => state.userSlice);
  useGetCurrentUser();
  useGetCurrentCity();
  useGetShopByCity();
  useGetItemsByCity();
  useGetMyOrders();
  useGetMyShop();
  useUpdateLocation();

  return (
    <div>
      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={!user ? <LandingPage /> : <Navigate to={"/home"} />}
        />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/home"} />}
        />
        <Route
          path="/forgot-password"
          element={!user ? <ForgotPassword /> : <Navigate to={"/home"} />}
        />

        {/* Home (after login) */}
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to={"/login"} />}
        />

        {/* Shop Routes */}
        <Route
          path="/create-edit-shop"
          element={user ? <CreateEditShop /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/add-food"
          element={user ? <AddFoodItem /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/edit-item/:itemId"
          element={user ? <EditItem /> : <Navigate to={"/login"} />}
        />

        {/* Cart & Orders */}
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/checkout"
          element={user ? <Checkout /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/order-placed"
          element={user ? <OrderPlaced /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/my-orders"
          element={user ? <MyOrder /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/track-order/:orderId"
          element={user ? <TrackOrderPage /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/shop/:id"
          element={user ? <Shop /> : <Navigate to={"/login"} />}
        />

      </Routes>
    </div>
  );
};

export default App;
