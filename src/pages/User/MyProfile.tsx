import { useEffect, useState } from 'react';
import UserModel from '../../models/UserModel';
import { getUserById } from '../../api/UserAPI';
import { getUserIdByToken } from '../../utils/Service/JwtService';
import classNames from 'classnames/bind';
import styles from './scss/MyProfile.module.scss';
import { IconButton, TextField, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import SaveIcon from '@mui/icons-material/Save';
import ImageDisplay from '../../utils/ImageDisplay';
import { useAuth } from '../../utils/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loader from '../../utils/Loader';
import { getDefaultAddressByUserId } from '../../api/AddressAPI';
import { backendEndpoint } from '../../utils/Service/Constant';
import LoadingButton from '@mui/lab/LoadingButton';

const cx = classNames.bind(styles);

const MyProfile = () => {
  const userId = getUserIdByToken();
  const token = localStorage.getItem('token');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserModel | null>(null);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [defaultAddress, setDefaultAddress] = useState<string>('');

  // Báo lỗi
  const [errorFirstName, setErrorFirstName] = useState<string>('');
  const [errorLastName, setErrorLastName] = useState<string>('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState<string>('');

  // Disabled
  const [isFirstNameDisabled, setIsFirstNameDisabled] = useState<boolean>(true);
  const [isLastNameDisabled, setIsLastNameDisabled] = useState<boolean>(true);
  const [isPhoneNumberDisabled, setIsPhoneNumberDisabled] =
    useState<boolean>(true);

  // Save button
  const [canSave, setCanSave] = useState<boolean>(false);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const fetchUserInformation = async () => {
    try {
      const userResult = await getUserById(userId);
      setUser(userResult);
      setFirstName(userResult.firstName);
      setLastName(userResult.lastName);
      setPhoneNumber(userResult.phoneNumber);

      const defaultAddressResult = await getDefaultAddressByUserId(userId);
      if (defaultAddressResult) {
        setDefaultAddress(
          (defaultAddressResult.addressLine || '') +
            (defaultAddressResult.ward
              ? ', ' + defaultAddressResult.ward
              : '') +
            (defaultAddressResult.district
              ? ', ' + defaultAddressResult.district
              : '') +
            (defaultAddressResult.province
              ? ', ' + defaultAddressResult.province
              : ''),
        );
      } else {
        setDefaultAddress('Không có địa chỉ mặc định');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      if (userId) {
        fetchUserInformation();
      }
    }
  }, []);

  useEffect(() => {
    if (
      (firstName !== user?.firstName ||
        lastName !== user?.lastName ||
        phoneNumber !== user?.phoneNumber) &&
      errorFirstName === '' &&
      errorLastName === '' &&
      errorPhoneNumber === ''
    ) {
      setCanSave(true);
    } else {
      setCanSave(false);
    }
  }, [
    firstName,
    lastName,
    phoneNumber,
    errorFirstName,
    errorLastName,
    errorPhoneNumber,
  ]);

  useEffect(() => {
    console.log('Object: ', { firstName, lastName, phoneNumber });
    console.log('Error: ', { errorFirstName, errorLastName, errorPhoneNumber });
  }, [
    firstName,
    lastName,
    phoneNumber,
    errorFirstName,
    errorLastName,
    errorPhoneNumber,
  ]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (canSave) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [canSave]);

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
      setErrorPhoneNumber('Trường này không được để trống');
      return true;
    } else if (!phoneNumberRegex.test(phoneNumber.trim())) {
      setErrorPhoneNumber('Số điện thoại không đúng định dạng');
      return true;
    } else {
      setErrorPhoneNumber('');
      return false;
    }
  };

  const handleChangeInformation = async () => {
    setSubmitLoading(true);
    try {
      const response = await fetch(
        `${backendEndpoint}/users/change-information`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            lastName,
            firstName,
            phoneNumber,
          }),
        },
      );
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }

    fetchUserInformation();
  };

  if (!isLoggedIn) {
    return null;
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <div className="row">
        <div
          className={`col-xxl-3 col-xl-3 col-lg-4 col-12 mt-5 ${cx('my-profile__avatar')}`}
        >
          <ImageDisplay
            alt={`Ảnh đại diện của ${user?.firstName || ''} ${user?.lastName || ''}`}
            src={
              user?.photo ||
              'https://res.cloudinary.com/dgdn13yur/image/upload/v1710904428/avatar_sjugj8.png'
            }
            width={270}
            height={270}
          />
        </div>
        <div
          className={`col-xxl-9 col-xl-9 col-lg-8 col-12 mt-5 ${cx('my-profile__information')}`}
        >
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mt-2">
              <TextField
                disabled
                fullWidth
                type="text"
                id="standard-required"
                label="Mã người dùng"
                value={user?.id}
                variant="standard"
                className="input-field"
                InputLabelProps={{
                  style: {
                    fontSize: '1.7rem',
                    color: '#000 !important',
                  },
                }}
                InputProps={{
                  style: {
                    color: '#000 !important',
                  },
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '1.7rem',
                    fontWeight: '500',
                  },
                  '& .Mui-disabled': {
                    WebkitTextFillColor: '#000 !important',
                  },
                  '& .MuiFormHelperText-root': {
                    fontSize: '1rem',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottom: 'none !important',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottom: 'none',
                  },
                }}
              />
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mt-2">
              <TextField
                disabled
                fullWidth
                type="text"
                id="standard-required"
                label="Email"
                value={user?.email}
                variant="standard"
                className="input-field"
                InputLabelProps={{
                  style: {
                    fontSize: '1.7rem',
                    color: '#000 !important',
                  },
                }}
                InputProps={{
                  style: {
                    color: '#000 !important',
                  },
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '1.7rem',
                    fontWeight: '500',
                  },
                  '& .Mui-disabled': {
                    WebkitTextFillColor: '#000 !important',
                  },
                  '& .MuiFormHelperText-root': {
                    fontSize: '1rem',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottom: 'none !important',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottom: 'none',
                  },
                }}
              />
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mt-2">
              <TextField
                disabled={isLastNameDisabled}
                fullWidth
                helperText={errorLastName}
                type="text"
                id="standard-required"
                label="Họ"
                value={lastName}
                error={errorLastName.length > 0}
                variant="standard"
                onChange={(e) => {
                  setLastName(e.target.value);
                  checkEmpty(setErrorLastName, e.target.value);
                }}
                onBlur={(e: any) => {
                  checkEmpty(setErrorLastName, e.target.value);
                }}
                className="input-field"
                InputLabelProps={{
                  style: {
                    fontSize: '1.7rem',
                    color: '#000 !important',
                  },
                }}
                InputProps={{
                  style: {
                    color: '#000 !important',
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setIsLastNameDisabled(!isLastNameDisabled)
                        }
                      >
                        {isLastNameDisabled ? (
                          <EditIcon sx={{ color: '#1976d2' }} />
                        ) : (
                          <CheckIcon sx={{ color: '#1976d2' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '1.7rem',
                    fontWeight: '500',
                  },
                  '& .Mui-disabled': {
                    WebkitTextFillColor: '#000 !important',
                  },
                  '& .MuiFormHelperText-root': {
                    fontSize: '1rem',
                  },
                  ...(isLastNameDisabled
                    ? {
                        '& .MuiInput-underline:before': {
                          borderBottom: 'none !important',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottom: 'none',
                        },
                      }
                    : {
                        '& .MuiInput-underline:before': {
                          borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottom: '1px solid #000',
                        },
                      }),
                }}
              />
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mt-2">
              <TextField
                disabled={isFirstNameDisabled}
                fullWidth
                helperText={errorFirstName}
                type="text"
                id="standard-required"
                label="Tên"
                value={firstName}
                error={errorFirstName.length > 0}
                variant="standard"
                onChange={(e) => {
                  setFirstName(e.target.value);
                  checkEmpty(setErrorFirstName, e.target.value);
                }}
                onBlur={(e: any) => {
                  checkEmpty(setErrorFirstName, e.target.value);
                }}
                className="input-field"
                InputLabelProps={{
                  style: {
                    fontSize: '1.7rem',
                    color: '#000 !important',
                  },
                }}
                InputProps={{
                  style: {
                    color: '#000 !important',
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setIsFirstNameDisabled(!isFirstNameDisabled)
                        }
                      >
                        {isFirstNameDisabled ? (
                          <EditIcon sx={{ color: '#1976d2' }} />
                        ) : (
                          <CheckIcon sx={{ color: '#1976d2' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '1.7rem',
                    fontWeight: '500',
                  },
                  '& .Mui-disabled': {
                    WebkitTextFillColor: '#000 !important',
                  },
                  '& .MuiFormHelperText-root': {
                    fontSize: '1rem',
                  },
                  ...(isFirstNameDisabled
                    ? {
                        '& .MuiInput-underline:before': {
                          borderBottom: 'none !important',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottom: 'none',
                        },
                      }
                    : {
                        '& .MuiInput-underline:before': {
                          borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottom: '1px solid #000',
                        },
                      }),
                }}
              />
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mt-2">
              <TextField
                disabled={isPhoneNumberDisabled}
                fullWidth
                helperText={errorPhoneNumber}
                type="text"
                id="standard-required"
                label="Số điện thoại"
                value={phoneNumber}
                error={errorPhoneNumber.length > 0}
                variant="standard"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                  checkPhoneNumber(setErrorPhoneNumber, e.target.value);
                }}
                onBlur={(e: any) => {
                  checkPhoneNumber(setErrorPhoneNumber, e.target.value);
                }}
                className="input-field"
                InputLabelProps={{
                  style: {
                    fontSize: '1.7rem',
                    color: '#000 !important',
                  },
                }}
                InputProps={{
                  style: {
                    color: '#000 !important',
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setIsPhoneNumberDisabled(!isPhoneNumberDisabled)
                        }
                      >
                        {isPhoneNumberDisabled ? (
                          <EditIcon sx={{ color: '#1976d2' }} />
                        ) : (
                          <CheckIcon sx={{ color: '#1976d2' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '1.7rem',
                    fontWeight: '500',
                  },
                  '& .Mui-disabled': {
                    WebkitTextFillColor: '#000 !important',
                  },
                  '& .MuiFormHelperText-root': {
                    fontSize: '1rem',
                  },
                  ...(isPhoneNumberDisabled
                    ? {
                        '& .MuiInput-underline:before': {
                          borderBottom: 'none !important',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottom: 'none',
                        },
                      }
                    : {
                        '& .MuiInput-underline:before': {
                          borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
                        },
                        '& .MuiInput-underline:after': {
                          borderBottom: '1px solid #000',
                        },
                      }),
                }}
              />
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-12 mt-2">
              <TextField
                disabled
                fullWidth
                type="text"
                id="standard-required"
                label="Vai trò"
                value={
                  user?.roles
                    ? user.roles.length > 1
                      ? `${user.roles.slice(0, -1).join(', ')} và ${user.roles[user.roles.length - 1]}`
                      : user.roles[0]
                    : ''
                }
                variant="standard"
                className="input-field"
                InputLabelProps={{
                  style: {
                    fontSize: '1.7rem',
                    color: '#000 !important',
                  },
                }}
                InputProps={{
                  style: {
                    color: '#000 !important',
                  },
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '1.7rem',
                    fontWeight: '500',
                  },
                  '& .Mui-disabled': {
                    WebkitTextFillColor: '#000 !important',
                  },
                  '& .MuiFormHelperText-root': {
                    fontSize: '1rem',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottom: 'none !important',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottom: 'none',
                  },
                }}
              />
            </div>
            <div className="col-12 mt-2">
              <TextField
                disabled
                fullWidth
                type="text"
                id="standard-required"
                label="Địa chỉ mặc định"
                value={defaultAddress}
                variant="standard"
                className="input-field"
                InputLabelProps={{
                  style: {
                    fontSize: '1.7rem',
                    color: '#000 !important',
                  },
                }}
                InputProps={{
                  style: {
                    color: '#000 !important',
                  },
                }}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '1.7rem',
                    fontWeight: '500',
                  },
                  '& .Mui-disabled': {
                    WebkitTextFillColor: '#000 !important',
                  },
                  '& .MuiFormHelperText-root': {
                    fontSize: '1rem',
                  },
                  '& .MuiInput-underline:before': {
                    borderBottom: 'none !important',
                  },
                  '& .MuiInput-underline:after': {
                    borderBottom: 'none',
                  },
                }}
              />
            </div>
          </div>
          {canSave && (
            <LoadingButton
              onClick={handleChangeInformation}
              loading={submitLoading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              sx={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                padding: '3px 10px',
                color: '#fff',
                backgroundColor: 'primary.light',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '& svg': {
                  color: 'white',
                },
                border: 'none',
                transition: 'opacity 0.3s ease',
              }}
            >
              <div className="text-white" style={{ fontSize: '1.6rem' }}>
                LƯU THÔNG TIN
              </div>
            </LoadingButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
