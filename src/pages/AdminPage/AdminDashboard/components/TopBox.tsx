// import { useEffect, useState } from 'react';
// import './TopBox.css';
// import { calculateTotalAmountByCustomers } from '../../../api/ProductOrderAPI';
// import CustomerModel from '../../../models/CustomerModel';
// import {
//   findDistinctCustomers,
//   getCustomerById,
// } from '../../../api/CustomerAPI';
// import FormatPrice from '../../../pages/ProductList/components/ProductProps/FormatPrice';

// const TopBox = () => {
//   const [topUserByTotalAmount, setTopUserByTotalAmount] = useState<
//     { customerId: number; totalAmount: number }[]
//   >([]);
//   const [orderDistinctCustomers, setOrderDistinctCustomers] = useState<
//     CustomerModel[]
//   >([]);
//   const [topDealCustomers, setTopDealCustomers] = useState<CustomerModel[]>([]);

//   useEffect(() => {
//     findDistinctCustomers()
//       .then((result) => {
//         setOrderDistinctCustomers(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         // Lấy top khách hàng theo totalAmount
//         const topUsers = await calculateTotalAmountByCustomers(
//           orderDistinctCustomers,
//           7,
//         ); // Lấy top 7 khách hàng
//         setTopUserByTotalAmount(topUsers);
//         // Lấy thông tin khách hàng từ danh sách topUserByTotalAmount
//         const topDealCustomers = await getCustomersByArray(topUsers);
//         setTopDealCustomers(topDealCustomers); // Lưu danh sách khách hàng vào state
//       } catch (error) {
//         console.error('Lỗi khi lấy top khách hàng:', error);
//       }
//     }
//     fetchData();
//   }, [orderDistinctCustomers]);

//   async function getCustomersByArray(
//     customerArray: { customerId: number; totalAmount: number }[],
//   ): Promise<CustomerModel[]> {
//     const customerList: CustomerModel[] = [];

//     for (const item of customerArray) {
//       try {
//         const customer = await getCustomerById(item.customerId);
//         if (customer) {
//           customerList.push(customer);
//         }
//       } catch (error) {
//         console.error('Lỗi khi lấy thông tin khách hàng:', error);
//       }
//     }

//     return customerList;
//   }

//   return (
//     <div className="topBox">
//       <h1 className="topBox__title">GIAO DỊCH HÀNG ĐẦU</h1>
//       <div className="topBox__list">
//         {topDealCustomers.map((user) => {
//           // Tìm kiếm thông tin về totalAmount của user trong mảng topUserByTotalAmount
//           const userWithTotalAmount = topUserByTotalAmount.find(
//             (item) => item.customerId === user.id,
//           );
//           return (
//             <div className="topBox__listItem" key={user.id}>
//               <div className="topBox__user">
//                 <img className="topBox__userImg" src={user.avatar} alt="" />
//                 <div className="topBox__userTexts">
//                   <span className="topBox__username">{user.fullName}</span>
//                   <span className="topBox__email">{user.email}</span>
//                 </div>
//               </div>
//               <span className="topBox__amount">
//                 {userWithTotalAmount && (
//                   <FormatPrice price={userWithTotalAmount.totalAmount} />
//                 )}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default TopBox;

import React from 'react'

const TopBox = () => {
  return (
    <div>TopBox</div>
  )
}

export default TopBox