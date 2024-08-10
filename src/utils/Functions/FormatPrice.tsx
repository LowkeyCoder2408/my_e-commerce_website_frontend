import React from 'react';

interface FormatPriceProps {
  price?: number;
}

const FormatPrice: React.FC<FormatPriceProps> = (props: FormatPriceProps) => {
  if (props.price === undefined) {
    return <span>Giá chưa cập nhật</span>;
  }
  // if (props.price === 0) {
  //   return <span>Miễn phí</span>;
  // }
  return (
    <span>
      {new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(props.price)}
    </span>
  );
};

export default FormatPrice;
