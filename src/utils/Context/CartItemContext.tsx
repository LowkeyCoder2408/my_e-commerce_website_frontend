import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getUserIdByToken,
  isToken,
  isTokenExpired,
} from '../Service/JwtService';
import CartItemModel from '../../models/CartItemModel';
import { fetchCartItemsByUserId } from '../../api/CartItemAPI';

interface CartItemsContextType {
  cartItems: CartItemModel[];
  fetchCartItems: () => void;
}

const CartItemsContext = createContext<CartItemsContextType | undefined>(
  undefined,
);

interface CartItemsProviderProps {
  children: React.ReactNode;
}

export const CartItemsProvider: React.FC<CartItemsProviderProps> = (props) => {
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const userId = getUserIdByToken();

  const fetchCartItemsHandler = async () => {
    if (isToken() && !isTokenExpired()) {
      const data = await fetchCartItemsByUserId();
      setCartItems(data);
    }
  };

  useEffect(() => {
    fetchCartItemsHandler();
  }, []);

  return (
    <CartItemsContext.Provider
      value={{ cartItems, fetchCartItems: fetchCartItemsHandler }}
    >
      {props.children}
    </CartItemsContext.Provider>
  );
};

export const useCartItems = () => {
  const context = useContext(CartItemsContext);
  if (context === undefined) {
    throw new Error(
      'useCartItems phải được dùng bên trong 1 CartItemsProvider',
    );
  }
  return context;
};
