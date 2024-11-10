import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { calculateTotalAmountByMonths } from '../../../../api/OrderAPI';
import styles from '../scss/MonthlyRevenue.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const orderDistinctMonthsArray = Array.from(
  { length: new Date().getMonth() + 1 },
  (_, i) => i + 1,
);

const MonthlyRevenue = () => {
  const [totalAmountByMonth, setTotalAmountByMonth] = useState<
    { month: number; totalAmount: number }[]
  >([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const totalAmounts = await calculateTotalAmountByMonths();
        setTotalAmountByMonth(totalAmounts);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
      }
    };

    fetchOrderData();
  }, []);

  const totalAmountsData = orderDistinctMonthsArray.map((month) => {
    const monthData = totalAmountByMonth.find((item) => item.month === month);
    return monthData ? monthData.totalAmount / 1000000 : 0;
  });
  const currentYear = new Date().getFullYear();

  return (
    <div className={cx('bigChartBox')}>
      <h1 className={cx('bigChartBox__title')}>
        DOANH THU THEO THÁNG (năm {currentYear})
      </h1>

      <LineChart
        xAxis={[
          {
            data: orderDistinctMonthsArray,
            tickMinStep: 1,
            label: 'Tháng',
          },
        ]}
        yAxis={[
          {
            valueFormatter: (value: number) =>
              value.toLocaleString().replace(/[,\.]/g, ''),
          },
        ]}
        series={[
          {
            data: totalAmountsData,
            area: true,
            color: 'gold',
            label: 'triệu đồng',
          },
        ]}
        height={300}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
        sx={{
          '& .MuiChartsGrid-line .MuiChartsGrid-verticalLine': {
            color: '#fff !important',
            stroke: '#fff !important',
          },
          '& .MuiChartsAxis-root .MuiChartsAxis-line': {
            stroke: '#fff',
            color: '#fff !important',
          },
          '& .MuiChartsAxis-tick, & .MuiChartsAxis-tickLabel, & .MuiChartsAxis-label':
            {
              stroke: '#fff !important',
              color: '#fff',
            },
          '& .MuiChartsAxis-tickLabel tspan': {
            fontSize: '1.1rem',
            fontWeight: 300,
          },
          '& .MuiChartsAxis-label tspan': {
            fontSize: '1.4rem',
          },
          '& .MuiChartsLegend-series tspan': {
            stroke: '#fff',
            fontSize: '1.4rem',
          },
          '& .css-1ezchsq-MuiAreaElement-root': {
            fill: '#6d6d67',
          },
          '& .css-195sd4n-MuiChartsGrid-line': {
            stroke: 'rgba(205, 205, 205, 0.12)',
          },
          '& .MuiChartsAxis-tick': {
            stroke: '#fff',
          },
          '& .MuiChartsAxis-tickLabel': {
            fill: '#fff',
          },
        }}
      />
    </div>
  );
};

export default MonthlyRevenue;
