import { useEffect, useState } from 'react';
import FavoriteProductModel from '../../../models/FavoriteProductModel';
import { getUserIdByToken } from '../../../utils/Service/JwtService';
import ProductCard from '../ProductCard/ProductCard';
import ProductModel from '../../../models/ProductModel';
import { getProductById } from '../../../api/ProductAPI';
import { useFavoriteProducts } from '../../../utils/Context/FavoriteProductContext';

interface FavoriteProductCardProps {
  favoriteProduct: FavoriteProductModel;
}

function FavoriteProductCard(props: FavoriteProductCardProps) {
  const [product, setProduct] = useState<ProductModel | null>(null);

  useEffect(() => {
    getProductById(props.favoriteProduct.productId)
      .then((result) => {
        setProduct(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>{product && <ProductCard product={product} isShowQuickLink={false} />}</>
  );
}

export default FavoriteProductCard;
