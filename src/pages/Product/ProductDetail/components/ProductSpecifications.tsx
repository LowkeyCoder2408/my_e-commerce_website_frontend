import { useEffect, useState } from 'react';
import ProductModel from '../../../../models/ProductModel';
import { format, isValid } from 'date-fns';
import styles from '../scss/ProductSpecifications.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface ProductSpecificationsProps {
  product: ProductModel;
}

function ProductSpecifications(props: ProductSpecificationsProps) {
  let [rowCount, setRowCount] = useState<number>(0);

  // Convert time array to Date object
  const convertArrayToDate = (arr: number[] | undefined): Date | null => {
    if (!arr) return null;
    const [year, month, day, hour, minute, second] = arr;
    return new Date(year, month - 1, day, hour, minute, second);
  };

  const createdTimeDate = convertArrayToDate(props.product.createdTime);

  return (
    <div className={cx('product-details__specifications__wrapper')}>
      <div
        className={`${cx('product-details__specifications__heading')} text-center`}
      >
        <strong>
          <h1>CÁC THÔNG SỐ KỸ THUẬT</h1>
        </strong>
      </div>
      <table className={`${cx('table')} table mt-5`}>
        <tbody>
          {props.product.length !== 0 &&
            props.product.width === 0 &&
            props.product.height === 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều dài
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.length} mm
                </td>
              </tr>
            )}
          {props.product.length === 0 &&
            props.product.width !== 0 &&
            props.product.height === 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều rộng
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.width} mm
                </td>
              </tr>
            )}
          {props.product.length === 0 &&
            props.product.width === 0 &&
            props.product.height !== 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều cao
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.height} mm
                </td>
              </tr>
            )}
          {props.product.length !== 0 &&
            props.product.width !== 0 &&
            props.product.height === 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều dài x chiều rộng
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.length} mm x {props.product.width} mm
                </td>
              </tr>
            )}
          {props.product.length !== 0 &&
            props.product.width === 0 &&
            props.product.height !== 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều dài x chiều cao
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.length} mm x {props.product.height} mm
                </td>
              </tr>
            )}
          {props.product.length === 0 &&
            props.product.width !== 0 &&
            props.product.height !== 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Chiều rộng x chiều cao
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.width} mm x {props.product.height} mm
                </td>
              </tr>
            )}
          {props.product.length !== 0 &&
            props.product.width !== 0 &&
            props.product.height !== 0 && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Kích thước
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.length} mm x {props.product.width} mm x{' '}
                  {props.product.height} mm
                </td>
              </tr>
            )}
          {props.product.weight !== 0 && (
            <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
              <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                Trọng lượng
              </td>
              <td style={{ width: '60%', paddingLeft: '20px' }}>
                {props.product.weight} kg
              </td>
            </tr>
          )}
          {props.product.category !== null && (
            <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
              <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                Danh mục
              </td>
              <td style={{ width: '60%', paddingLeft: '20px' }}>
                {props.product.category.name}
              </td>
            </tr>
          )}
          {props.product.brand !== null && (
            <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
              <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                Thương hiệu
              </td>
              <td style={{ width: '60%', paddingLeft: '20px' }}>
                {props.product.brand.name}
              </td>
            </tr>
          )}
          {props.product.operatingSystem !== '' &&
            props.product.operatingSystem !== undefined && (
              <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
                <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                  Hệ điều hành
                </td>
                <td style={{ width: '60%', paddingLeft: '20px' }}>
                  {props.product.operatingSystem}
                </td>
              </tr>
            )}
          {createdTimeDate && isValid(createdTimeDate) && (
            <tr className={rowCount++ % 2 === 0 ? 'table-secondary' : ''}>
              <td style={{ width: '40%', paddingLeft: '20px' }} className="">
                Ngày nhập hàng
              </td>
              <td style={{ width: '60%', paddingLeft: '20px' }}>
                {format(createdTimeDate, 'dd/MM/yyyy')}, lúc{' '}
                {format(createdTimeDate, 'HH:mm')}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductSpecifications;
