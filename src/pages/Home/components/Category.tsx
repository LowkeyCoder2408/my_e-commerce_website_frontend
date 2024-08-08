import { Link } from 'react-router-dom';
import styles from '../scss/Category.module.scss';
import { useEffect, useState } from 'react';
import CategoryModel from '../../../models/CategoryModel';
import { getAllCategories } from '../../../api/CategoryAPI';
import {
  findProductsByCategoryId,
  getTotalProductQuantity,
} from '../../../api/ProductAPI';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function Category() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [productQuantities, setProductQuantities] = useState<number[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories.categories);
        // Tính tổng số lượng sản phẩm của mỗi danh mục và lưu vào state productQuantities
        const quantities = await Promise.all(
          categories.categories.map((category) =>
            quantityOfCategory(category.id),
          ),
        );
        setProductQuantities(quantities);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const quantityOfCategory = async (categoryId: number): Promise<number> => {
    try {
      const products = await findProductsByCategoryId(categoryId);
      const totalProducts = getTotalProductQuantity(products);
      return totalProducts;
    } catch (error) {
      console.error('Xảy ra lỗi khi tính tổng sản phẩm theo danh mục:', error);
      return 0;
    }
  };

  return (
    <div className="container" style={{ marginTop: '60px' }}>
      <h2 className="my-3">
        <strong>CÁC DANH MỤC NỔI BẬT</strong>
      </h2>
      <div className={`${cx('category__list')} row mt-5`}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`${cx('category__item-wrapper')} col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-3`}
          >
            <Link
              to={`/product-list/${category.alias}`}
              className={`${cx('category__item')} d-flex align-items-center`}
            >
              <div className={cx('category__item-information')}>
                <div className={cx('category__item-name')}>
                  <strong>{category.name}</strong>
                </div>
                <h4 style={{ fontWeight: '400', color: '#444' }}>
                  Còn{' '}
                  <strong style={{ color: 'red' }}>
                    {productQuantities[index]}
                  </strong>{' '}
                  sản phẩm
                </h4>
              </div>
              <img
                src={category.image}
                className={cx('category__item-img')}
                alt={category.name}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
