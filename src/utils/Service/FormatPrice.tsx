import React from 'react';

interface FormatPriceProps {
  price?: number;
}

const FormatPrice: React.FC<FormatPriceProps> = (props: FormatPriceProps) => {
  if (props.price === undefined) {
    return <span>Chưa cập nhật</span>;
  }
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
