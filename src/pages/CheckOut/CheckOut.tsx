import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  TextareaAutosize,
} from '@mui/material';

import { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { backendEndpoint } from '../../utils/Service/Constant';
import WardModel from '../../models/WardModel';
import ProvinceModel from '../../models/ProvinceModel';
import DistrictModel from '../../models/DistrictModel';
import {
  getUserIdByToken,
  isTokenExpired,
} from '../../utils/Service/JwtService';
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
import DeliveryMethodModel from '../../models/DeliveryMethodModel';
import { getAllDeliveryMethods } from '../../api/DeliveryMethodAPI';
import VNPayBankCard from './components/VNPayBankCard';
import { toast } from 'react-toastify';
import { handleSaveOrder } from '../../api/OrderAPI';
import { CheckOutSuccess } from './components/CheckOutSuccess';

export const CheckOut = () => {
  const location = useLocation();

  const token = localStorage.getItem('token');
  const storedProduct = localStorage.getItem('buy_now_product');

  const userId = getUserIdByToken();
  const navigate = useNavigate();

  const { cartItems, fetchCartItems } = useCartItems();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [isSuccessPayment, setIsSuccessPayment] = useState<boolean>(false);

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
  const [paymentMethod, setPaymentMethod] = useState<string>('COD');
  const [totalPriceProduct, setTotalPriceProduct] = useState(0);
  const [deliveryMethods, setDeliveryMethods] = useState<DeliveryMethodModel[]>(
    [],
  );
  const [deliveryFee, setDeliveryFee] = useState<number>(0);
  const [deliveryMethod, setDeliveryMethod] = useState<string>('');

  // Xử lý ghi chú
  const [note, setNote] = useState('');

  // Báo lỗi
  const [errorFullName, setErrorFullName] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorAddressLine, setErrorAddressLine] = useState('');

  useEffect(() => {
    let total;
    if (buyNowProduct) {
      total = (buyNowProduct.currentPrice || 0) * (buyNowProduct.quantity ?? 1);
    } else {
      total = cartItems.reduce((price, cartItem) => {
        const itemQuantity = cartItem.quantity ?? 0;
        const itemPrice = cartItem.product?.currentPrice ?? 0;
        return price + itemQuantity * itemPrice;
      }, 0);
    }

    setTotalPriceProduct(total);
  }, [cartItems, buyNowProduct]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
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
              setFullName(userResult.lastName + ' ' + userResult.firstName);
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

        getAllDeliveryMethods()
          .then((result) => {
            setDeliveryMethods(result);
            if (result.length > 0) {
              setDeliveryFee(result[0].deliveryFee);
              setDeliveryMethod(result[0].name);
            }
          })
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

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để thêm vào giỏ hàng');
      navigate('/login', { state: { from: location } });
      return;
    }

    if (isTokenExpired()) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      toast.error(
        'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục',
      );
      navigate('/login', { state: { from: location } });
      return;
    }

    const request = {
      userId: userId,
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      addressLine: addressLine,
      provinceName: provinceName,
      districtName: districtName,
      wardName: wardName,
      isUseDefaultAddress: isUseDefaultAddress,
      isSetDefaultAddress: isSetDefaultAddress,
      deliveryMethod: deliveryMethod,
      deliveryFee: deliveryFee,
      paymentMethod: paymentMethod,
      note: note,
      ...(buyNowProduct ? { buyNowProductId: buyNowProduct.id } : {}),
      ...(buyNowProduct
        ? { buyNowProductQuantity: buyNowProduct.quantity }
        : {}),
      ...(!buyNowProduct
        ? { cartItemIds: cartItems.map((item) => item.id) }
        : {}),
    };

    if (paymentMethod === 'VNPay') {
      try {
        const response = await fetch(
          backendEndpoint +
            `/vn-pay/create-payment?amount=${totalPriceProduct + deliveryFee}`,
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

        window.location.href = paymentUrl;
        localStorage.removeItem('order_request');
        localStorage.setItem('order_request', JSON.stringify(request));
      } catch (error) {
        console.log(error);
      }
    } else {
      localStorage.removeItem('order_request');
      handleSaveOrder(request, fetchCartItems, setIsSuccessPayment);
    }
  }

  return (
    <>
      {' '}
      {!isSuccessPayment ? (
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
                  <div className="default-title">HÌNH THỨC GIAO HÀNG</div>
                  <div className="row">
                    {deliveryMethods.map((deliveryMethod, index) => (
                      <div
                        key={index}
                        className="col col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-12 mt-4"
                      >
                        <Button
                          fullWidth
                          variant="contained"
                          onClick={() => {
                            setDeliveryFee(deliveryMethod.deliveryFee);
                            setDeliveryMethod(deliveryMethod.name);
                          }}
                          style={{
                            textTransform: 'none',
                            backgroundColor: '#fff',
                            color: 'rgb(15, 98, 172)',
                            fontSize: '1.3rem',
                            border:
                              deliveryFee === deliveryMethod.deliveryFee
                                ? '2px solid rgb(15, 98, 172)'
                                : '2px solid #fff',
                          }}
                        >
                          {deliveryMethod.name.toUpperCase()} (
                          {deliveryMethod.deliveryFee.toLocaleString('vi-VN')}
                          đ)
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col col-xxl-12 col-12 mt-4">
                  <div className="default-title">PHƯƠNG THỨC THANH TOÁN</div>
                  <div className="row">
                    <div className="col col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12 mt-4">
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={() => setPaymentMethod('COD')}
                        style={{
                          backgroundColor: '#fff',
                          color: 'rgb(15, 98, 172)',
                          fontSize: '1.3rem',
                          border:
                            paymentMethod === 'COD'
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
                        onClick={() => setPaymentMethod('VNPay')}
                        style={{
                          backgroundColor: '#fff',
                          color: 'rgb(15, 98, 172)',
                          fontSize: '1.3rem',
                          border:
                            paymentMethod === 'VNPay'
                              ? '2px solid rgb(15, 98, 172)'
                              : '2px solid #fff',
                        }}
                      >
                        Thanh toán thông qua ví điện tử
                      </Button>
                    </div>
                  </div>
                  {paymentMethod === 'VNPay' && <VNPayBankCard />}
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
                disabled={
                  errorFullName.length > 0 ||
                  errorPhoneNumber.length > 0 ||
                  errorEmail.length > 0 ||
                  errorAddressLine.length > 0 ||
                  provinceName.trim() === '' ||
                  districtName.trim() === '' ||
                  wardName.trim() === '' ||
                  deliveryFee === 0 ||
                  (paymentMethod !== 'COD' && paymentMethod !== 'VNPay') ||
                  note.length > 300
                }
                style={{
                  fontSize: '1.4rem',
                }}
              >
                {paymentMethod === 'COD' ? (
                  <>Thiết lập đơn hàng</>
                ) : (
                  <>Thanh toán và thiết lập đơn hàng</>
                )}
              </Button>
            </div>
          </div>
          <div className="container mt-5 rounded-3 p-0">
            <div className="row">
              <ConfirmedInformation
                totalPriceProduct={totalPriceProduct}
                deliveryFee={deliveryFee}
                isCheckOut={true}
              />
              {!buyNowProduct ? (
                <CartItemList canChangeQuantity={false} />
              ) : (
                <BuyNowProductInformation product={buyNowProduct} />
              )}
            </div>
          </div>
        </form>
      ) : (
        <CheckOutSuccess />
      )}
    </>
  );
};
