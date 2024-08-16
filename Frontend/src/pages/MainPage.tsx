import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaShoppingCart } from 'react-icons/fa';
import { MdClose, MdMenu, MdRestaurantMenu } from 'react-icons/md';
import Footer from './Footer';

const MainPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 fixed w-full top-0 left-0 z-10 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        Foodie's Delight
      </div>

      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
      </button>

      {/* Menu Items */}
      <div className={`md:flex items-center space-x-4 ${isOpen ? 'block' : 'hidden'} md:space-x-6 md:mt-0 mt-4`}>
        <Link to="/login" className="flex-shrink-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out">
            <FaUtensils className="inline-block mr-1" />
            Login
          </button>
        </Link>
        <Link to="/register" className="flex-shrink-0">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out">
            <MdRestaurantMenu className="inline-block mr-1" />
            Register
          </button>
        </Link>
      </div>
    </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center mt-20 px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center text-center mb-12 space-y-4 md:space-y-0 md:space-x-8">
          <img
            src="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Delicious Food"
            className="w-full max-w-lg rounded-lg shadow-lg"
          />
          <div className="md:ml-8">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">Welcome to Foodie's Delight</h1>
            <p className="text-base md:text-lg text-gray-600 mb-8">Your favorite meals delivered to your table. Explore our menu and place your order today!</p>
          </div>
        </div>

        <div className="flex flex-col bg-gray-200 items-center p-6 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
          <p className="text-base md:text-lg text-gray-600 mb-8 text-center px-4">
          Our Food Ordering System is a comprehensive software solution designed to streamline the process of ordering food at restaurants. This system is specifically tailored for restaurants that offer table service, enhancing the dining experience for customers who can order without ant waiters.        </p>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
            <div className="flex flex-col items-center text-center">
              <FaShoppingCart size={48} className="text-blue-600 mb-2" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Easy Ordering</h3>
              <p className="text-gray-600">Order your favorite dishes with ease using our intuitive interface.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <MdRestaurantMenu size={48} className="text-green-600 mb-2" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Diverse Menu</h3>
              <p className="text-gray-600">Explore a variety of dishes and find something you'll love.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaUtensils size={48} className="text-yellow-600 mb-2" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">Quality Ingredients</h3>
              <p className="text-gray-600">We use only the freshest ingredients to ensure top quality meals.</p>
            </div>
          </div>
        </div>
       
      </div>
      <Footer/>
    </div>
  );
};

export default MainPage;
