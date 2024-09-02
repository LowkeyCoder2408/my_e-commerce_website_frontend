import React, { createContext, useContext, useEffect, useState } from 'react';
import FavoriteProductModel from '../../models/FavoriteProductModel';
import { fetchFavoriteProductsByUserId } from '../../api/FavoriteProductAPI';
import { isToken, isTokenExpired } from '../Service/JwtService';

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

  const fetchFavoriteProductsHandler = async () => {
    if (isToken() && !isTokenExpired()) {
      const data = await fetchFavoriteProductsByUserId();
      setFavoriteProducts(data);
    }
  };

  useEffect(() => {
    fetchFavoriteProductsHandler();
  }, []);

  return (
    <FavoriteProductsContext.Provider
      value={{
        favoriteProducts,
        fetchFavoriteProducts: fetchFavoriteProductsHandler,
      }}
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
