// import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
// import './PieCartBox.css';
// import { useEffect, useState } from 'react';
// import { getAllCategories } from '../../../api/CategoryAPI';
// import {
//   findProductsByCategoryId,
//   getTotalProductQuantity,
// } from '../../../api/ProductAPI';
// import CategoryModel from '../../../models/CategoryModel';
// import ChartBox from '../ChartBox';

// const PieChartBox = () => {
//   const [categoriesList, setCategoriesList] = useState<CategoryModel[]>([]);
//   const [productQuantities, setProductQuantities] = useState<number[]>([]);
//   const [data, setData] = useState<
//     { name: string | undefined; value: number; color: string }[]
//   >([]);
//   const [chartData, setChartData] = useState<{ name: string; value: number }[]>(
//     [],
//   );

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const categories = await getAllCategories();
//         setCategoriesList(categories.categoryList);
//         // Calculate total product quantity for each category and save to state
//         const quantities = await Promise.all(
//           categories.categoryList.map((category) =>
//             quantityOfCategory(category.id),
//           ),
//         );
//         setProductQuantities(quantities);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     if (categoriesList.length && productQuantities.length) {
//       const generateRandomColor = () => {
//         const letters = '0123456789ABCDEF';
//         let color = '#';
//         for (let i = 0; i < 6; i++) {
//           color += letters[Math.floor(Math.random() * 16)];
//         }
//         return color;
//       };

//       const updatedData = categoriesList.map((category, index) => ({
//         name: category.name || '',
//         value: productQuantities[index],
//         color: generateRandomColor(),
//       }));

//       setData(updatedData);

//       const updatedChartData = categoriesList.map((category, index) => ({
//         name: category.name || `Danh mục ${category.id}`,
//         value: productQuantities[index],
//       }));

//       setChartData(updatedChartData);
//     }
//   }, [categoriesList, productQuantities]);

//   const quantityOfCategory = async (categoryId: number): Promise<number> => {
//     try {
//       const products = await findProductsByCategoryId(categoryId);
//       const totalProducts = getTotalProductQuantity(products.result);
//       return totalProducts;
//     } catch (error) {
//       console.error('Error calculating total products by category:', error);
//       return 0;
//     }
//   };

//   const chartBoxCategory = {
//     color: '#8884d8',
//     icon: '/user.svg',
//     title: 'DANH MỤC SẢN PHẨM',
//     link: '/admin/view-categories',
//     number: categoriesList.length,
//     dataKey: 'value',
//     percentage: 45,
//     chartData: chartData,
//   };

//   return (
//     <div className="pieChartBox">
//       <h1 className="pieChartBox__title">DẪN THEO DANH MỤC</h1>
//       <div className="pieChartBox__chart">
//         <ResponsiveContainer width="99%" height={300}>
//           <PieChart>
//             <Tooltip
//               contentStyle={{
//                 background: 'white',
//                 borderRadius: '5px',
//               }}
//             />
//             <Pie
//               data={data}
//               innerRadius={'70%'}
//               outerRadius={'90%'}
//               paddingAngle={5}
//               dataKey="value"
//             >
//               {data.map((item) => (
//                 <Cell key={item.name} fill={item.color} />
//               ))}
//             </Pie>
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//       <div className="" style={{ height: '260px' }}>
//         <ChartBox {...chartBoxCategory} />
//       </div>
//     </div>
//   );
// };

// export default PieChartBox;

import React from 'react'

const PieChartBox = () => {
  return (
    <div>PieChartBox</div>
  )
}

export default PieChartBox