// import {
//   Checkbox,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   TextField,
// } from '@mui/material';
// import React, { FormEvent, useEffect, useState } from 'react';
// import './CheckOut.css';
// import CartItemModel from '../../models/CartItemModel';
// import { useCartItem } from '../../utils/CartItemContext';
// import CustomerModel from '../../models/CustomerModel';
// import { backendEndpoint } from '../../utils/Constant';
// import { getCustomerById } from '../../api/CustomerAPI';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ProductCartProps from '../ShoppingCart/ProductCartProps';
// import FormatPrice from '../ProductList/components/ProductProps/FormatPrice';
// import { useNavigate } from 'react-router-dom';
// import { getUserIdByToken } from '../../utils/JwtService';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import ProvinceModel from '../../models/ProvinceModel';
// import { getAllProvince, getProvinceByAddressId } from '../../api/ProvinceAPI';
// import {
//   getAllDistrictsByProvinceId,
//   getDistrictByAddressId,
// } from '../../api/DistrictAPI';
// import DistrictModel from '../../models/DistrictModel';
// import WardModel from '../../models/WardModel';
// import { getAllWardsByDistrictId, getWardByAddressId } from '../../api/WardAPI';
// import { CheckOutSuccess } from './components/CheckOutSuccess';
// import AddressModel from '../../models/AddressModel';
// import { getDefaultAddressByIdUser } from '../../api/AddressAPI';
// import { toast } from 'react-toastify';

// interface CheckOutProps {
//   setIsCheckOut: any;
//   cartList: CartItemModel[];
//   totalPriceProduct: number;
//   isBuyNow?: boolean;
// }

// export const CheckOut: React.FC<CheckOutProps> = (props) => {
//   const { setCartList, setTotalCart } = useCartItem();
//   const [isSuccessPayment, setIsSuccessPayment] = useState(false);

//   // Xử lý phương thức thanh toán
//   const [payment, setPayment] = React.useState(1);
//   const [fullName, setFullName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [addressLine, setAddressLine] = useState('');

//   const [provinceList, setProvinceList] = useState<ProvinceModel[] | null>([]);
//   const [provinceId, setProvinceId] = useState<number | null>(null);
//   const [provinceName, setProvinceName] = useState<string>('');

//   const [districtList, setDistrictList] = useState<DistrictModel[] | null>([]);
//   const [districtId, setDistrictId] = useState<number | null>(null);
//   const [districtName, setDistrictName] = useState<string>('');

//   const [wardList, setWardList] = useState<WardModel[] | null>([]);
//   const [wardId, setWardId] = useState<number | null>(null);
//   const [wardName, setWardName] = useState<string>('');

//   const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);
//   const [isUseDefaultAddress, setIsUseDefaultAddress] =
//     useState<boolean>(false);

//   const [address, setAddress] = useState<AddressModel | null>(null);

//   const [note, setNote] = useState('');

//   const navigation = useNavigate();
//   // Lấy dữ liệu của người dùng lên
//   const [customer, setCustomer] = useState<CustomerModel>();

//   useEffect(() => {
//     const customerId = getUserIdByToken();
//     getDefaultAddressByIdUser(customerId).then((result) => {
//       console.log(result.address);
//       setAddress(result.address);
//     });
//   }, [customer]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const [provinceResult, districtResult, wardResult] = await Promise.all([
//         getProvinceByAddressId(address?.id),
//         getDistrictByAddressId(address?.id),
//         getWardByAddressId(address?.id),
//       ]);

//       if (provinceResult?.name !== undefined) {
//         setProvinceName(provinceResult.name);
//       } else {
//         setProvinceName('');
//       }

//       if (districtResult?.name !== undefined) {
//         setDistrictName(districtResult.name);
//       } else {
//         setDistrictName('');
//       }

//       if (wardResult?.name !== undefined) {
//         setWardName(wardResult.name);
//       } else {
//         setWardName('');
//       }

//       if (isUseDefaultAddress) {
//         if (provinceResult?.id !== undefined) {
//           setProvinceId(provinceResult.id);
//         }

//         if (districtResult?.id !== undefined) {
//           setDistrictId(districtResult.id);
//         }

//         if (wardResult?.id !== undefined) {
//           setWardId(wardResult.id);
//         }

//         if (address?.addressLine !== undefined) {
//           setAddressLine(address?.addressLine);
//         }
//       }
//     };
//     fetchData();
//   }, [address, isDefaultAddress, isUseDefaultAddress]);

//   useEffect(() => {
//     getAllProvince().then((result) => {
//       setProvinceList(result);
//     });
//   }, []);

//   useEffect(() => {
//     if (provinceId !== null) {
//       getAllDistrictsByProvinceId(provinceId)
//         .then((result) => {
//           setDistrictList(result);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [provinceId]);

//   useEffect(() => {
//     if (districtId !== null) {
//       getAllWardsByDistrictId(districtId)
//         .then((result) => {
//           setWardList(result);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }
//   }, [districtId]);

//   // Báo lỗi
//   const [errorPhoneNumber, setErrorPhoneNumber] = useState('');

//   const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setPayment(parseInt((event.target as HTMLInputElement).value));
//   };

//   useEffect(() => {
//     const customerId = getUserIdByToken();
//     getCustomerById(customerId)
//       .then((response) => {
//         if (response !== undefined) {
//           setCustomer(response);
//           if (response.fullName !== undefined) {
//             setFullName(response.fullName);
//           }
//           if (response.phoneNumber !== undefined) {
//             setPhoneNumber(response.phoneNumber);
//           }
//           // setDeliveryAddress(response.);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     console.log(provinceId, districtId, wardId);
//   }, [provinceId, districtId, wardId]);

//   async function handleSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     const token = localStorage.getItem('token');

//     if (
//       addressLine === null ||
//       provinceId === null ||
//       districtId === null ||
//       wardId === null
//     ) {
//       toast.error('Bạn chưa điền đầy đủ thông thông tin!');
//       return;
//     }
//     const productRequest: any[] = [];

//     props.cartList.forEach((cartItem) => {
//       productRequest.push({
//         product: cartItem.product,
//         quantity: cartItem.quantity,
//       });
//     });

//     const request = {
//       addressLine: addressLine,
//       payment: payment,
//       idPayment: payment,
//       districtId: districtId,
//       email: customer?.email,
//       fullName: fullName,
//       note: note,
//       phoneNumber: phoneNumber,
//       provinceId: provinceId,
//       total: props.totalPriceProduct,
//       wardId: wardId,
//       customerId: getUserIdByToken(),
//       product: productRequest,
//       isDefaultAddress: isDefaultAddress,
//       isUseDefaultAddress: isUseDefaultAddress,
//     };

//     // Khi thanh toán bằng vnpay
//     if (payment === 2) {
//       try {
//         const response = await fetch(
//           backendEndpoint +
//             '/payment/create-payment?amount=' +
//             props.totalPriceProduct,
//           {
//             method: 'POST',
//             headers: {
//               Authorization: `Bearer ${token}`,
//               'content-type': 'application/json',
//             },
//           },
//         );
//         if (!response.ok) {
//           throw new Error(`HTTP error is: ${response.status}`);
//         }
//         const paymentUrl = await response.text();

//         window.location.replace(paymentUrl);
//         // Lưu order vào DB ngay khi thanh toán thành công
//         const isPayNow = true;
//         handleSaveOrder(request, isPayNow);
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       // Khi admin cập nhật trạng thái nhận hàng sẽ thêm vào DB
//       handleSaveOrder(request);
//     }
//   }

//   // Hàm check số điện thoại có đúng định dạng không
//   const checkPhoneNumber = (setErrorPhoneNumber: any, phoneNumber: string) => {
//     const phoneNumberRegex = /^(0[1-9]|84[1-9])[0-9]{8}$/;
//     if (phoneNumber.trim() === '') {
//       return false;
//     } else if (!phoneNumberRegex.test(phoneNumber.trim())) {
//       setErrorPhoneNumber('Số điện thoại không đúng định dạng.');
//       return true;
//     } else {
//       setErrorPhoneNumber('');
//       return false;
//     }
//   };

//   const handleSaveOrder = (request: any, isPayNow?: boolean) => {
//     const token = localStorage.getItem('token');
//     fetch(backendEndpoint + '/order/add-order', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify(request),
//     })
//       .then((response) => {
//         localStorage.removeItem('cart');
//         if (!isPayNow) {
//           setIsSuccessPayment(true);
//         }
//         if (!props.isBuyNow) {
//           setCartList([]);
//           setTotalCart(0);
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <>
//       {!isSuccessPayment ? (
//         <form onSubmit={handleSubmit} className="mt-4">
//           <div className="bg-white rounded-4 p-5">
//             <div className="container p-0">
//               <h2 className="mb-3 mt-4">THÔNG TIN GIAO HÀNG</h2>
//               <div className="row">
//                 <div className="mb-4 col-xxl-4 col-xl-4 col-lg-4 col-12">
//                   <TextField
//                     required
//                     fullWidth
//                     type="text"
//                     id="standard-required"
//                     label="Họ và tên"
//                     value={fullName}
//                     variant="standard"
//                     onChange={(e) => setFullName(e.target.value)}
//                     className="input-field"
//                     style={{ fontSize: '170px !important' }}
//                   />
//                 </div>
//                 <div className="mb-4 col-xxl-4 col-xl-4 col-lg-4 col-12">
//                   <TextField
//                     error={errorPhoneNumber.length > 0 ? true : false}
//                     helperText={errorPhoneNumber}
//                     required={true}
//                     fullWidth
//                     type="text"
//                     label="Số điện thoại"
//                     variant="standard"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                     onBlur={(e: any) => {
//                       checkPhoneNumber(setErrorPhoneNumber, e.target.value);
//                     }}
//                     className="input-field"
//                   />
//                 </div>
//                 <div className="mb-4 col-xxl-4 col-xl-4 col-lg-4 col-12">
//                   {customer && customer.email !== undefined && (
//                     <TextField
//                       error={errorPhoneNumber.length > 0 ? true : false}
//                       disabled
//                       fullWidth
//                       type="text"
//                       variant="standard"
//                       label="Email"
//                       value={customer.email}
//                       defaultValue={customer.email}
//                       // className="input-field"
//                     />
//                   )}
//                 </div>
//                 <div className="col col-xxl-12 col-12">
//                   <h2 className="mt-4">ĐỊA CHỈ NHẬN HÀNG</h2>
//                   <div className="row">
//                     {address && (
//                       <div className="col col-6">
//                         <FormControlLabel
//                           control={
//                             <Checkbox
//                               checked={isUseDefaultAddress}
//                               onChange={() => {
//                                 setIsUseDefaultAddress(!isUseDefaultAddress);
//                               }}
//                             />
//                           }
//                           label={`Sử dụng địa chỉ mặc định (${
//                             address?.addressLine +
//                             ', ' +
//                             wardName +
//                             ', ' +
//                             districtName +
//                             ', ' +
//                             provinceName +
//                             ')'
//                           }`}
//                         />
//                       </div>
//                     )}

//                     {isUseDefaultAddress === false && (
//                       <>
//                         <div className={`col ${address ? 'col-6' : 'col-12'}`}>
//                           <FormControlLabel
//                             control={
//                               <Checkbox
//                                 checked={isDefaultAddress}
//                                 onChange={() => {
//                                   console.log(!isDefaultAddress);
//                                   setIsDefaultAddress(!isDefaultAddress);
//                                 }}
//                               />
//                             }
//                             label="Đặt làm địa chỉ mặc định"
//                           />
//                         </div>
//                         <div className="mt-1 mb-4 col-xxl-3 col-xl-3 col-lg-6 col-12">
//                           <TextField
//                             required
//                             fullWidth
//                             type="text"
//                             id="standard-required"
//                             label="Địa chỉ cụ thể/Số nhà"
//                             defaultValue={addressLine}
//                             value={addressLine}
//                             variant="standard"
//                             onChange={(e) => setAddressLine(e.target.value)}
//                             className="input-field"
//                             style={{ fontSize: '170px !important' }}
//                           />
//                         </div>
//                         <div className="col col-xxl-3 col-xl-3 col-lg-6 col-md-4 col-12">
//                           <FormControl fullWidth variant="standard">
//                             <InputLabel id="demo-simple-select-standard-label">
//                               Tỉnh/Thành phố
//                             </InputLabel>
//                             <Select
//                               required
//                               labelId="demo-simple-select-standard-label"
//                               id="demo-simple-select-standard"
//                               variant="standard"
//                               value={provinceId}
//                               onChange={(e) => {
//                                 setProvinceId(parseInt(e.target.value + ''));
//                                 setDistrictId(null);
//                                 setWardId(null);
//                                 setWardList(null);
//                               }}
//                             >
//                               <MenuItem value="">
//                                 <em>None</em>
//                               </MenuItem>
//                               {provinceList?.map((province) => (
//                                 <MenuItem key={province.id} value={province.id}>
//                                   {province.name}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </FormControl>
//                         </div>
//                         <div className="col col-xxl-3 col-xl-3 col-lg-6 col-md-4 col-12">
//                           <FormControl fullWidth variant="standard">
//                             <InputLabel id="demo-simple-select-standard-label">
//                               Quận/Huyện
//                             </InputLabel>
//                             <Select
//                               required
//                               labelId="demo-simple-select-standard-label"
//                               id="demo-simple-select-standard"
//                               value={districtId}
//                               disabled={
//                                 !districtList || districtList.length === 0
//                               }
//                               onChange={(e) => {
//                                 setDistrictId(parseInt(e.target.value + ''));
//                                 setWardId(null);
//                               }}
//                               // label="Tỉnh"
//                             >
//                               <MenuItem value="">
//                                 <em>None</em>
//                               </MenuItem>
//                               {districtList?.map((district) => (
//                                 <MenuItem key={district.id} value={district.id}>
//                                   {district.name}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </FormControl>
//                         </div>
//                         <div className="col col-xxl-3 col-xl-3 col-lg-6 col-md-4 col-12">
//                           <FormControl fullWidth variant="standard">
//                             <InputLabel id="demo-simple-select-standard-label">
//                               Phường/Xã
//                             </InputLabel>
//                             <Select
//                               required
//                               labelId="demo-simple-select-standard-label"
//                               id="demo-simple-select-standard"
//                               value={wardId}
//                               disabled={!wardList || wardList.length === 0}
//                               onChange={(e) =>
//                                 setWardId(parseInt(e.target.value + ''))
//                               }
//                               // label="Tỉnh"
//                             >
//                               <MenuItem value="">
//                                 <em>None</em>
//                               </MenuItem>
//                               {wardList?.map((ward) => (
//                                 <MenuItem key={ward.id} value={ward.id}>
//                                   {ward.name}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </FormControl>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>
//                 <div className="col col-xxl-12 col-12">
//                   <h2 className="mt-4">PHƯƠNG THỨC THANH TOÁN</h2>
//                   <FormControl>
//                     <RadioGroup
//                       aria-labelledby="demo-controlled-radio-buttons-group"
//                       name="controlled-radio-buttons-group"
//                       value={payment}
//                       onChange={handleChangePayment}
//                     >
//                       <div className="row">
//                         <div className="col col-xxl-6 col-xl-6 col-lg-6 col-sm-6 col-12">
//                           <FormControlLabel
//                             value={1}
//                             control={<Radio />}
//                             label={
//                               <div
//                                 style={{
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                 }}
//                               >
//                                 Thanh toán ngay khi nhận hàng
//                               </div>
//                             }
//                           />
//                         </div>
//                         <div className="col col-xxl-6 col-xl-6 col-lg-6 col-sm-6 col-12">
//                           <FormControlLabel
//                             value={2}
//                             control={<Radio />}
//                             label={
//                               <div
//                                 style={{
//                                   display: 'flex',
//                                   alignItems: 'center',
//                                 }}
//                               >
//                                 Thanh toán bằng ví điện tử VNPay
//                               </div>
//                             }
//                           />
//                         </div>
//                       </div>
//                     </RadioGroup>
//                   </FormControl>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-4 col-12">
//               <TextField
//                 className="w-100"
//                 id="standard-basic"
//                 label="Ghi chú"
//                 variant="standard"
//                 multiline
//                 minRows={3}
//                 maxRows={4}
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="container mt-5 rounded-3 p-0">
//             <h2 className="mb-3 mt-5">TỔNG KẾT ĐƠN HÀNG</h2>
//             <div className="row">
//               <div className="col col-xxl-4 col-12">
//                 <div className="confirm-information bg-light px-4 py-5 mt-3">
//                   <div className="d-flex align-items-center justify-content-between">
//                     <span>Thành tiền:</span>
//                     <span>
//                       <strong>
//                         {props.totalPriceProduct && (
//                           <FormatPrice price={props.totalPriceProduct} />
//                         )}
//                       </strong>
//                     </span>
//                   </div>
//                   <div className="d-flex align-items-center justify-content-between mt-3">
//                     <span>Phí giao hàng:</span>
//                     <span>
//                       <strong>
//                         {props.totalPriceProduct && <FormatPrice price={0} />}
//                       </strong>
//                     </span>
//                   </div>
//                   <hr className="my-3" />
//                   <div className="d-flex align-items-center justify-content-between">
//                     <span>
//                       <strong>Tổng cộng:</strong>
//                     </span>
//                     <span className="text-danger">
//                       <strong>
//                         {props.totalPriceProduct && (
//                           <FormatPrice price={props.totalPriceProduct} />
//                         )}
//                       </strong>
//                     </span>
//                   </div>
//                   <button
//                     className="confirm-information-btn btn w-100 py-2 mt-4"
//                     style={{
//                       fontSize: '1.4rem',
//                       background: '#3b71ca',
//                       color: '#fff',
//                     }}
//                     type="submit"
//                   >
//                     XÁC NHẬN THANH TOÁN
//                   </button>
//                   <div className="mt-4">
//                     Tech Hub hỗ trợ các phương thức thanh toán:
//                     <div className="confirm-information__payment-method d-flex gap-3 mt-2">
//                       <img
//                         src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713686301/cod_payment_owh4ih.png"
//                         alt=""
//                       />
//                       <img
//                         src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713686269/visa_payment_bbuee2.png"
//                         alt=""
//                       />
//                       <img
//                         src="https://res.cloudinary.com/dgdn13yur/image/upload/v1713686269/vnpay_payment_p5eiis.png"
//                         alt=""
//                       />
//                     </div>
//                   </div>
//                   <div className="col d-flex align-items-center mt-3">
//                     <span
//                       style={{ cursor: 'pointer' }}
//                       onClick={() => props.setIsCheckOut(false)}
//                     >
//                       <ArrowBackIcon />
//                       <strong className="ms-2">Quay về giỏ hàng</strong>
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="col col-xxl-8 col-12">
//                 {props.cartList.map((cartItem) => (
//                   <ProductCartProps
//                     key={cartItem.id}
//                     canChangeQuantity={false}
//                     handleRemoveProduct={null}
//                     cartItem={cartItem}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </form>
//       ) : (
//         <CheckOutSuccess />
//       )}
//     </>
//   );
// };

import React from 'react';

const CheckOut = () => {
  return <div>CheckOut</div>;
};

export default CheckOut;
