import React, { createContext, useContext, useEffect, useState } from 'react';
import { getUserIdByToken, isToken } from '../Service/JwtService';
import FavoriteProductModel from '../../models/FavoriteProductModel';
import { getAllFavoriteProductsByUserId } from '../../api/FavoriteProductAPI';
import { toast } from 'react-toastify';

interface FavoriteProductsContextType {
  favoriteProducts: FavoriteProductModel[];
  fetchFavoriteProducts: () => void;
}

const FavoriteProductsContext = createContext<
  FavoriteProductsContextType | undefined
>(undefined);

interface FavoriteProductsProviderProps {
  children: React.ReactNode;
}

export const FavoriteProductsProvider: React.FC<
  FavoriteProductsProviderProps
> = (props) => {
  const [favoriteProducts, setFavoriteProducts] = useState<
    FavoriteProductModel[]
  >([]);
  const userId = getUserIdByToken();

  const fetchFavoriteProducts = async () => {
    try {
      if (userId) {
        const result = await getAllFavoriteProductsByUserId(userId);
        setFavoriteProducts(result);
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi lấy dữ liệu các sản phẩm yêu thích');
    }
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  return (
    <FavoriteProductsContext.Provider
      value={{ favoriteProducts, fetchFavoriteProducts }}
    >
      {props.children}
    </FavoriteProductsContext.Provider>
  );
};

export const useFavoriteProducts = () => {
  const context = useContext(FavoriteProductsContext);
  if (context === undefined) {
    throw new Error(
      'useFavoriteProducts phải được dùng bên trong 1 FavoriteProductsProvider',
    );
  }
  return context;
};
