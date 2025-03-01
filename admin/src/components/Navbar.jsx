import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {assets} from "../assets/assets";
import { AdminContext } from "../context/AdminContext";

const Navbar = () => {
  const {aToken, setAToken} = useContext(AdminContext)
  const navigate = useNavigate();
  const logout = () => { 
    navigate('/')
    aToken && localStorage.removeItem('aToken')
    aToken && setAToken('')
  }

  return (
  <div className="flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white">
    <div className="flex items-center gap-2 text-xs">
      <img src={assets.admin_logo} className="w-36 sm:w-40 cursor-pointer" alt="" />
      <p className = 'border border-gray-500 text-gray-600 px-2.5 py-0.5 rounded-full'>{aToken ? "Admin ": "Doctor"}</p>
    </div>
    <button onClick= {logout} className="bg-primary text-white text-sm px-10 py-2 rounded-full">Logout</button>
  </div>
)
};

export default Navbar;
