import { useEffect, useState } from 'react';
import FavoriteProductModel from '../../../models/FavoriteProductModel';
import ProductCard from '../ProductCard/ProductCard';
import ProductModel from '../../../models/ProductModel';
import { getProductById } from '../../../api/ProductAPI';

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
