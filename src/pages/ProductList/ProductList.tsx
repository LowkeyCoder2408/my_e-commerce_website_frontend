import { useEffect, useState } from 'react';
import ProductModel from '../../models/ProductModel';
import ProductCard from '../Product/ProductCard/ProductCard';
import { useLocation, useParams } from 'react-router-dom';
import CategoryFilter from './components/CategoryFilter';
import {
  getAllFilteredProducts,
  getAndFindProducts,
} from '../../api/ProductAPI';
import DropdownOnly from '../../utils/DropdownOnly/DropdownOnly';
import { Pagination } from '../../utils/Pagination/Pagination';
import SliderPriceFilter from './components/SliderPriceFilter';
import Loader from '../../utils/Loader/Loader';

function ProductList() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [productList, setProductList] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [numberOfProductPerPage, setNumberOfProductPerPage] = useState(8);
  const [numberOfPageTemp, setTotalPageTemp] = useState(numberOfPage);
  const [selected, setSelected] = useState<string>('Chọn cách hiển thị');
  const [sortSelected, setSortSelected] = useState<string>('Chọn cách sắp xếp');
  const [filter, setFilter] = useState<number>(1);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100000000);
  const { categoryAlias } = useParams();

  let keyword = queryParams.get('keyword');

  if (numberOfPageTemp !== numberOfPage) {
    setCurrentPage(1);
    setTotalPageTemp(numberOfPage);
  }

  useEffect(() => {
    if (location.pathname === '/product-list' && !location.search) {
      setCurrentPage(1);
    }
  }, [location]);

  useEffect(() => {
    const isKeywordValid =
      keyword !== null && keyword !== undefined && keyword.trim() !== '';
    const isCategoryAliasValid =
      categoryAlias !== null &&
      categoryAlias !== undefined &&
      categoryAlias.trim() !== '';

    if (!isKeywordValid && !isCategoryAliasValid) {
      getAllFilteredProducts(
        numberOfProductPerPage,
        currentPage - 1,
        filter,
        minPrice,
        maxPrice,
      )
        .then((result) => {
          setProductList(result.result);
          setNumberOfPage(result.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    } else {
      getAndFindProducts(
        numberOfProductPerPage,
        (isKeywordValid ? keyword : '') ?? '',
        (isCategoryAliasValid ? categoryAlias : '') ?? '',
        currentPage - 1,
        filter,
        minPrice,
        maxPrice,
      )
        .then((result) => {
          setProductList(result.result);
          setNumberOfPage(result.totalPages);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    }
  }, [
    currentPage,
    numberOfProductPerPage,
    keyword,
    categoryAlias,
    filter,
    minPrice,
    maxPrice,
  ]);

  const pagination = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <h1>Gặp lỗi: {error}</h1>
      </div>
    );
  }

  const handleDisplaySelectChange = (value: number) => {
    switch (value) {
      case 1:
        setNumberOfProductPerPage(8);
        setCurrentPage(1);
        break;
      case 2:
        setNumberOfProductPerPage(12);
        setCurrentPage(1);
        break;
      case 3:
        setNumberOfProductPerPage(16);
        setCurrentPage(1);
        break;
      default:
        break;
    }
  };

  const handleSortSelectChange = (value: number) => {
    switch (value) {
      case 1:
        setFilter(1);
        setCurrentPage(1);
        break;
      case 2:
        setFilter(2);
        setCurrentPage(1);
        break;
      case 3:
        setFilter(3);
        setCurrentPage(1);
        break;
      case 4:
        setFilter(4);
        setCurrentPage(1);
        break;
      case 5:
        setFilter(5);
        setCurrentPage(1);
        break;
      case 6:
        setFilter(6);
        setCurrentPage(1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <div className="row" style={{ marginTop: '50px' }}>
        <div className="col-xxl-3 col-xl-3 col-lg-4 col-12 mb-5">
          <div className="row">
            <div className="col col-12">
              <DropdownOnly
                selected={sortSelected}
                setSelected={setSortSelected}
                handleSelectChange={handleSortSelectChange}
                options={[
                  'Sản phẩm từ mới - cũ',
                  'Sản phẩm được đánh giá tốt',
                  'Sản phẩm giá tốt',
                  'Sản phẩm bán chạy',
                  'Sản phẩm giảm nhiều (theo tỉ lệ)',
                ]}
                style={{ width: '100%' }}
              />
              <div className="mt-5">
                <h3>
                  <strong>LỌC THEO KHOẢNG GIÁ</strong>
                </h3>
                <SliderPriceFilter
                  min={0}
                  max={100000000}
                  step={10000}
                  forid="display1"
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />
              </div>
              <div className="mt-5">
                <h3>
                  <strong>LỌC THEO DANH MỤC</strong>
                </h3>
                <CategoryFilter categoryAlias={categoryAlias} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xxl-9 col-xl-9 col-lg-8 col-12">
          <div className="row">
            {productList.length > 0 ? (
              <>
                <div className="d-flex justify-content-between align-items-center mb-5">
                  <Pagination
                    currentPage={currentPage}
                    numberOfPage={numberOfPage}
                    pagination={pagination}
                  />
                  <DropdownOnly
                    selected={selected}
                    setSelected={setSelected}
                    handleSelectChange={handleDisplaySelectChange}
                    options={[
                      '8 sản phẩm/trang',
                      '12 sản phẩm/trang',
                      '16 sản phẩm/trang',
                    ]}
                    style={{ width: '340px' }}
                  />
                </div>
                {productList.map((product) => (
                  <div
                    key={product.id}
                    className="col-xxl-3 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6"
                  >
                    <ProductCard key={product.id} product={product} />
                  </div>
                ))}
              </>
            ) : (
              <div className="col-12 flex-column d-flex justify-center align-items-center mt-5">
                <div className="mt-5 text-center" style={{ fontSize: '3rem' }}>
                  <strong>Rất tiếc! Không có sản phẩm nào phù hợp!</strong>
                </div>
                <img
                  style={{ width: '40%', margin: 'auto' }}
                  src="https://res.cloudinary.com/dgdn13yur/image/upload/v1723352364/seh1f26mmt3nm0cl7ljg.webp"
                  alt=""
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
