import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../../store/user.store";
import Loading from "../Loading";
import logo from "../../assets/logo_bright.png";
import ProfileDropDown from "./ProfileDropdown";
import useAuth from "../../helper/useAuth";

const StudentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchUser, loading, error, logout } = useUserStore();
  const {user}= useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  if (loading) return <Loading />;

  return (
    <nav className="bg-black/95 text-white fixed top-0 left-0 w-full shadow-xl">
      <div className="mx-auto px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/student" className="flex items-center">
            <div className="rounded-full text-2xl font-bold mr-2">
              <img src={logo} alt="logo" className="w-8 h-8" />
            </div>
            <span className="text-lg text-green-600 font-semibold">ScholarPass</span>
          </Link>
          <div className="hidden md:flex space-x-4 items-center justify-center self-center object-center relative">
            <div className="hidden md:flex space-x-4 self-center items-center text-sm font-normal">
              <Link to="" className="text-white hover:text-green-500">Home</Link>
              <Link to="card" className="text-white hover:text-green-500">Card</Link>
              <Link to="vehicle" className="text-white hover:text-green-500">Vehicle</Link>
              <Link to="logs" className="text-white hover:text-green-500">Logs</Link>
            </div>
            <p className="text-gray-600 font-thin">┃</p>
            <ProfileDropDown logout={logout} image={user?.image} name={user?.name}/>
          </div>
          
          <div className="md:hidden items-center flex">
            <button onClick={toggleMenu} className="focus:outline-none">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (Full-screen overlay with animation) */}
      <div
        className={`md:hidden fixed inset-0 bg-black/95 text-white z-50 flex flex-col items-center justify-center space-y-6 transform w-full pb-4 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <Link to='/student' className="text-sm hover:text-green-500" onClick={toggleMenu}>Home</Link>
        <Link to='card' className="text-sm hover:text-green-500" onClick={toggleMenu}>Card</Link>
        <Link to='vehicle' className="text-sm hover:text-green-500" onClick={toggleMenu}>Vehicle</Link>
        <Link to='profile' className="text-sm hover:text-green-500" onClick={toggleMenu}>Profile</Link>
        <button onClick={logout} className="bg-red-500 w-2/3 text-center text-white px-6 py-1 rounded text-sm">Logout</button>
      </div>
    </nav>
  );
};

export default StudentNavbar;
