import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/Context';
import { FaHeart, FaUser } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { CiCirclePlus } from "react-icons/ci";
import AddFoodModal from '../common/AddFoodModal';

const Navbar: React.FC = () => {
  const { cart } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  const [addFoodOpen, setAddFoodOpen] = useState(false);
  const username = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };


  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-4 fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dishlist" className="text-white text-2xl font-bold tracking-wide">
          Food Ordering System
        </Link>
        <div className="space-x-6 flex items-center ">
          <Link to="/cart" className="text-white relative flex items-center gap-2">
          <span className='text-white'> Wishlist</span>
            <FaHeart size={24} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white text-lg flex items-center space-x-2 hover:text-black"
            >
              <span>{username}</span>
              <FaUser size={24} />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg overflow-hidden">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 text-black hover:bg-gray-200"
                  onClick={() => setDropdownOpen(false)}
                >
                  <CgProfile className="mr-2" />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setAddFoodOpen(true);
                  }}
                  className="flex items-center w-full px-4 py-2 text-black hover:bg-gray-200 text-left"
                >
                  <CiCirclePlus className="mr-2" />
                  Add Foods
                </button>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    setLogoutConfirmOpen(true);
                  }}
                  className="flex items-center w-full px-4 py-2 text-black hover:bg-gray-200 text-left"
                >
                  <IoIosLogOut className="mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {logoutConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[27rem] flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setLogoutConfirmOpen(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                No
              </button>
              <button
                onClick={handleLogout}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Food Modal */}
      <AddFoodModal
        isOpen={addFoodOpen}
        onClose={() => setAddFoodOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
