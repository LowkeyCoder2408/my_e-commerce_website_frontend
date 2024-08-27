import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserIdByToken } from '../Service/JwtService';
import { toast } from 'react-toastify';
import CartItemModel from '../../models/CartItemModel';
import { getAllCartItemsByUserId } from '../../api/CartItemAPI';

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

  const fetchCartItems = async () => {
    try {
      if (userId) {
        const result = await getAllCartItemsByUserId(userId);
        setCartItems(result);
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi lấy dữ liệu các sản phẩm trong giỏ hàng');
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <CartItemsContext.Provider value={{ cartItems, fetchCartItems }}>
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
