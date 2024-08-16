import React, { useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderDetails: {
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    total: number;
  };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, orderDetails }) => {
    const navigate = useNavigate()
//   if (!isOpen) return null;
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
        navigate('/dishlist')
      }, 5000); // Closes the modal after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer when the modal is closed
    }
  }, [isOpen, onClose]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 md:mx-0 flex flex-col items-center">
        <div className="bg-green-500 text-white p-1 rounded-full mb-4">
          <FaCheckCircle size={48} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Order Confirmed</h2>
        <p className="text-gray-600 mb-6 text-center">Thank you for your order! Your order has been successfully placed.</p>
        <div className="mb-4 w-full">
          <h3 className="text-lg font-semibold ">Order Details:</h3>
          <ul className="list-disc pl-5 mt-2">
            {orderDetails.items.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item.name} - {item.price} - {item.quantity} x Rs. {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="text-gray-800 font-bold mt-2 ">Total: Rs. {orderDetails.total.toFixed(2)}</p>
        </div>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
