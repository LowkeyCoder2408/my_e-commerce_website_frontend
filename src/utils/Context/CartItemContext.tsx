// import React, { createContext, useContext, useEffect, useState } from 'react';
// import CartItemModel from '../../model/CartItemModel';

// interface CartItemProps {
//   children: React.ReactNode;
// }

// interface CartItemType {
//   cartItems: CartItemModel[];
//   setCartItems: any;
//   totalCartItems: number;
//   setTotalCartItems: any;
// }

// const CartItem = createContext<CartItemType | undefined>(undefined);

// export const CartItemProvider: React.FC<CartItemProps> = (props) => {
//   const [cartItems, setCartItems] = useState<CartItemModel[]>([]);
//   const [totalCartItems, setTotalCartItems] = useState(0);

//   useEffect(() => {
//     const cartData: string | null = localStorage.getItem('cart');
//     let cart: CartItemModel[] = [];
//     cart = cartData ? JSON.parse(cartData) : [];
//     setCartItems(cart);
//     setTotalCartItems(cart.length);
//   }, []);

//   return (
//     <CartItem.Provider
//       value={{ cartItems, setCartItems, totalCartItems, setTotalCartItems }}
//     >
//       {props.children}
//     </CartItem.Provider>
//   );
// };

// export const useCartItem = (): CartItemType => {
//   const context = useContext(CartItem);
//   if (!context) {
//     throw new Error('Lỗi context');
//   }
//   return context;
// };
import React from 'react';

const CartItemContext = () => {
  return <div>CartItemContext</div>;
};

export default CartItemContext;
