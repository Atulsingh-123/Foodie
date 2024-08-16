import React, { useState } from 'react';

interface Order {
  dishName: string;
  quantity: number;
  tableNumber: number;
  status: string;
}

// Dummy array to store orders with initial data
const orders: Order[] = [
  { dishName: 'Pizza', quantity: 2, tableNumber: 1, status: 'Pending' },
  { dishName: 'Pasta', quantity: 1, tableNumber: 2, status: 'Pending' },
  { dishName: 'Salad', quantity: 3, tableNumber: 3, status: 'Pending' }
];

const OrderForm: React.FC = () => {
  const [dishName, setDishName] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [tableNumber, setTableNumber] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const order: Order = { dishName, quantity, tableNumber, status: 'Pending' };
    
    // Add the new order to the dummy array
    orders.push(order);
    console.log('Order placed:', order);
    console.log('All orders:', orders);

    alert('Order placed successfully!');
    
    // Reset form fields
    setDishName('');
    setQuantity(1);
    setTableNumber(1);
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Place an Order</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Dish Name</label>
        <input
          type="text"
          value={dishName}
          onChange={(e) => setDishName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Table Number</label>
        <input
          type="number"
          value={tableNumber}
          onChange={(e) => setTableNumber(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg"
          required
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">Place Order</button>
    </form>
  );
};

export default OrderForm;
