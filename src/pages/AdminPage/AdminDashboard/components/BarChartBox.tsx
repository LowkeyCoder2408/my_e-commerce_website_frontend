import { PieChart } from '@mui/x-charts/PieChart';
import './BarChartBox.css';
import { useEffect, useState } from 'react';
import { backendEndpoint } from '../../../../utils/Service/Constant';

type Props = {
  title: string;
  color: string;
  dataKey: string;
};

const BarChartBox = (props: Props) => {
  const [statusPercentages, setStatusPercentages] = useState([]);

  useEffect(() => {
    const fetchStatusPercentages = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          backendEndpoint + '/order/status-percentage',
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
    <div className="barChartBox">
      <h1 className="barChartBox__title">{props.title}</h1>
      <div className="barChartBox__chart">
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
            },
          ]}
          height={150}
        />
      </div>
    </div>
  );
};

export default BarChartBox;
