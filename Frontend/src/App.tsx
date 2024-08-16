import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DishList from './components/DishList';
import OrderForm from './components/OrderForm';
import Cart from './components/Cart';
import { CartProvider } from './context/Context';
import { WebSocketProvider } from './context/WebsocketContext';
import AdminDashboard from './pages/AdminDashboard';
import AdminScreen from './components/Admin/AdminScreen';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext';
import MainPage from './pages/MainPage';
import Register from './components/Register';
import PaymentForm from './pages/PaymentForm';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <WebSocketProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path='/' element={<MainPage/>}/>
              <Route path="/dishlist" element={<DishList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/order" element={<OrderForm />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin-screen" element={<AdminScreen />} />
              <Route path="/payment" element={< PaymentForm />} />
            </Routes>
          </Router>
        </CartProvider>
      </WebSocketProvider>
    </AuthProvider>
  );
};

export default App;
