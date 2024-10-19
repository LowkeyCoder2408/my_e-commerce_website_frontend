import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/Context/AuthContext';
import { toast } from 'react-toastify';
import { backendEndpoint } from '../../utils/Service/Constant';
import styles from './scss/ChangePassword.module.scss';
import classNames from 'classnames/bind';
import LoadingButton from '@mui/lab/LoadingButton';
import { ChangeCircle } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getUserIdByToken, logout } from '../../utils/Service/JwtService';

const cx = classNames.bind(styles);

const ChangePassword = () => {
  const userId = getUserIdByToken();

  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [currentPasswordError, setCurrentPasswordError] = useState(
    'Chưa điền thông tin',
  );
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState(
    'Chưa điền thông tin',
  );
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [confirmNewPasswordError, setConfirmNewPasswordError] = useState(
    'Chưa điền thông tin',
  );

  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    setCanSubmit(
      currentPasswordError === '' &&
        newPasswordError === '' &&
        confirmNewPasswordError === '',
    );
  }, [currentPasswordError, newPasswordError, confirmNewPasswordError]);

  useEffect(() => {
    checkValidNewPassword(newPassword);
    checkValidConfirmNewPassword(confirmNewPassword);
  }, [newPassword, confirmNewPassword]);

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

  // Check currrent password
  const checkRightCurrentPassword = async (currentPassword: string) => {
    const endpoint = `${backendEndpoint}/users/check-current-password?currentPassword=${currentPassword}&userId=${userId}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.text();

      if (responseData === 'false') {
        setCurrentPasswordError('Mật khẩu không chính xác');
      } else {
        setCurrentPasswordError('');
      }
    } catch (error) {
      console.error(
        'Đã xảy ra lỗi trong quá trình kiểm tra mật khẩu hiện tại',
        error,
      );
    }
  };

  const checkValidCurrentPassword = (password: string) => {
    if (password.trim() === '') {
      setCurrentPasswordError('Chưa điền thông tin');
      return false;
    } else {
      return true;
    }
  };

  const handleCurrentPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentPassword = e.target.value;
    setCurrentPassword(currentPassword);
    const isValidCurrentPassword = checkValidCurrentPassword(currentPassword);
    if (isValidCurrentPassword) {
      checkRightCurrentPassword(currentPassword);
    }
  };

  // Check new password
  const checkValidNewPassword = (newPassword: string) => {
    if (newPassword.trim() === '') {
      setNewPasswordError('Chưa điền thông tin');
      return false;
    } else if (!hasUppercase(newPassword)) {
      setNewPasswordError('Chưa có chữ in hoa');
      return false;
    } else if (!hasLowercase(newPassword)) {
      setNewPasswordError('Chưa có chữ in thường');
      return false;
    } else if (!hasDigit(newPassword)) {
      setNewPasswordError('Chưa có chữ số');
      return false;
    } else if (!hasSpecialChar(newPassword)) {
      setNewPasswordError('Chưa có ký tự đặc biệt');
      return false;
    } else if (!hasMinLength(newPassword, 8)) {
      setNewPasswordError('Chưa đủ ít nhất 8 ký tự');
      return false;
    } else {
      setNewPasswordError('');
      return true;
    }
  };

  const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
    checkValidNewPassword(newPassword);
  };

  // Check confirm new password
  const checkValidConfirmNewPassword = (confirmNewPassword: string) => {
    if (confirmNewPassword.trim() === '') {
      setConfirmNewPasswordError('Chưa điền thông tin');
      return false;
    } else if (confirmNewPassword !== newPassword) {
      setConfirmNewPasswordError('Mật khẩu không trùng khớp');
      return false;
    } else {
      setConfirmNewPasswordError('');
      return true;
    }
  };

  const handleConfirmNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const confirmNewPassword = e.target.value;
    setConfirmNewPassword(confirmNewPassword);
    checkValidConfirmNewPassword(confirmNewPassword);
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);

    fetch(backendEndpoint + '/users/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        userId,
        currentPassword,
        newPassword,
        confirmNewPassword,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (response.ok && data.status === 'success') {
          toast.success(
            data.message ||
              'Thay đổi mật khẩu thành công, vui lòng đăng nhập lại',
          );
          setCurrentPassword('');
          setCurrentPasswordError('Chưa điền thông tin');
          setNewPassword('');
          setNewPasswordError('Chưa điền thông tin');
          setConfirmNewPassword('');
          setConfirmNewPasswordError('Chưa điền thông tin');
          logout(navigate);
          setIsLoggedIn(false);
          navigate('/login');
        } else {
          toast.error(
            data.message || 'Gặp lỗi trong quá trình thay đổi mật khẩu',
          );
        }
      })
      .catch((error) => {
        toast.error('Thay đổi mật khẩu không thành công');
        console.log(error);
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && canSubmit) {
      handleSubmit();
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={`${cx('change-password__container')} container`}>
      <div className="row">
        <div
          className={`${cx('change-password__logo')} col col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 d-flex flex-column justify-content-center align-items-center`}
        >
          <img
            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1707592447/logo_main_tes0gp.png"
            alt=""
          />
          <h3>
            <strong>Tech Solutions, Hub Excellence</strong>
          </h3>
        </div>
        <div
          className={`${cx('change-password__form')} col col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12`}
        >
          <h1
            className={`${cx('change-password__form-title')} text-center mt-5`}
          >
            <strong>ĐỔI MẬT KHẨU</strong>
          </h1>
          <div className="mt-3 mb-5">
            <form className="form" autoComplete="off">
              <div className="row mb-0">
                <div
                  className={`${cx('change-password__input-box__field')} col col-xxl-12 col-xl-12 col-lg-12 col-md-12`}
                >
                  <div className={cx('change-password__input-box')}>
                    <input
                      required
                      type="password"
                      id="current-password"
                      value={currentPassword}
                      onChange={handleCurrentPasswordChange}
                      autoComplete="password"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Nhập mật khẩu cũ</span>
                    <div className="d-flex">
                      {currentPasswordError ? (
                        <div className={cx('change-password__error')}>
                          {currentPasswordError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('change-password__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${cx('change-password__input-box__field')} col col-xxl-12 col-xl-12 col-lg-12 col-md-12`}
                >
                  <div className={cx('change-password__input-box')}>
                    <input
                      required
                      type="password"
                      id="new-password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      autoComplete="password"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Nhập mật khẩu mới</span>
                    <div className="d-flex">
                      {newPasswordError ? (
                        <div className={cx('change-password__error')}>
                          {newPasswordError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('change-password__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${cx('change-password__input-box__field')} col col-xxl-12 col-xl-12 col-lg-12 col-md-12`}
                >
                  <div className={cx('change-password__input-box')}>
                    <input
                      required
                      type="password"
                      id="confirm-new-password"
                      value={confirmNewPassword}
                      onChange={handleConfirmNewPasswordChange}
                      autoComplete="password"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Nhập lại mật khẩu mới</span>
                    <div className="d-flex">
                      {confirmNewPasswordError ? (
                        <div className={cx('change-password__error')}>
                          {confirmNewPasswordError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('change-password__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <LoadingButton
                disabled={!canSubmit || submitLoading}
                fullWidth
                onClick={handleSubmit}
                loading={submitLoading}
                loadingPosition="start"
                startIcon={<ChangeCircle />}
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
                  opacity: !canSubmit || submitLoading ? 0.5 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div className="text-white" style={{ fontSize: '1.6rem' }}>
                  ĐỔI MẬT KHẨU
                </div>
              </LoadingButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
