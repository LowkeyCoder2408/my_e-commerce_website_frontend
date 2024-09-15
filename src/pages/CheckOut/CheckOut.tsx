import {
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  TextareaAutosize,
} from '@mui/material';

import React, { FormEvent, useEffect, useState } from 'react';
import styles from './scss/CheckOut.module.scss';
import CartItemModel from '../../models/CartItemModel';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { backendEndpoint } from '../../utils/Service/Constant';
import WardModel from '../../models/WardModel';
import ProvinceModel from '../../models/ProvinceModel';
import DistrictModel from '../../models/DistrictModel';
import classNames from 'classnames/bind';
import { CheckoutSuccess } from './components/CheckOutSuccess';
import { getUserIdByToken } from '../../utils/Service/JwtService';
import ConfirmedInformation from '../ShoppingCart/components/ConfirmedInformation';
import CartItemList from '../ShoppingCart/components/CartItemList';
import AddressModel from '../../models/AddressModel';
import { getUserById } from '../../api/UserAPI';
import { getAllProvinces } from '../../api/ProvinceAPI';
import { getAllDistrictsByProvinceName } from '../../api/DistrictAPI';
import { getAllWardsByProvinceAndDistrict } from '../../api/WardAPI';

const cx = classNames.bind(styles);

interface CheckOutProps {
  isCheckOut: boolean;
  setIsCheckOut: any;
  cartItems: CartItemModel[];
  totalPriceProduct: number;
  isBuyNow?: boolean;
}

export const CheckOut: React.FC<CheckOutProps> = (props) => {
  const userId = getUserIdByToken();
  // const { setCartList, setTotalCart } = useCartItem();

  const navigation = useNavigate();

  // Lấy dữ liệu của người dùng lên
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // Xử lý địa chỉ giao hàng
  const [address, setAddress] = useState<AddressModel | null>(null);
  const [addressLine, setAddressLine] = useState('');

  const [provinces, setProvinces] = useState<ProvinceModel[]>([]);
  const [provinceName, setProvinceName] = useState<string>('');

  const [districts, setDistricts] = useState<DistrictModel[]>([]);
  const [districtName, setDistrictName] = useState<string>('');

  const [wards, setWards] = useState<WardModel[]>([]);
  const [wardName, setWardName] = useState<string>('');

  const [isDefaultAddress, setIsDefaultAddress] = useState<boolean>(false);
  const [isUseDefaultAddress, setIsUseDefaultAddress] =
    useState<boolean>(false);

  // Xử lý phương thức thanh toán
  const [isSuccessPayment, setIsSuccessPayment] = useState(false);
  const [payment, setPayment] = React.useState(1);

  // Xử lý ghi chú
  const [note, setNote] = useState('');

  useEffect(() => {
    console.log({ addressLine, provinceName, districtName, wardName });
  }, [addressLine, provinceName, districtName, wardName]);

  useEffect(() => {
    Promise.all([getUserById(userId), getAllProvinces()])

      .then(([userResult, provincesResult]) => {
        // User handle
        // setUser(result);
        setFullName(userResult.firstName + ' ' + userResult.lastName);
        setPhoneNumber(userResult.phoneNumber);
        setEmail(userResult.email);
        // Address handle
        setProvinces(provincesResult);
      })
      .catch((error) => {
        console.log(error);
      });
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
  }, [districtName]);

  // useEffect(() => {
  //   getDefaultAddressByIdUser(userId).then((result) => {
  //     console.log(result.address);
  //     setAddress(result.address);
  //   });
  // }, [user]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const [provinceResult, districtResult, wardResult] = await Promise.all([
  //       getProvinceByAddressId(address?.id),
  //       getDistrictByAddressId(address?.id),
  //       getWardByAddressId(address?.id),
  //     ]);

  //     if (provinceResult?.name !== undefined) {
  //       setProvinceName(provinceResult.name);
  //     } else {
  //       setProvinceName('');
  //     }

  //     if (districtResult?.name !== undefined) {
  //       setDistrictName(districtResult.name);
  //     } else {
  //       setDistrictName('');
  //     }

  //     if (wardResult?.name !== undefined) {
  //       setWardName(wardResult.name);
  //     } else {
  //       setWardName('');
  //     }

  //     if (isUseDefaultAddress) {
  //       if (provinceResult?.id !== undefined) {
  //         setProvinceId(provinceResult.id);
  //       }

  //       if (districtResult?.id !== undefined) {
  //         setDistrictId(districtResult.id);
  //       }

  //       if (wardResult?.id !== undefined) {
  //         setWardId(wardResult.id);
  //       }

  //       if (address?.addressLine !== undefined) {
  //         setAddressLine(address?.addressLine);
  //       }
  //     }
  //   };
  //   fetchData();
  // }, [address, isDefaultAddress, isUseDefaultAddress]);

  // Báo lỗi
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');

  const handleChangePayment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayment(parseInt((event.target as HTMLInputElement).value));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = localStorage.getItem('token');

    if (
      addressLine === '' ||
      provinceName === '' ||
      districtName === '' ||
      wardName === ''
    ) {
      toast.error('Bạn chưa điền đầy đủ thông thông tin!');
      return;
    }
    const productRequest: any[] = [];

    props.cartItems.forEach((cartItem) => {
      productRequest.push({
        product: cartItem.product,
        quantity: cartItem.quantity,
      });
    });

    const request = {
      addressLine: addressLine,
      payment: payment,
      idPayment: payment,
      districtName: districtName,
      // email: user?.email,
      fullName: fullName,
      note: note,
      phoneNumber: phoneNumber,
      provinceName: provinceName,
      total: props.totalPriceProduct,
      wardName: wardName,
      userId: getUserIdByToken(),
      product: productRequest,
      isDefaultAddress: isDefaultAddress,
      isUseDefaultAddress: isUseDefaultAddress,
    };

    // Khi thanh toán bằng vnpay
    if (payment === 2) {
      try {
        const response = await fetch(
          backendEndpoint +
            '/payment/create-payment?amount=' +
            props.totalPriceProduct,
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

  // Hàm check số điện thoại có đúng định dạng không
  const checkPhoneNumber = (setErrorPhoneNumber: any, phoneNumber: string) => {
    const phoneNumberRegex = /^(0[1-9]|84[1-9])[0-9]{8}$/;
    if (phoneNumber.trim() === '') {
      return false;
    } else if (!phoneNumberRegex.test(phoneNumber.trim())) {
      setErrorPhoneNumber('Số điện thoại không đúng định dạng');
      return true;
    } else {
      setErrorPhoneNumber('');
      return false;
    }
  };

  const handleSaveOrder = (request: any, isPayNow?: boolean) => {
    const token = localStorage.getItem('token');
    fetch(backendEndpoint + '/order/add-order', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(request),
    })
      .then((response) => {
        localStorage.removeItem('cart');
        if (!isPayNow) {
          setIsSuccessPayment(true);
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

  return (
    <>
      {!isSuccessPayment ? (
        <>
          <div className="default-title mb-3 mt-4">THÔNG TIN GIAO HÀNG</div>
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="bg-white rounded-4 p-5">
              <div className="container p-0">
                <div className="row">
                  <div className="mb-4 col-xxl-4 col-xl-4 col-lg-4 col-12">
                    <TextField
                      required
                      fullWidth
                      type="text"
                      id="standard-required"
                      label="Họ và tên"
                      value={fullName}
                      variant="standard"
                      onChange={(e) => setFullName(e.target.value)}
                      className="input-field"
                      InputLabelProps={{
                        style: { fontSize: '1.5rem' },
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '1.6rem',
                          fontWeight: '500',
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
                      type="text"
                      variant="standard"
                      label="Email"
                      value={email}
                      className="input-field"
                      InputLabelProps={{
                        style: { fontSize: '1.5rem' },
                      }}
                      sx={{
                        '& .MuiInputBase-input': {
                          fontSize: '1.6rem',
                          fontWeight: '500',
                        },
                      }}
                    />
                  </div>
                  <div className="col col-xxl-12 col-12">
                    <div className="default-title mt-3">ĐỊA CHỈ NHẬN HÀNG</div>
                    <div className="row">
                      {address && (
                        <div className="col col-6">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={isUseDefaultAddress}
                                onChange={() => {
                                  setIsUseDefaultAddress(!isUseDefaultAddress);
                                }}
                              />
                            }
                            label={`Sử dụng địa chỉ mặc định (${
                              address?.addressLine +
                              ', ' +
                              wardName +
                              ', ' +
                              districtName +
                              ', ' +
                              provinceName +
                              ')'
                            }`}
                          />
                        </div>
                      )}

                      {isUseDefaultAddress === false && (
                        <>
                          <div className="mt-1 mb-4 col-12">
                            <TextField
                              required
                              fullWidth
                              type="text"
                              id="standard-required"
                              label="Địa chỉ cụ thể/Số nhà"
                              // defaultValue={addressLine}
                              value={addressLine}
                              variant="standard"
                              onChange={(e) => setAddressLine(e.target.value)}
                              className="input-field"
                              InputLabelProps={{
                                style: { fontSize: '1.5rem' },
                              }}
                              sx={{
                                '& .MuiInputBase-input': {
                                  fontSize: '1.6rem',
                                  fontWeight: '500',
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
                                <MenuItem value="Chưa chọn tỉnh/thành">
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
                                value={districtName}
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
                                <MenuItem value="Chưa chọn huyện/quận">
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
                                value={wardName}
                                disabled={!wards || wards.length === 0}
                                onChange={(e) =>
                                  setWardName(e.target.value + '')
                                }
                                // label="Tỉnh"
                                sx={{
                                  '& .MuiSelect-select': {
                                    fontSize: '1.6rem',
                                    fontWeight: '500',
                                  },
                                }}
                              >
                                <MenuItem value="Chưa chọn xã/phường">
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
                          <div
                            className={`mt-4 col ${address ? 'col-6' : 'col-12'}`}
                          >
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={isDefaultAddress}
                                  onChange={() => {
                                    console.log(!isDefaultAddress);
                                    setIsDefaultAddress(!isDefaultAddress);
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
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={payment}
                        onChange={handleChangePayment}
                      >
                        <div className="row mt-2">
                          <div className="col col-12">
                            <FormControlLabel
                              value={1}
                              control={<Radio />}
                              label={
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '1.4rem',
                                  }}
                                >
                                  Thanh toán ngay khi nhận hàng
                                </div>
                              }
                            />
                          </div>
                          <div className="col col-12">
                            <FormControlLabel
                              value={2}
                              control={<Radio />}
                              label={
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: '1.4rem',
                                  }}
                                >
                                  Thanh toán bằng ví điện tử VNPay
                                </div>
                              }
                            />
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                  </div>
                </div>
              </div>
              <div className="mt-4 col-12">
                {/* <TextField
                  className="w-100"
                  id="standard-basic"
                  label="Ghi chú"
                  variant="standard"
                  multiline
                  minRows={3}
                  maxRows={4}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                /> */}
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
            </div>
            <div className="container mt-5 rounded-3 p-0">
              <div className="row">
                <ConfirmedInformation
                  isCheckOut={props.isCheckOut}
                  setIsCheckOut={props.setIsCheckOut}
                  totalPriceProduct={props.totalPriceProduct}
                />
                <CartItemList canChangeQuantity={false} />
              </div>
            </div>
          </form>
        </>
      ) : (
        <CheckoutSuccess />
      )}
    </>
  );
};
