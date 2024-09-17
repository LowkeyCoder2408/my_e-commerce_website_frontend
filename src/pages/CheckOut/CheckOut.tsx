import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  TextareaAutosize,
} from '@mui/material';

import React, { FormEvent, useEffect, useState } from 'react';
import styles from './scss/CheckOut.module.scss';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { backendEndpoint } from '../../utils/Service/Constant';
import WardModel from '../../models/WardModel';
import ProvinceModel from '../../models/ProvinceModel';
import DistrictModel from '../../models/DistrictModel';
import classNames from 'classnames/bind';
import { getUserIdByToken } from '../../utils/Service/JwtService';
import ConfirmedInformation from '../ShoppingCart/components/ConfirmedInformation';
import CartItemList from '../ShoppingCart/components/CartItemList';
import AddressModel from '../../models/AddressModel';
import { getUserById } from '../../api/UserAPI';
import { getAllProvinces } from '../../api/ProvinceAPI';
import { getAllDistrictsByProvinceName } from '../../api/DistrictAPI';
import { getAllWardsByProvinceAndDistrict } from '../../api/WardAPI';
import { getDefaultAddressByUserId } from '../../api/AddressAPI';
import { useCartItems } from '../../utils/Context/CartItemContext';
import ProductModel from '../../models/ProductModel';
import { useAuth } from '../../utils/Context/AuthContext';
import { getProductById } from '../../api/ProductAPI';
import BuyNowProductInformation from './components/BuyNowProductInformation';

const cx = classNames.bind(styles);

interface CheckOutProps {
  isBuyNow?: boolean;
}

const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
console.log(SpeechRecognition);

export const CheckOut: React.FC<CheckOutProps> = (props) => {
  const token = localStorage.getItem('token');
  const storedProduct = localStorage.getItem('buy_now_product');

  const userId = getUserIdByToken();
  const navigation = useNavigate();

  const { cartItems } = useCartItems();
  const { isLoggedIn } = useAuth();

  const [buyNowProduct, setBuyNowProduct] = useState<ProductModel | null>(null);

  // Lấy dữ liệu của người dùng lên
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // Xử lý địa chỉ giao hàng
  const [defaultAddress, setDefaultAddress] = useState<AddressModel | null>(
    null,
  );
  const [addressLine, setAddressLine] = useState('');

  const [provinces, setProvinces] = useState<ProvinceModel[]>([]);
  const [provinceName, setProvinceName] = useState<string>('');

  const [districts, setDistricts] = useState<DistrictModel[]>([]);
  const [districtName, setDistrictName] = useState<string>('');

  const [wards, setWards] = useState<WardModel[]>([]);
  const [wardName, setWardName] = useState<string>('');

  const [isSetDefaultAddress, setIsSetDefaultAddress] =
    useState<boolean>(false);
  const [isUseDefaultAddress, setIsUseDefaultAddress] =
    useState<boolean>(false);

  // Xử lý phương thức thanh toán
  // const [isSuccessPayment, setIsSuccessPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<number>(1);

  // Xử lý ghi chú
  const [note, setNote] = useState('');

  // Báo lỗi
  const [errorFullName, setErrorFullName] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorAddressLine, setErrorAddressLine] = useState('');

  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let total;
    if (buyNowProduct) {
      total = (buyNowProduct.currentPrice || 0) * (buyNowProduct.quantity ?? 1);
    } else {
      total = cartItems.reduce((totalPrice, cartItem) => {
        const itemQuantity = cartItem.quantity ?? 0;
        const itemPrice = cartItem.product?.currentPrice ?? 0;
        return totalPrice + itemQuantity * itemPrice;
      }, 0);
    }

    setTotalPrice(total);
  }, [cartItems, buyNowProduct]);

  useEffect(() => {
    console.log({
      fullName,
      phoneNumber,
      defaultAddress,
      addressLine,
      provinceName,
      districtName,
      wardName,
      isSetDefaultAddress,
      paymentMethod,
      note,
      buyNowProduct,
    });
  }, [
    fullName,
    phoneNumber,
    defaultAddress,
    addressLine,
    provinceName,
    districtName,
    wardName,
    isSetDefaultAddress,
    paymentMethod,
    note,
    buyNowProduct,
  ]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation('/login');
    } else {
      if (userId) {
        Promise.all([
          getUserById(userId),
          getAllProvinces(),
          getDefaultAddressByUserId(userId),
          storedProduct &&
            getProductById(JSON.parse(storedProduct).buyNowProductId),
        ])

          .then(
            ([
              userResult,
              provincesResult,
              defaultAddressResult,
              productResult,
            ]) => {
              // User handle
              setFullName(userResult.firstName + ' ' + userResult.lastName);
              setPhoneNumber(userResult.phoneNumber);
              setEmail(userResult.email);
              setDefaultAddress(defaultAddressResult);
              setAddressLine(defaultAddressResult?.addressLine || '');
              setProvinceName(defaultAddressResult?.province || '');
              setDistrictName(defaultAddressResult?.district || '');
              setWardName(defaultAddressResult?.ward || '');
              // Address handle
              setProvinces(provincesResult);
              if (
                storedProduct &&
                productResult &&
                typeof productResult !== 'string'
              ) {
                const updatedProduct = {
                  ...productResult,
                  quantity: parseInt(JSON.parse(storedProduct).quantityToBuy),
                };
                setBuyNowProduct(updatedProduct);
              } else {
                setBuyNowProduct(null);
              }
            },
          )
          .catch((error) => {
            console.log(error);
          });
        return () => {
          localStorage.removeItem('buy_now_product');
        };
      }
    }
  }, []);

  useEffect(() => {
    if (provinceName !== '') {
      getAllDistrictsByProvinceName(provinceName)
        .then((districtsResult) => {
          setDistricts(districtsResult);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [provinceName]);

  useEffect(() => {
    if (provinceName !== '' && districtName !== '') {
      getAllWardsByProvinceAndDistrict(provinceName, districtName)
        .then((wardsResult: WardModel[]) => {
          setWards(wardsResult);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [provinceName, districtName]);

  useEffect(() => {
    if (isUseDefaultAddress) {
      setAddressLine(defaultAddress?.addressLine || '');
      setProvinceName(defaultAddress?.province || '');
      setDistrictName(defaultAddress?.district || '');
      setWardName(defaultAddress?.ward || '');
    }
  }, [isUseDefaultAddress]);

  // Hàm check có đúng định dạng không
  const checkEmpty = (setErrorFunction: any, content: string) => {
    if (content.trim() === '') {
      setErrorFunction('Trường này không được để trống');
      return true;
    } else {
      setErrorFunction('');
      return false;
    }
  };

  const checkPhoneNumber = (setErrorPhoneNumber: any, phoneNumber: string) => {
    const phoneNumberRegex = /^(0[1-9]|84[1-9])[0-9]{8}$/;
    if (phoneNumber.trim() === '') {
      setErrorPhoneNumber('Số điện thoại không được để trống');
      return true;
    } else if (!phoneNumberRegex.test(phoneNumber.trim())) {
      setErrorPhoneNumber('Số điện thoại không đúng định dạng');
      return true;
    } else {
      setErrorPhoneNumber('');
      return false;
    }
  };

  const checkEmail = (setErrorEmail: any, email: string) => {
    const emailRegex =
      /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\w-]+(?:\.[\w-]+)*|\[(?:\d{1,3}\.){3}\d{1,3}\])$/;
    if (email.trim() === '') {
      setErrorEmail('Email không được để trống');
      return true;
    } else if (!emailRegex.test(email.trim())) {
      setErrorEmail('Email không đúng định dạng');
      return true;
    } else {
      setErrorEmail('');
      return false;
    }
  };

  const handleSaveOrder = (request: any, isPayNow?: boolean) => {
    fetch(backendEndpoint + '/order/add-order', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        if (!isPayNow) {
          // setIsSuccessPayment(true);
        }
        if (!props.isBuyNow) {
          // setCartList([]);
          // setTotalCart(0);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    const request = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      addressLine: addressLine,
      provinceName: provinceName,
      districtName: districtName,
      wardName: wardName,
      isSetDefaultAddress: isSetDefaultAddress,
      paymentMethod: paymentMethod,
      note: note,
      totalPrice: totalPrice,
      userId: userId,
      ...(buyNowProduct ? { buyNowProductId: buyNowProduct.id } : {}),
      ...(!buyNowProduct
        ? { cartItemIds: cartItems.map((item) => item.id) }
        : {}),
    };

    console.log(request);

    // Khi thanh toán bằng VNPay
    if (paymentMethod === 2) {
      try {
        const response = await fetch(
          backendEndpoint + '/payment/create-payment?amount=' + totalPrice,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'content-type': 'application/json',
            },
          },
        );
        if (!response.ok) {
          throw new Error(`HTTP error is: ${response.status}`);
        }
        const paymentUrl = await response.text();

        window.location.replace(paymentUrl);
        // Lưu order vào DB ngay khi thanh toán thành công
        const isPayNow = true;
        handleSaveOrder(request, isPayNow);
      } catch (error) {
        console.log(error);
      }
    } else {
      // Khi admin cập nhật trạng thái nhận hàng sẽ thêm vào DB
      handleSaveOrder(request);
    }
  }

  return (
    <>
      {/* {!isSuccessPayment ? ( */}
      <>
        <form onSubmit={handleSubmitForm} className="container mt-5">
          <div className="bg-white rounded-4 p-5">
            <div className="container p-0">
              <div className="default-title mb-3">THÔNG TIN GIAO HÀNG</div>

              <div className="row">
                <div className="mb-4 col-xxl-4 col-xl-4 col-lg-4 col-12">
                  <TextField
                    required
                    fullWidth
                    helperText={errorFullName}
                    type="text"
                    id="standard-required"
                    label="Họ và tên"
                    value={fullName}
                    error={errorFullName.length > 0}
                    variant="standard"
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={(e: any) => {
                      checkEmpty(setErrorFullName, e.target.value);
                    }}
                    className="input-field"
                    InputLabelProps={{
                      style: { fontSize: '1.5rem' },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '1.6rem',
                        fontWeight: '500',
                      },
                      '& .MuiFormHelperText-root': {
                        fontSize: '1rem',
                      },
                    }}
                  />
                </div>
                <div className="mb-4 col-xxl-4 col-xl-4 col-lg-4 col-12">
                  <TextField
                    error={errorPhoneNumber.length > 0}
                    helperText={errorPhoneNumber}
                    required={true}
                    fullWidth
                    type="text"
                    label="Số điện thoại"
                    variant="standard"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    onBlur={(e: any) => {
                      checkPhoneNumber(setErrorPhoneNumber, e.target.value);
                    }}
                    className="input-field"
                    InputLabelProps={{
                      style: { fontSize: '1.5rem' },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '1.6rem',
                        fontWeight: '500',
                      },
                      '& .MuiFormHelperText-root': {
                        fontSize: '1rem',
                      },
                    }}
                  />
                </div>
                <div className="mb-4 col-xxl-4 col-xl-4 col-lg-4 col-12">
                  <TextField
                    disabled
                    fullWidth
                    helperText={errorEmail}
                    type="text"
                    variant="standard"
                    label="Email"
                    value={email}
                    className="input-field"
                    error={errorEmail.length > 0}
                    onBlur={(e: any) => {
                      checkEmail(setErrorEmail, e.target.value);
                    }}
                    InputLabelProps={{
                      style: { fontSize: '1.5rem' },
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '1.6rem',
                        fontWeight: '500',
                      },
                      '& .MuiFormHelperText-root': {
                        fontSize: '1rem',
                      },
                    }}
                  />
                </div>
                <div className="col col-xxl-12 col-12">
                  <div className="default-title mt-3">ĐỊA CHỈ NHẬN HÀNG</div>
                  <div className="row">
                    {defaultAddress && (
                      <div className="col col-12">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={isUseDefaultAddress}
                              onChange={() => {
                                setIsUseDefaultAddress(!isUseDefaultAddress);
                                setIsSetDefaultAddress(false);
                              }}
                            />
                          }
                          label={`Sử dụng địa chỉ mặc định (${
                            defaultAddress?.addressLine +
                            ', ' +
                            defaultAddress.ward +
                            ', ' +
                            defaultAddress.district +
                            ', ' +
                            defaultAddress.province +
                            ')'
                          }`}
                          sx={{
                            '& .MuiFormControlLabel-label': {
                              fontSize: '1.4rem',
                            },
                          }}
                        />
                      </div>
                    )}

                    {isUseDefaultAddress === false && (
                      <>
                        <div className="mt-1 mb-4 col-12">
                          <TextField
                            required
                            fullWidth
                            helperText={errorAddressLine}
                            error={errorAddressLine.length > 0}
                            type="text"
                            id="standard-required"
                            label="Địa chỉ cụ thể/Số nhà"
                            value={addressLine}
                            variant="standard"
                            onChange={(e) => setAddressLine(e.target.value)}
                            className="input-field"
                            onBlur={() =>
                              checkEmpty(setErrorAddressLine, addressLine)
                            }
                            InputLabelProps={{
                              style: { fontSize: '1.5rem' },
                            }}
                            sx={{
                              '& .MuiInputBase-input': {
                                fontSize: '1.6rem',
                                fontWeight: '500',
                              },
                              '& .MuiFormHelperText-root': {
                                fontSize: '1rem',
                              },
                            }}
                          />
                        </div>
                        <div className="col col-xxl-4 col-xl-4 col-lg-6 col-md-4 col-12 mt-3">
                          <FormControl fullWidth variant="standard">
                            <InputLabel
                              id="demo-simple-select-standard-label"
                              sx={{ fontSize: '1.5rem' }}
                            >
                              Tỉnh/Thành phố
                            </InputLabel>
                            <Select
                              required
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              variant="standard"
                              value={provinceName}
                              onChange={(e) => {
                                setProvinceName(e.target.value + '');
                                setDistrictName('');
                                setWardName('');
                                setWards([]);
                              }}
                              sx={{
                                '& .MuiSelect-select': {
                                  fontSize: '1.6rem',
                                  fontWeight: '500',
                                },
                              }}
                            >
                              <MenuItem value="">
                                <em>Chưa chọn tỉnh/thành</em>
                              </MenuItem>
                              {provinces.map((province) => (
                                <MenuItem
                                  key={province.id}
                                  value={province.name}
                                >
                                  {province.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col col-xxl-4 col-xl-4 col-lg-6 col-md-4 col-12 mt-3">
                          <FormControl fullWidth variant="standard">
                            <InputLabel
                              id="demo-simple-select-standard-label"
                              sx={{ fontSize: '1.5rem' }}
                            >
                              Huyện/Quận
                            </InputLabel>
                            <Select
                              required
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              value={
                                districts.find(
                                  (district) => district.name === districtName,
                                )
                                  ? districtName
                                  : ''
                              }
                              disabled={!districts || districts.length === 0}
                              onChange={(e) => {
                                setDistrictName(e.target.value + '');
                                setWardName('');
                              }}
                              sx={{
                                '& .MuiSelect-select': {
                                  fontSize: '1.6rem',
                                  fontWeight: '500',
                                },
                              }}
                            >
                              <MenuItem value="">
                                <em>Chưa chọn huyện/quận</em>
                              </MenuItem>
                              {districts.map((district) => (
                                <MenuItem
                                  key={district.id}
                                  value={district.name}
                                >
                                  {district.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className="col col-xxl-4 col-xl-4 col-lg-6 col-md-4 col-12 mt-3">
                          <FormControl fullWidth variant="standard">
                            <InputLabel
                              id="demo-simple-select-standard-label"
                              sx={{
                                fontSize: '1.5rem',
                              }}
                            >
                              Xã/Phường
                            </InputLabel>
                            <Select
                              required
                              labelId="demo-simple-select-standard-label"
                              id="demo-simple-select-standard"
                              value={
                                wards.find((ward) => ward.name === wardName)
                                  ? wardName
                                  : ''
                              }
                              disabled={!wards || wards.length === 0}
                              onChange={(e) => setWardName(e.target.value + '')}
                              // label="Tỉnh"
                              sx={{
                                '& .MuiSelect-select': {
                                  fontSize: '1.6rem',
                                  fontWeight: '500',
                                },
                              }}
                            >
                              <MenuItem value="">
                                <em>Chưa chọn xã/phường</em>
                              </MenuItem>
                              {wards.map((ward) => (
                                <MenuItem key={ward.id} value={ward.name}>
                                  {ward.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                        <div className={`mt-4 col col-12}`}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isSetDefaultAddress}
                                onChange={() => {
                                  setIsSetDefaultAddress(!isSetDefaultAddress);
                                }}
                              />
                            }
                            label="Đặt làm địa chỉ mặc định"
                            sx={{
                              '& .MuiFormControlLabel-label': {
                                fontSize: '1.4rem',
                              },
                            }}
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="col col-xxl-12 col-12 mt-4">
                  <div className="default-title">PHƯƠNG THỨC THANH TOÁN</div>
                  <div className="row">
                    <div className="col col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mt-4">
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setPaymentMethod(1)}
                        style={{
                          backgroundColor: '#fff',
                          color: 'rgb(15, 98, 172)',
                          fontSize: '1.3rem',
                          border:
                            paymentMethod === 1
                              ? '2px solid rgb(15, 98, 172)'
                              : '2px solid #fff',
                        }}
                      >
                        Thanh toán khi nhận hàng
                      </Button>
                    </div>
                    <div className="col col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mt-4">
                      <Button
                        fullWidth
                        variant="contained"
                        endIcon={
                          <img
                            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1726507527/zfc3ehtwo9x4eesh9x8s.png"
                            alt="delete"
                            style={{ width: '35px', height: '13px' }}
                          />
                        }
                        onClick={() => setPaymentMethod(2)}
                        style={{
                          backgroundColor: '#fff',
                          color: 'rgb(15, 98, 172)',
                          fontSize: '1.3rem',
                          border:
                            paymentMethod === 2
                              ? '2px solid rgb(15, 98, 172)'
                              : '2px solid #fff',
                        }}
                      >
                        Thanh toán bằng ví điện tử
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-5 col-12">
              <TextareaAutosize
                className="w-100"
                id="standard-basic"
                placeholder="Ghi chú"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={300}
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: '20px',
                  borderRadius: '5px',
                }}
              />
            </div>
            <div className="mt-4">
              <Button
                fullWidth
                variant="contained"
                type="submit"
                onClick={() => setPaymentMethod(1)}
                disabled={
                  errorFullName.length > 0 ||
                  errorPhoneNumber.length > 0 ||
                  errorEmail.length > 0 ||
                  errorAddressLine.length > 0 ||
                  provinceName.trim() === '' ||
                  districtName.trim() === '' ||
                  wardName.trim() === '' ||
                  (paymentMethod !== 1 && paymentMethod !== 2)
                }
                style={{
                  fontSize: '1.4rem',
                }}
              >
                {paymentMethod === 1 ? (
                  <>Thiết lập đơn hàng</>
                ) : (
                  <>Thiết lập đơn hàng và thanh toán</>
                )}
              </Button>
            </div>
          </div>
          <div className="container mt-5 rounded-3 p-0">
            <div className="row">
              <ConfirmedInformation totalPrice={totalPrice} isCheckOut={true} />
              {!buyNowProduct ? (
                <CartItemList canChangeQuantity={false} />
              ) : (
                <BuyNowProductInformation product={buyNowProduct} />
              )}
            </div>
          </div>
        </form>
      </>
      {/* ) : ( */}
      {/* <CheckOutSuccess /> */}
      {/* )} */}
    </>
  );
};
