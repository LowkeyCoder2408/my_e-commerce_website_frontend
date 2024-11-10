import { PieChart } from '@mui/x-charts/PieChart';
import styles from '../scss/OrderStatusRatio.module.scss';
import { useEffect, useState } from 'react';
import { backendEndpoint } from '../../../../utils/Service/Constant';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Props = {
  title: string;
  color: string;
  dataKey: string;
};

const OrderStatusRatio = (props: Props) => {
  const [statusPercentages, setStatusPercentages] = useState([]);

  useEffect(() => {
    const fetchStatusPercentages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          backendEndpoint + '/orders/status-percentage',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setStatusPercentages(data);
      } catch (error) {
        console.error('Error fetching status percentages:', error);
      }
    };

    fetchStatusPercentages();
  }, []);

  return (
    <div className={cx('barChartBox')}>
      <h1 className={`${cx('barChartBox__title')} text-white`}>
        {props.title}
      </h1>
      <div className={`${cx('barChartBox__chart')} text-white`}>
        <PieChart
          series={[
            {
              data: Object.entries(statusPercentages).map(
                ([status, percentage]) => ({
                  id: status,
                  value: percentage,
                  label: status,
                }),
              ),
              highlightScope: { fade: 'global', highlight: 'item' },
              faded: { innerRadius: 5, additionalRadius: -5, color: 'gray' },
            },
          ]}
          sx={{
            '& .MuiChartsLegend-root': {
              display: 'none',
            },
          }}
          height={150}
        />
      </div>
    </div>
  );
};

export default OrderStatusRatio;
