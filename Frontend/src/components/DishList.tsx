import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";
import Sidebar from './Sidebar';
import { useCart } from '../context/Context';
import Popup from './Popup';
import Navbar from './Navbar';
import { toast } from 'react-toastify';

interface DishItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl?: string;
  category: string;
}

const DishList: React.FC = () => {
  const [dishes, setDishes] = useState<DishItem[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { addToCart } = useCart();
  const token = localStorage.getItem('token')

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/food-dishes/getdata",{
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setDishes(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddToCart = (dish: DishItem) => {
    toast.info(`${dish.name} has been added to wishlist`)
    // setPopupMessage(`${dish.name} has been added to the cart!`);
    addToCart({ ...dish, imageUrl: dish.imageUrl || 'https://picsum.photos/200/300', quantity: 1 });
  };

  const filteredDishes = selectedCategory === 'All'
    ? dishes
    : dishes.filter(dish => dish.category === selectedCategory);

  const categories = ['All', ...new Set(dishes.map(dish => dish.category))];

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="w-full md:w-3/4 ml-auto md:ml-4 mt-4 md:mt-0">
        <h2 className="text-2xl font-bold mb-4">Food Dishes</h2>
        <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {filteredDishes.map((dish) => (
            <div key={dish._id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={dish.imageUrl} alt={dish.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              <h3 className="text-xl font-bold">{dish.name}</h3>
              <p className="text-gray-600">{dish.description}</p>
              <p className="text-gray-800 font-bold">Rs.{dish.price.toFixed(2)}</p>
              <button
                onClick={() => handleAddToCart(dish)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-2 flex items-center space-x-2"
              >
                <span>Add to Wishlist</span>
                <FaHeart size={24} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
};

export default DishList;
