import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { useState } from "react";

const Navbar = () => {

const navigate = useNavigate();
const [showMenu, setShowMenu] = useState(false)
const [token, setToken] = useState(true)

  return (
    <div className="flex items-center justify-between text-small py-4 mb-5 border-b border-b-gray-400">
      <img src={assets.logo} alt="" className="cursor-pointer w-44" onClick={() => navigate("/")} />
      <ul className=" hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 w-3/5 bg-primary m-auto hidden" />
        </NavLink>
      </ul>
      <div>
         {token ? (<div className="flex items-center gap-2 cursor-pointer group relative ">
          <img src={assets.profile_pic} alt="" className="w-5 rounded-full"/>
          <img src={assets.dropdown_icon} alt="" className="w-2.5"/>
          <div className="absolute top-0 right-0 pt-14  font-medium text-base  text-gray-600 z-20 hidden group-hover:block">
            <div className="min-w-48 bg-stone-100 flex flex-col  rounded p-4 gap-4">
            <p className="hover:text-black cursor-pointer" onClick={() => navigate("my-profile")}>My Profile</p>
            <p className="hover:text-black cursor-pointer" onClick={() => navigate("my-appointments")}>My Appointments</p>
            <p className="hover:text-black cursor-pointer" onClick={() => setToken(false)}>Logout</p>
            </div>
            </div>
        </div>) :  
        (<button className="bg-primary text-white px-6 py-2 rounded-full font-light hidden md:block cursor-pointer" 
        onClick={() => navigate("/login")}>Create account</button>)
        }
         </div> 
      </div>
  
  );
};

export default Navbar;
