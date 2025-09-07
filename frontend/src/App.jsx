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

export const serverUrl = "http://localhost:3000";
const App = () => {
  useGetCurrentUser();
  useGetCurrentCity();
  const loadingShop = useGetMyShop();
    const { user } = useSelector((state) => state.userSlice);
  if (loadingShop) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }


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
      </Routes>
    </div>
  );
};

export default App;
