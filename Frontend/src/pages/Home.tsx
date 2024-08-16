import React from 'react';
import DishList from '../components/DishList';
import OrderForm from '../components/OrderForm';

const Home: React.FC = () => {
  return (
    <div>
      <DishList />
      <OrderForm />

    </div>
  );
};

export default Home;
