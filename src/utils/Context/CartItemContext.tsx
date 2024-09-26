import React, { createContext, useContext, useEffect, useState } from 'react';
import { isToken, isTokenExpired } from '../Service/JwtService';
import CartItemModel from '../../models/CartItemModel';
import { fetchCartItemsByUserId } from '../../api/CartItemAPI';

interface CartItemsContextType {
  cartItems: CartItemModel[];
  fetchCartItems: () => void;
  isLoading: boolean;
}

const CartItemsContext = createContext<CartItemsContextType | undefined>(
  undefined,
);

interface CartItemsProviderProps {
  children: React.ReactNode;
}

export const CartItemsProvider: React.FC<CartItemsProviderProps> = (props) => {
  const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCartItemsHandler = async () => {
    setIsLoading(true);
    if (isToken() && !isTokenExpired()) {
      const data = await fetchCartItemsByUserId();
      setCartItems(data);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCartItemsHandler();
  }, []);

  return (
    <CartItemsContext.Provider
      value={{ cartItems, fetchCartItems: fetchCartItemsHandler, isLoading }}
    >
      {props.children}
    </CartItemsContext.Provider>
  );
};

export const useCartItems = () => {
  const context = useContext(CartItemsContext);
  if (context === undefined) {
    throw new Error('useCartItems must be used within a CartItemsProvider');
  }
  return context;
};
