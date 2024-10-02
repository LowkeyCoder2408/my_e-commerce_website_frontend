import { useEffect, useState } from 'react';
import UserModel from '../../models/UserModel';
import { changeAvatar, getUserById } from '../../api/UserAPI';
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
import { toast } from 'react-toastify';

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
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

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
  const [canChangeAvatar, setCanChangeAvatar] = useState<boolean>(false);
  const [canChangeInformation, setCanChangeInformation] =
    useState<boolean>(false);

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const fetchUserInformation = async () => {
    try {
      const userResult = await getUserById(userId);
      setUser(userResult);
      setFirstName(userResult.firstName);
      setLastName(userResult.lastName);
      setPhoneNumber(userResult.phoneNumber);
      setAvatarPreview(
        userResult.photo ||
          'https://res.cloudinary.com/dgdn13yur/image/upload/v1710904428/avatar_sjugj8.png',
      );

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
    if (avatarFile) {
      setCanChangeAvatar(true);
    } else {
      setCanChangeAvatar(false);
    }
  }, [avatarFile]);

  useEffect(() => {
    if (
      (firstName !== user?.firstName ||
        lastName !== user?.lastName ||
        phoneNumber !== user?.phoneNumber) &&
      errorFirstName === '' &&
      errorLastName === '' &&
      errorPhoneNumber === ''
    ) {
      setCanChangeInformation(true);
    } else {
      setCanChangeInformation(false);
    }
  }, [
    firstName,
    lastName,
    phoneNumber,
    errorFirstName,
    errorLastName,
    errorPhoneNumber,
  ]);

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

  // handle change
  const handleUploadAvatar = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedImage = event.target.files[0];
      setAvatarFile(selectedImage);
      setAvatarPreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleChangeAvatar = async () => {
    toast.promise(
      changeAvatar(avatarFile, userId || 0)
        .then((data) => {
          if (data.status === 'success') {
            const token = data.token;
            toast.success(data.message || 'Cập nhật ảnh đại diện thành công');
            fetchUserInformation();
            localStorage.setItem('token', token);
            window.location.reload();
          } else if (data.status === 'warning') {
            toast.warning(
              data.message || 'Không có ảnh đại diện nào được cập nhật',
            );
          } else {
            toast.error(data.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error('Đã có lỗi trong quá trình xử lý');
        }),
      {
        pending: 'Đang trong quá trình xử lý',
      },
    );
  };

  const handleChangeInformation = async () => {
    setSubmitLoading(true);
    try {
      const response = await fetch(
        `${backendEndpoint}/users/change-information`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            ...(user?.lastName !== lastName && { lastName }),
            ...(user?.firstName !== firstName && { firstName }),
            ...(user?.phoneNumber !== phoneNumber && { phoneNumber }),
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        const token = data.token;
        toast.success(data.message || 'Cập nhật thông tin thành công');
        setIsLastNameDisabled(true);
        setIsFirstNameDisabled(true);
        setIsPhoneNumberDisabled(true);
        setErrorLastName('');
        setErrorFirstName('');
        setErrorPhoneNumber('');
        setCanChangeInformation(false);
        fetchUserInformation();
        localStorage.setItem('token', token);
        window.location.reload();
      } else if (data.status === 'warning') {
        toast.warning(data.message || 'Không có thông tin nào được cập nhật');
      } else {
        toast.error(data.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
      }
    } catch (error) {
      console.error(error);
      toast.error('Đã có lỗi trong quá trình xử lý');
    } finally {
      setSubmitLoading(false);
    }
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
              avatarPreview ||
              'https://res.cloudinary.com/dgdn13yur/image/upload/v1710904428/avatar_sjugj8.png'
            }
            width={270}
            height={270}
            canChangeImage={canChangeAvatar}
            handleUploadImage={handleUploadAvatar}
            handleSaveImage={handleChangeAvatar}
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
          {canChangeInformation && (
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
