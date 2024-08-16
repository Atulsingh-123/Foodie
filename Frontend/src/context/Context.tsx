import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface CartItem {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  quantity: number;
}

type CartState = {
  cart: CartItem[];
};

type CartAction =
  | { type: 'ADD_TO_CART'; item: CartItem }
  | { type: 'REMOVE_FROM_CART'; id: string }
  | { type: 'UPDATE_QUANTITY'; id: string; quantity: number }
  | { type: 'CLEAR_CART' };

interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext<{ cart: CartItem[]; addToCart: (item: CartItem) => void; removeFromCart: (id: string) => void; updateQuantity: (id: string, quantity: number) => void; clearCart: () => void } | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.cart.findIndex((item) => item._id === action.item._id);
      if (existingItemIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      }
      return { ...state, cart: [...state.cart, { ...action.item, quantity: 1 }] };

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item._id !== action.id) };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map((item) => (item._id === action.id ? { ...item, quantity: action.quantity } : item)),
      };

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    default:
      return state;
  }
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  const addToCart = (item: CartItem) => dispatch({ type: 'ADD_TO_CART', item });
  const removeFromCart = (id: string) => dispatch({ type: 'REMOVE_FROM_CART', id });
  const updateQuantity = (id: string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart: state.cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
