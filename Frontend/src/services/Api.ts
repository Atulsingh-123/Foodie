import axios from 'axios';
import { Dish } from '../../types/Dish';
import { Order } from '../../types/Order';

// Set the base URL for the API
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Get the list of dishes
export const getDishes = async (): Promise<Dish[]> => {
  const response = await api.get('/dishes');
  return response.data;
};

// Create a new order
export const createOrder = async (order: Order): Promise<void> => {
  await api.post('/orders', order);
};
