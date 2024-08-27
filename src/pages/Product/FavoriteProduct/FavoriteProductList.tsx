import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FavoriteProductModel from '../../../models/FavoriteProductModel';
import { getUserIdByToken } from '../../../utils/Service/JwtService';
import { getAllFavoriteProductsByUserId } from '../../../api/FavoriteProductAPI';
import FavoriteProductCard from './FavoriteProductCard';
import Loader from '../../../utils/Loader';
import { toast } from 'react-toastify';
import { useFavoriteProducts } from '../../../utils/Context/FavoriteProductContext';

function FavoriteProductList() {
  const userId = getUserIdByToken();

  //   const { favoriteProducts, fetchFavoriteProducts } = useFavoriteProducts();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favoriteProducts, setFavoriteProducts] = useState<
    FavoriteProductModel[]
  >([]);

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

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

  if (isLoading) {
    return <Loader />;
  }

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
