import React, { useEffect, useState } from 'react';
import { useCart } from '../context/Context';
import axios from 'axios';
import { io } from 'socket.io-client';
import Navbar from './Navbar';
import Modal from '../common/modal';
import PaymentForm from '../pages/PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';

const stripePromise = loadStripe('your-publishable-key-here');

const Cart: React.FC = () => {
  const socket = io('http://localhost:5001');
  const { cart, removeFromCart, clearCart, updateQuantity } = useCart();
  const [notification, setNotification] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState<{
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  }>({ items: [], total: 0 });
  const token = localStorage.getItem('token');

  // Calculate total price
  const total = cart.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);

  // Handle order confirmation
  const handleOrderConfirmation = () => {
    // Only set the order details and open the payment modal
    setOrderDetails({
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price,
      })),
      total,
    });
    setIsPaymentOpen(true); // Open the payment form modal
  };

  // Handle payment success
  const handlePaymentSuccess = async () => {
    try {
      const tableNumber = 2; // Example table number
      const orderDetails = {
        tableNumber,
        items: cart, // assuming cart is an array of items
        total,
      };
  
      const response = await axios.post('http://localhost:5000/api/orders/confirm', orderDetails, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      setIsModalOpen(true); // Open the success modal
      clearCart(); // Clear the cart after confirmation
  
      // Emitting order details with tableNumber included
      if (orderDetails && orderDetails.tableNumber && Array.isArray(orderDetails.items) && typeof orderDetails.total === 'number') {
        socket.emit('orderConfirmation', orderDetails);
        socket.emit('orderConfirmation', response);
        toast.success("Your order is confirmed, please wait for a few minutes");
      } else {
        console.error('Invalid order details:', orderDetails);
      }
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };
  

  const handleQuantityChange = (id: string, quantity: number) => {
    updateQuantity(id, quantity);
  };


  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 sm:p-6">
        {notification && (
          <div className="fixed top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
            {notification}
          </div>
        )}
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Wishlist Items</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600 text-center mt-6 sm:mt-10">Your wishlist is empty.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-4 sm:mb-6">
              {cart.map((item) => (
                <div key={item._id} className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg mr-4"
                    />
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold">{item.name}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                      <p className="text-gray-800 font-bold">Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleQuantityChange(item._id, (item.quantity || 1) - 1)}
                          className="bg-blue-500 text-white px-2 py-1 rounded-l disabled:bg-gray-400"
                          disabled={(item.quantity || 1) <= 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={item.quantity || 1}
                          readOnly
                          className="w-10 sm:w-12 text-center border-t border-b"
                        />
                        <button
                          onClick={() => handleQuantityChange(item._id, (item.quantity || 1) + 1)}
                          className="bg-blue-500 text-white px-2 py-1 rounded-r"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="bg-red-600 text-white px-2 sm:px-3 py-1 rounded-lg hover:bg-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="bg-white border border-gray-300 p-4 sm:p-6 rounded-lg flex justify-between items-center">
              <h3 className="text-lg sm:text-xl font-bold">Total</h3>
              <p className="text-xl sm:text-2xl font-bold">Rs. {total.toFixed(2)}</p>
            </div>
            <div className="mt-4 sm:mt-6 flex justify-center">
              <button
                onClick={handleOrderConfirmation}
                className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-base sm:text-lg hover:bg-blue-700 transition"
              >
                Confirm Order
              </button>
            </div>
          </>
        )}

        {/* Payment Form Modal */}
        <Elements stripe={stripePromise}>
          {isPaymentOpen && (
            <PaymentForm onPaymentSuccess={handlePaymentSuccess} totalAmount={total} />
          )}
        </Elements>

        {/* Modal Component */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          orderDetails={orderDetails}
        />
      </div>
    </>
  );
};

export default Cart;
