import { Link } from 'react-router-dom';
import styles from './scss/Brand.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import BrandModel from '../../../../models/BrandModel';
import { getAllBrands } from '../../../../api/BrandAPI';

const cx = classNames.bind(styles);

function Brand() {
  const [brands, setBrands] = useState<BrandModel[]>([]);

  useEffect(() => {
    getAllBrands().then((result) => {
      setBrands(result.brands);
    });
  }, []);

  return (
    <div className={`${cx('brand-area')} container`}>
      <h2>
        <strong>MUA SẮM THEO THƯƠNG HIỆU</strong>
      </h2>
      <div className={`${cx('brand-area-list')} row mt-5`}>
        {brands.map((brand, index) => (
          <div
            className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-4 col-6"
            key={index}
          >
            <Link
              to={`/brand-list?id=${brand.id}`}
              className={cx('brand-area-item')}
            >
              <img
                className={cx('brand-area-item-img')}
                src={brand.logo}
                alt=""
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Brand;
