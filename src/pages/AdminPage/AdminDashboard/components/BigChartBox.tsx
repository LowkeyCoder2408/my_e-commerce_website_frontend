// import { LineChart } from '@mui/x-charts/LineChart';
// import './BigChartBox.css';
// import { useEffect, useState } from 'react';
// import { backendEndpoint } from '../../../../utils/Service/Constant';

// const currentMonth = new Date().getMonth() + 1;

// const orderDistinctMonthsArray = Array.from(
//   { length: currentMonth },
//   (_, i) => i + 1,
// );

// const BigChartBox = () => {
//   const [totalAmountByMonth, setTotalAmountByMonth] = useState<
//     { month: number; totalAmount: number }[]
//   >([]);
//   const [orderDistinctMonths, setOrderDistinctMonths] = useState<number[]>([]);

//   useEffect(() => {
//     const fetchOrderDistinctMonths = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(
//           backendEndpoint + '/order/distinct-months',
//           {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'Content-Type': 'application/json',
//             },
//           },
//         );

//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         setOrderDistinctMonths(data);
//       } catch (error) {
//         console.error('Error fetching distinct months:', error);
//       }
//     };

//     fetchOrderDistinctMonths();
//   }, []);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const totalAmounts = await calculateTotalAmountByMonths(
//           orderDistinctMonths,
//         );
//         setTotalAmountByMonth(totalAmounts);
//       } catch (error) {
//         console.error('Lỗi khi lấy top khách hàng:', error);
//       }
//     }
//     fetchData();
//   }, [orderDistinctMonths]);

//   const totalAmountsData = orderDistinctMonthsArray.map((month) => {
//     const monthData = totalAmountByMonth.find((item) => item.month === month);
//     return monthData ? monthData.totalAmount / 1000000 : 0;
//   });
//   const currentYear = new Date().getFullYear();

//   return (
//     <div className="bigChartBox">
//       <h1 className="bigChartBox__title">
//         DOANH THU THEO THÁNG (năm {currentYear})
//       </h1>

//       <LineChart
//         xAxis={[
//           {
//             data: orderDistinctMonthsArray,
//             tickMinStep: 1,
//             label: 'Tháng',
//           },
//         ]}
//         series={[
//           {
//             data: totalAmountsData,
//             area: true,
//             color: 'gold',
//             label: 'triệu đồng',
//           },
//         ]}
//         height={300}
//         margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
//         grid={{ vertical: true, horizontal: true }}
//       />
//     </div>
//   );
// };

// export default BigChartBox;

import React from 'react'

const BigChartBox = () => {
  return (
    <div>BigChartBox</div>
  )
}

export default BigChartBox