import {Routes, Route} from "react-router-dom"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword"
import useGetCurrentUser from "./hooks/useGetCurrentUser"
import { useSelector } from "react-redux"


export const serverUrl = "http://localhost:3000"
const App = () => {
  useGetCurrentUser()
  const {user} = useSelector((state)=> state.userSlice)
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
      </Routes>
    </div>
  )
}

export default App
