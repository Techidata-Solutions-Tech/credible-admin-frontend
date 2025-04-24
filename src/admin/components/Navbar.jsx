import React from "react";
import { Link } from "react-router-dom";
import { AdminDataContext } from "../../context/AdminContext";
import { RiNotification3Line, RiMessage2Line, RiSettings3Line, RiSearchLine } from "react-icons/ri";

const Navbar = () => {
  const { admin } = React.useContext(AdminDataContext);
  const [showSearch, setShowSearch] = React.useState(false);
const handleLogout = ()=>{
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userId');
  window.location.href = '/';
}
  return (
    <div className="flex items-center justify-between bg-white px-4 md:px-6 py-2 shadow">
      {/* Left side - Space reserved for menu icon */}
      <div className="w-12 md:w-16 flex items-center">
        {/* This empty div ensures space is reserved for the menu icon */}
      </div>

      {/* Center section with search */}
      <div className="flex-1 max-w-xl px-4">
        {/* <div className="relative w-full">
          <input
            type="text"
            placeholder="Search here..."
            className="w-full rounded-lg border px-4 py-2 pr-10 bg-gray-100 focus:outline-none"
          />
          <RiSearchLine className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg cursor-pointer" />
        </div> */}
      </div>

      {/* Right Side - Icons & Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Notifications */}
        {/* <div className="flex gap-1 md:gap-2">
          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <RiNotification3Line className="text-lg md:text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">1</span>
          </button>
          <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200">
            <RiMessage2Line className="text-lg md:text-xl" />
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 rounded-full">1</span>
          </button>
        </div>
        {/* Settings Icon */}
        {/*<button className="hidden md:block p-2 rounded-full bg-gray-100 hover:bg-gray-200">
          <RiSettings3Line className="text-xl" />
        </button> */}
        {/* Profile Section */}
        <div className="flex items-center gap-2 md:gap-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            alt="Admin"
            className="rounded-full w-8 h-8 md:w-10 md:h-10"
          />
          <div className="hidden md:block text-sm">
            <p className="font-semibold text-black">{admin?.name || "Credible Admin"}</p>
            <p className="text-gray-500">Admin</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Logout
        </button>

      </div>
    </div>
  );
};

export default Navbar;