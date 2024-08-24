import { useLocation } from 'react-router-dom';
import styles from './scss/ProductDetail.module.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping,
  faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ProductModel from '../../../models/ProductModel';
import { getProductById } from '../../../api/ProductAPI';
import Loader from '../../../utils/Loader';
import ProductRating from '../ProductRating/ProductRating';
import FormatPrice from '../../../utils/Service/FormatPrice';
import ProductSpecifications from './components/ProductSpecifications';
import classNames from 'classnames/bind';
import ProductReviewList from '../ProductReviewList/ProductReviewList';

const cx = classNames.bind(styles);

function ProductDetail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const idNumber = id ? parseInt(id, 10) : 0;

  const [product, setProduct] = useState<ProductModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  // const { setTotalCart, cartList } = useCartItem();

  useEffect(() => {
    if (id) {
      getProductById(idNumber)
        .then((result) => {
          setProduct(result);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  }, []);

  const increaseQuantity = () => {
    if (quantity < (product && product.quantity ? product.quantity : 1)) {
      setQuantity(quantity + 1);
    }
  };

  const descreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    const inStockQuantity = product && product.quantity ? product.quantity : 0;
    if (
      !isNaN(newQuantity) &&
      newQuantity >= 1 &&
      newQuantity <= inStockQuantity
    ) {
      setQuantity(newQuantity);
    }
  };

  // Xử lý thêm sản phẩm vào giỏ hàng
  // const handleAddProductsToCart = async (newProduct: ProductModel) => {
  //   const inStockQuantity = product && product.quantity ? product.quantity : 0;

  //   // Kiểm tra nếu chưa đăng nhập
  //   if (!isToken()) {
  //     // Hiển thị thông báo yêu cầu đăng nhập
  //     toast.error('Bạn cần đăng nhập để thực hiện chức năng này!');
  //     return;
  //   }

  //   // cái existingProduct này sẽ tham chiếu đến cái cart ở trên, nên khi update thì cart nó cũng update theo
  //   let existingProduct = cartList.find(
  //     (cartItem) => cartItem.product.id === newProduct.id,
  //   );

  //   // Thêm 1 sản phẩm vào giỏ hàng
  //   if (existingProduct) {
  //     if (
  //       existingProduct.quantity &&
  //       existingProduct.quantity + quantity <= inStockQuantity
  //     ) {
  //       if (existingProduct.quantity !== undefined) {
  //         // nếu có rồi thì sẽ tăng số lượng
  //         existingProduct.quantity += quantity;
  //       }
  //       // Lưu vào db
  //       const request = {
  //         id: existingProduct.id,
  //         quantity: existingProduct.quantity,
  //       };
  //       const token = localStorage.getItem('token');
  //       fetch(backendEndpoint + `/cart-item/update-item`, {
  //         method: 'PUT',
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'content-type': 'application/json',
  //         },
  //         body: JSON.stringify(request),
  //       }).catch((err) => console.log(err));
  //       // Thông báo toast
  //       toast.success('Thêm vào giỏ hàng thành công');
  //     } else {
  //       toast.error(
  //         `Số lượng sản phẩm trong giỏ vượt quá số lượng tồn kho (${inStockQuantity})`,
  //       );
  //     }
  //   } else {
  //     if (quantity <= inStockQuantity) {
  //       // Lưu vào db
  //       try {
  //         const request = {
  //           quantity: quantity,
  //           product: newProduct,
  //           customerId: getUserIdByToken(),
  //         };
  //         const token = localStorage.getItem('token');
  //         const response = await fetch(
  //           backendEndpoint + '/cart-item/add-item',
  //           {
  //             method: 'POST',
  //             headers: {
  //               Authorization: `Bearer ${token}`,
  //               'Content-type': 'application/json',
  //             },
  //             body: JSON.stringify(request),
  //           },
  //         );

  //         if (response.ok) {
  //           const idCart = await response.json();
  //           cartList.push({
  //             id: idCart,
  //             quantity: quantity,
  //             product: newProduct,
  //           });
  //         }
  //       } catch (error) {
  //         console.log('Lỗi là', error);
  //       }
  //       // Thông báo toast
  //       toast.success('Thêm vào giỏ hàng thành công');
  //     } else {
  //       toast.error(
  //         `Số lượng sản phẩm trong giỏ vượt quá số lượng tồn kho (${inStockQuantity})`,
  //       );
  //     }
  //   }
  //   // Lưu vào localStorage
  //   localStorage.setItem('cart', JSON.stringify(cartList));
  //   setTotalCart(cartList.length);
  // };

  const handleBuyNow = () => {};

  if (isLoading) {
    return <Loader />;
  }

  const handleTab = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="container mt-5">
      <div className={`${cx('product-details')} row m-0 p-5 bg-white`}>
        <div className="default-title my-3">Thông tin chung về sản phẩm</div>
        {product ? (
          <>
            <div className="col col-xxl-6 col-12">
              <div className={cx('product-details__big-img')}>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImageIndex].url}
                    alt="Ảnh chủ đạo"
                  />
                ) : (
                  <img src={product.mainImage} alt="Ảnh chủ đạo" />
                )}
              </div>
              <div className={cx('product-details__thumb')}>
                {product.images &&
                  product.images.map((img, index) => (
                    <img
                      onClick={() => handleTab(index)}
                      key={index}
                      src={img.url}
                      alt="Ảnh bổ sung"
                      className={cx({ active: index === selectedImageIndex })}
                    />
                  ))}
              </div>
            </div>
            <div className="col col-xxl-6 col-12">
              <div className={cx('product-details__box')}>
                <div className="row">
                  <h2 className={cx('product-details__name')}>
                    {product.name}
                  </h2>
                  <div className={cx('product-details__rating')}>
                    {product.averageRating !== null &&
                      product.averageRating !== undefined && (
                        <div className="d-flex">
                          <ProductRating
                            rating={product.averageRating}
                            starSize={1.8}
                          />
                          {product.averageRating > 0 && (
                            <div
                              className={`${cx('product-details__rating-count')} mt-2 ms-2`}
                            >
                              ({product.averageRating})
                            </div>
                          )}
                        </div>
                      )}
                    {product.ratingCount !== null &&
                      product.ratingCount !== undefined && (
                        <div className="d-flex">
                          <div
                            className={`${cx('product-details__rating-count')} mt-2`}
                          >
                            ({product.ratingCount} lượt đánh giá)
                          </div>
                        </div>
                      )}
                  </div>

                  <div className={cx('product-details__price')}>
                    <div className={cx('product-details__price-current')}>
                      <FormatPrice price={product.currentPrice} />
                    </div>
                    <div className={cx('product-details__price-listed')}>
                      <FormatPrice price={product.listedPrice} />
                    </div>
                    <div className={cx('product-details__price-label')}>
                      {product.discountPercent &&
                      product.discountPercent > 0 ? (
                        <span>-{product.discountPercent}%</span>
                      ) : (
                        <span>KHÔNG GIẢM</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={cx('product-details__full-description')}>
                  <div className={`${cx('product-details__title')} mb-2`}>
                    <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                    <strong> Về sản phẩm này (mô tả ngắn):</strong>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: product.shortDescription
                        ? product.shortDescription
                        : 'Không có thông tin',
                    }}
                  />
                  <div className={`${cx('product-details__information')} mt-4`}>
                    <div className={cx('product-details__information-brand')}>
                      <div className={`${cx('product-details__title')} mb-2`}>
                        <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        <strong> Thương hiệu:</strong>{' '}
                        {product.brand ? product.brand.name : 'Chưa cập nhật'}
                      </div>
                    </div>
                    <div
                      className={cx('product-details__information-category')}
                    >
                      <div className={`${cx('product-details__title')} mb-2`}>
                        <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        <strong> Danh mục:</strong>{' '}
                        {product.category
                          ? product.category.name
                          : 'Chưa cập nhật'}
                      </div>
                    </div>
                    {product.quantity !== undefined &&
                    product.quantity === 0 ? (
                      <div
                        className={cx('product-details__information-status')}
                      >
                        <div className={`${cx('product-details__title')} mb-2`}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                          <strong> Trạng thái:</strong> Đã hết hàng
                        </div>
                      </div>
                    ) : (
                      <div
                        className={cx('product-details__information-status')}
                      >
                        <div className={`${cx('product-details__title')} mb-2`}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                          <strong> Trạng thái:</strong> Còn {product.quantity}{' '}
                          sản phẩm
                        </div>
                      </div>
                    )}
                    <div
                      className={`${cx('product-details__information-quantity')} mt-4 d-flex align-items-center`}
                    >
                      <div className="mb-2">
                        <strong>Số lượng:</strong>
                      </div>
                      <div
                        className="input-group"
                        style={{
                          width: '130px',
                          marginLeft: '20px',
                        }}
                      >
                        <button
                          style={{
                            width: '35px',
                            height: '35px',
                            fontSize: '1.7rem',
                          }}
                          onClick={descreaseQuantity}
                          type="button"
                          className="input-group-text d-flex justify-content-center align-items-center"
                        >
                          -
                        </button>
                        <input
                          style={{ height: '35px', fontSize: '1.7rem' }}
                          value={quantity}
                          type="text"
                          min={1}
                          className="form-control text-center"
                          onChange={handleQuantityChange}
                        />
                        <button
                          style={{
                            width: '35px',
                            height: '35px',
                            fontSize: '1.7rem',
                          }}
                          onClick={increaseQuantity}
                          type="button"
                          className="input-group-text d-flex justify-content-center align-items-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div
                      className={cx('product-details__information-quantity')}
                    >
                      <strong className="">Tạm tính: </strong>
                      {product.currentPrice && (
                        <strong
                          className="mt-2"
                          style={{
                            fontSize: '2.5rem',
                            color: '#3737a9',
                            marginLeft: '5px',
                          }}
                        >
                          <FormatPrice
                            price={quantity * product.currentPrice}
                          />
                        </strong>
                      )}
                    </div>

                    <div
                      className={`${cx('product-details__information-freeship')} mt-3`}
                    >
                      <div className={`${cx('product-details__title')} mb-2`}>
                        <img
                          src="https://res.cloudinary.com/dgdn13yur/image/upload/v1710137569/freeship_yke7sb.png"
                          style={{ width: '40px' }}
                          alt=""
                        />
                        <i className="mt-5">
                          {' '}
                          Miễn phí ship (áp dụng trên toàn quốc)
                        </i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`${cx('product-details__buy')} mt-5`}>
                  <button
                    className={cx('product-details__cart')}
                    // onClick={() => handleAddProductsToCart(product)}
                  >
                    <FontAwesomeIcon icon={faBagShopping as IconProp} />
                    Thêm vào giỏ hàng
                  </button>
                  <button
                    className={cx('product-details__buy-now')}
                    onClick={handleBuyNow}
                  >
                    Mua ngay
                  </button>
                </div>
              </div>
            </div>
            <div className={`${cx('product-details__overview')} mt-5`}>
              <ProductSpecifications product={product} />
              <ProductReviewList product={product} setProduct={setProduct} />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-center mt-5">
              <strong>SẢN PHẨM KHÔNG TỒN TẠI</strong>
            </h1>
            <img
              style={{ width: '30%' }}
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1723352364/seh1f26mmt3nm0cl7ljg.webp"
              alt=""
              className="mb-5"
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;