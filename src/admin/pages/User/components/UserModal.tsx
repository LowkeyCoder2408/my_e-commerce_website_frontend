import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import UserModel from '../../../../models/UserModel';
import { backendEndpoint } from '../../../../utils/Service/Constant';
import Loader from '../../../../utils/Loader';
import {
  Checkbox,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Add, Edit } from '@mui/icons-material';
import { getDefaultAddressByUserId } from '../../../../api/AddressAPI';
import { format } from 'date-fns';
import UploadImageInput from '../../../../utils/UploadImageInput';
import { toast } from 'react-toastify';
import { isTokenExpired } from '../../../../utils/Service/JwtService';
import { useAuth } from '../../../../utils/Context/AuthContext';
import { addAUser, updateAUser } from '../../../../api/UserAPI';

interface UserModalProps {
  userId: number | undefined;
  option: string;
  setKeyCountReload: Dispatch<SetStateAction<number>>;
  handleCloseUserModal: any;
}

const UserModal = (props: UserModalProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [user, setUser] = useState<UserModel | null>(null);

  const [lastName, setLastName] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [firstNameError, setFirstNameError] = useState<string>('');
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [userRolesError, setUserRolesError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [phoneNumberError, setPhoneNumberError] = useState<string>('');
  const [createdTime, setCreatedTime] = useState<Date>();
  const [lastLoginTime, setLastLoginTime] = useState<Date>();
  const [defaultAddress, setDefaultAddress] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendEndpoint}/users/${props.userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setUser(result);
      setLastName(result.lastName);
      setFirstName(result.firstName);
      setUserRoles(result.roles);
      setEmail(result.email);
      setPhoneNumber(result.phoneNumber);
      setCreatedTime(result.createdTime);
      setLastLoginTime(result.lastLoginTime);
      setImagePreview(result.photo);

      const defaultAddressResult = await getDefaultAddressByUserId(
        props.userId,
      );
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
      console.log('Lỗi khi lấy người dùng: ', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const checkPhoneNumber = (setPhoneNumberError: any, phoneNumber: string) => {
    const phoneNumberRegex = /^(0[1-9]|84[1-9])[0-9]{8}$/;
    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Trường này không được để trống');
      return true;
    } else if (!phoneNumberRegex.test(phoneNumber.trim())) {
      setPhoneNumberError('Số điện thoại không đúng định dạng');
      return true;
    } else {
      setPhoneNumberError('');
      return false;
    }
  };

  // Password checking
  const hasUppercase = (str: string): boolean => {
    const uppercaseRegex = /[A-Z]/;
    return uppercaseRegex.test(str);
  };

  const hasLowercase = (str: string): boolean => {
    const lowercaseRegex = /[a-z]/;
    return lowercaseRegex.test(str);
  };

  const hasDigit = (str: string): boolean => {
    const digitRegex = /[0-9]/;
    return digitRegex.test(str);
  };

  const hasSpecialChar = (str: string): boolean => {
    const specialCharRegex = /[#?!@$%^&*-]/;
    return specialCharRegex.test(str);
  };

  const hasMinLength = (str: string, minLength: number): boolean => {
    return str.length >= minLength;
  };

  const checkPassword = (
    setPasswordError: Dispatch<SetStateAction<string>>,
    password: string,
  ) => {
    if (password.trim() === '') {
      setPasswordError('Chưa điền thông tin');
      return true;
    } else if (!hasUppercase(password)) {
      setPasswordError('Chưa có chữ in hoa');
      return true;
    } else if (!hasLowercase(password)) {
      setPasswordError('Chưa có chữ in thường');
      return true;
    } else if (!hasDigit(password)) {
      setPasswordError('Chưa có chữ số');
      return true;
    } else if (!hasSpecialChar(password)) {
      setPasswordError('Chưa có ký tự đặc biệt');
      return true;
    } else if (!hasMinLength(password, 8)) {
      setPasswordError('Chưa đủ ít nhất 8 ký tự');
      return true;
    } else {
      setPasswordError('');
      return false;
    }
  };

  const checkEmail = (
    setEmailError: Dispatch<SetStateAction<string>>,
    email: string,
  ) => {
    const emailRegex =
      /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\w-]+(?:\.[\w-]+)*|\[(?:\d{1,3}\.){3}\d{1,3}\])$/;
    if (email.trim() === '') {
      setEmailError('Trường này không được để trống');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Email chưa đúng định dạng');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const checkRoles = (
    setUserRolesError: Dispatch<SetStateAction<string>>,
    userRoles: string[],
  ) => {
    if (userRoles.length === 0) {
      setUserRolesError('Bạn phải chọn ít nhất một vai trò');
    } else if (userRoles.length > 2) {
      setUserRolesError('Mỗi người dùng chỉ có tối đa 2 vai trò');
    } else {
      setUserRolesError('');
    }
  };

  const handleSubmit = () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để thực hiện chức năng này');
      navigate('/admin/login', { state: { from: location } });
      return;
    }
    if (isTokenExpired()) {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      toast.error(
        'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại để tiếp tục',
      );
      navigate('/admin/login', { state: { from: location } });
      return;
    }

    setSubmitLoading(true);
    if (props.option === 'add') {
      addAUser(
        firstName,
        lastName,
        userRoles,
        password,
        email,
        phoneNumber,
        imageFile,
      )
        .then((data) => {
          if (data.status === 'success') {
            toast.success(data.message || 'Thêm người dùng mới thành công');
            props.handleCloseUserModal();
            props.setKeyCountReload(Math.random());
          } else {
            toast.error(data.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error('Đã có lỗi trong quá trình xử lý');
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    } else {
      updateAUser(firstName, lastName, phoneNumber, userRoles, imageFile)
        .then((data) => {
          if (data.status === 'success') {
            toast.success(data.message || 'Cập nhật người dùng thành công');
            props.handleCloseUserModal();
            props.setKeyCountReload(Math.random());
          } else {
            toast.error(data.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error('Đã có lỗi trong quá trình xử lý');
        })
        .finally(() => {
          setSubmitLoading(false);
        });
    }
  };

  const handleRoleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    const updatedRoles = typeof value === 'string' ? value.split(',') : value;
    setUserRoles(updatedRoles);
    checkRoles(setUserRolesError, updatedRoles);
  };

  const roles = [
    'Quản trị hệ thống',
    'Quản lý nội dung',
    'Nhân viên bán hàng',
    'Khách hàng',
  ];

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files.length > 1) {
        toast.error(`Bạn chỉ được tải lên tối đa 1 ảnh`);
        return;
      }
      const selectedImage = event.target.files[0];
      setImageFile(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  useEffect(() => {
    if (props.userId) {
      fetchUser();
    }
  }, [props.userId]);

  useEffect(() => {
    console.log({
      firstName,
      lastName,
      userRoles,
      password,
      email,
      phoneNumber,
      imagePreview,
      imageFile,
    });
    console.log({
      firstNameError,
      lastNameError,
      emailError,
      passwordError,
      phoneNumberError,
      userRolesError,
    });
  }, [
    firstName,
    lastName,
    userRoles,
    password,
    email,
    emailError,
    phoneNumber,
    imagePreview,
    imageFile,
    firstNameError,
    lastNameError,
    passwordError,
    phoneNumberError,
    userRolesError,
  ]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="default-title text-center">
        {props.option === 'add'
          ? 'TẠO NGƯỜI DÙNG MỚI'
          : 'CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG'}
      </div>
      <div className="row mt-3">
        <div className="mb-4 col-6">
          <TextField
            required
            fullWidth
            helperText={lastNameError}
            type="text"
            id="standard-required"
            label="Họ"
            value={lastName}
            error={lastNameError.length > 0}
            variant="standard"
            onChange={(e) => {
              setLastName(e.target.value);
              checkEmpty(setLastNameError, e.target.value);
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
        <div className="mb-4 col-6">
          <TextField
            required
            fullWidth
            helperText={firstNameError}
            type="text"
            id="standard-required"
            label="Tên"
            value={firstName}
            error={firstNameError.length > 0}
            variant="standard"
            onChange={(e) => {
              setFirstName(e.target.value);
              checkEmpty(setFirstNameError, e.target.value);
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
        <div className="mb-4 col-6">
          <FormControl
            fullWidth
            variant="standard"
            sx={{
              '& .MuiInputLabel-root': {
                fontSize: '1.5rem',
                fontWeight: '400',
              },
              '& .MuiInput-root': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
              '& .MuiFormControl-root': {
                paddingBottom: '0.5rem',
              },
            }}
          >
            <InputLabel id="role-multiple-checkbox-label">Vai trò</InputLabel>
            <Select
              labelId="role-multiple-checkbox-label"
              id="role-multiple-checkbox"
              error={userRolesError !== ''}
              multiple
              value={userRoles}
              onChange={handleRoleChange}
              input={<Input />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={{
                PaperProps: {
                  style: { maxHeight: 48 * 4.5 + 8, width: 250 },
                },
              }}
            >
              {roles.map((role) => (
                <MenuItem key={role} value={role}>
                  <Checkbox checked={userRoles.includes(role)} />
                  <ListItemText primary={role} />
                </MenuItem>
              ))}
            </Select>
            {userRolesError && (
              <FormHelperText
                sx={{
                  fontSize: '1rem',
                  color: 'error.main',
                }}
              >
                {userRolesError}
              </FormHelperText>
            )}
          </FormControl>
        </div>
        <div className="mb-4 col-6">
          <TextField
            fullWidth
            disabled={props.option === 'update'}
            helperText={passwordError}
            type="text"
            id="standard-required"
            label="Mật khẩu"
            value={password}
            error={passwordError.length > 0}
            variant="standard"
            onChange={(e) => {
              setPassword(e.target.value);
              checkPassword(setPasswordError, e.target.value);
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
        <div className="mb-4 col-6">
          <TextField
            required
            disabled={props.option === 'update'}
            fullWidth
            helperText={emailError}
            error={emailError.length > 0}
            type="text"
            id="standard-required"
            label="Thư điện tử"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              checkEmail(setEmailError, e.target.value);
            }}
            variant="standard"
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
        <div className="mb-4 col-6">
          <TextField
            fullWidth
            helperText={phoneNumberError}
            type="text"
            id="standard-required"
            label="Số điện thoại"
            value={phoneNumber}
            error={phoneNumberError.length > 0}
            variant="standard"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              checkPhoneNumber(setPhoneNumberError, e.target.value);
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
        {props.option === 'update' && (
          <>
            <div className="mb-4 col-6">
              <TextField
                required
                disabled
                fullWidth
                type="text"
                id="standard-required"
                label="Ngày tham gia"
                value={
                  createdTime
                    ? format(
                        new Date(createdTime),
                        "dd/MM/yyyy, 'lúc' HH:mm:ss",
                      )
                    : 'Không thể xác định'
                }
                variant="standard"
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
            <div className="mb-4 col-6">
              <TextField
                required
                disabled
                fullWidth
                type="text"
                id="standard-required"
                label="Đăng nhập lần cuối"
                value={
                  lastLoginTime
                    ? format(
                        new Date(lastLoginTime),
                        "dd/MM/yyyy, 'lúc' HH:mm:ss",
                      )
                    : 'Không thể xác định'
                }
                variant="standard"
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
            <div className="mb-4 col-12">
              <TextField
                required
                disabled
                fullWidth
                type="text"
                id="standard-required"
                label="Địa chỉ mặc định"
                value={defaultAddress}
                variant="standard"
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
          </>
        )}
        <div className="mb-4 col-12">
          <div className="d-flex mt-3">
            <UploadImageInput
              required
              title={
                props.option === 'add' || !user?.photo
                  ? 'Thêm ảnh'
                  : 'Chỉnh sửa ảnh'
              }
              handleImageUpload={handleUploadImage}
            />
          </div>
          {imagePreview && (
            <div
              className="mt-3 position-relative"
              style={{ width: '450px', maxWidth: '100%', borderRadius: '5px' }}
            >
              <img src={imagePreview} alt="" style={{ borderRadius: '5px' }} />
              <button
                onClick={() => {
                  setImageFile(null);
                  setImagePreview('');
                }}
                style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '-12px',
                  backgroundColor: '#ff3e3e',
                  color: '#fff',
                  border: '2px solid #fff',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '2rem',
                  fontWeight: '600',
                }}
              >
                &times;
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4">
        <LoadingButton
          disabled={
            props.option === 'add'
              ? firstName.trim() === '' ||
                firstNameError.length > 0 ||
                lastName.trim() === '' ||
                lastNameError.length > 0 ||
                userRoles.length === 0 ||
                userRolesError.length > 0 ||
                password.trim() === '' ||
                passwordError.length > 0 ||
                email.trim() === '' ||
                emailError.length > 0 ||
                phoneNumber.trim() === '' ||
                phoneNumberError.length > 0
              : firstNameError.length > 0
          }
          fullWidth
          onClick={handleSubmit}
          loading={submitLoading}
          loadingPosition="start"
          startIcon={props.option === 'add' ? <Add /> : <Edit />}
          sx={{
            marginTop: '7px',
            padding: '3px 0',
            color: '#fff',
            backgroundColor: 'primary.light',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '& svg': {
              color: 'white',
            },
            border: 'none',
            opacity: (
              props.option === 'add'
                ? firstName.trim() === '' ||
                  firstNameError.length > 0 ||
                  lastName.trim() === '' ||
                  lastNameError.length > 0 ||
                  userRoles.length === 0 ||
                  userRolesError.length > 0 ||
                  password.trim() === '' ||
                  passwordError.length > 0 ||
                  email.trim() === '' ||
                  emailError.length > 0 ||
                  phoneNumber.trim() === '' ||
                  phoneNumberError.length > 0
                : firstNameError.length > 0
            )
              ? 0.7
              : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div className="text-white" style={{ fontSize: '1.6rem' }}>
            {props.option === 'add' ? (
              <>Tạo người dùng mới</>
            ) : (
              <>Chỉnh sửa thông tin</>
            )}
          </div>
        </LoadingButton>
      </div>
    </>
  );
};

export default UserModal;
