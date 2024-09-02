import { useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteProductCard from './FavoriteProductCard';
import Loader from '../../../utils/Loader';
import { useFavoriteProducts } from '../../../utils/Context/FavoriteProductContext';

function FavoriteProductList() {
  const { favoriteProducts } = useFavoriteProducts();

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      {favoriteProducts.length > 0 ? (
        <>
          <div className="default-title">SẢN PHẨM YÊU THÍCH CỦA BẠN</div>
          <div className="row mt-5">
            {favoriteProducts.map((favoriteProduct, index) => (
              <div
                key={index}
                className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 col-6"
              >
                <FavoriteProductCard
                  key={index}
                  favoriteProduct={favoriteProduct}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="d-flex align-items-center justify-content-center flex-column p-5">
            <img
              className="mb-2"
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1715271544/empty_wishlist_mbo2jv.png"
              alt="success"
              style={{ width: '200px' }}
            />
            <h1 className="mt-5 mb-3 text-center">
              BẠN CHƯA YÊU THÍCH SẢN PHẨM NÀO
            </h1>
            <Link to={'/product-list'} className="mt-5">
              <div
                className="btn btn-dark py-2 px-4"
                style={{ fontSize: '16px', fontWeight: '450' }}
              >
                ĐI ĐẾN KHO HÀNG
              </div>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default FavoriteProductList;
