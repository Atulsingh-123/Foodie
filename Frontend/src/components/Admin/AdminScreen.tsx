import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  tableNumber: number;
  items: OrderItem[];
  total: number;
  timestamp: string; // Add timestamp property
}

const AdminScreen: React.FC = () => {
  const [notifications, setNotifications] = useState<OrderDetails[]>([]);

  useEffect(() => {
    const socket = io('http://localhost:5001');

    socket.on('orderNotification', (orderDetails: OrderDetails) => {
      if (orderDetails && orderDetails.tableNumber && orderDetails.items && orderDetails.total) {
        setNotifications((prevNotifications) => [...prevNotifications, orderDetails]);
      } else {
        console.error('Received invalid order details:', orderDetails);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const formatTimestamp = (timestamp: string | number) => {
    let date;
    
    if (typeof timestamp === 'string') {
      date = new Date(timestamp);
    } else if (typeof timestamp === 'number') {
      date = new Date(timestamp); // Ensure this is in milliseconds, not seconds
    } else {
      return 'Invalid Date';
    }
    
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Admin Notifications</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-600 text-center">No new orders.</p>
      ) : (
        <ul>
          {notifications.map((order, index) => (
            <li key={index} className="mb-4 p-4 border rounded-lg shadow-lg bg-white">
              <h3 className="text-xl font-bold mb-2 text-center">Order from Table {order.tableNumber}</h3>
              <p className="text-gray-600 text-center mb-4">Order Time: {formatTimestamp(order.timestamp)}</p>
              <ul className="mb-4">
                {order.items.map((item, idx) => (
                  <li key={idx} className="flex justify-between text-gray-800 mb-2">
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x Rs. {item.price.toFixed(2)}
                    </span>
                    <span className="font-bold">
                      Rs. {(item.quantity * item.price).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="text-right border-t pt-2">
                <span className="font-bold text-lg">Total: Rs. {order.total.toFixed(2)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminScreen;