import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Left side: Logo and Name */}
          <Link to='/' className="flex items-center">
            <div className="text-green-500 text-2xl font-bold mr-2">🌿</div>
            <span className="text-xl font-semibold">ScholarPass</span>
          </Link>

          {/* Middle: Home, About, Features (hidden on small view) */}
          <div className="hidden md:flex space-x-4">
            <a href="#home" className="text-gray-600 hover:text-green-500">
              Home
            </a>
            <a href="#about" className="text-gray-600 hover:text-green-500">
              About
            </a>
            <a href="#features" className="text-gray-600 hover:text-green-500">
              Features
            </a>
          </div>

          {/* Right side: Login/Signup (hidden on small view) */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link className="text-gray-600 hover:text-emerald-950" to='/signin'>Login</Link>
            <Link className="bg-emerald-950 text-white px-4 py-1 rounded" to='/register'>
              Sign Up
            </Link>
          </div>

          {/* Hamburger menu button for small view */}
          <div className="md:hidden">
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
        className={`md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6 transform w-full pb-4 transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <a
          href="#home"
          className="text-xl text-gray-600 hover:text-green-500"
          onClick={toggleMenu}
        >
          Home
        </a>
        <a
          href="#about"
          className="text-xl text-gray-600 hover:text-green-500"
          onClick={toggleMenu}
        >
          About
        </a>
        <a
          href="#features"
          className="text-xl text-gray-600 hover:text-green-500"
          onClick={toggleMenu}
        >
          Features
        </a>
        <Link
          className="text-xl text-gray-600 hover:text-green-500"
          to="/signin"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-500 text-white px-6 py-2 rounded text-xl"
        >
          Sign Up
        </Link> 

      </div>
    </nav>
  );
};

export default Navbar;
