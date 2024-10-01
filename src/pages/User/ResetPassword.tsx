import { ChangeEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './scss/ResetPassword.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { backendEndpoint } from '../../utils/Service/Constant';
import LoadingButton from '@mui/lab/LoadingButton';
import { ChangeCircleOutlined } from '@mui/icons-material';

const cx = classNames.bind(styles);

const ResetPassword = () => {
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string>(
    'Chưa điền thông tin',
  );
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>(
    'Chưa điền thông tin',
  );

  const location = useLocation();
  const navigate = useNavigate();

  // Lấy token từ URL
  const queryParams = new URLSearchParams(location.search);
  const resetPasswordToken = queryParams.get('token');

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

  const checkValidPassword = (password: string) => {
    if (password.trim() === '') {
      setPasswordError('Chưa điền thông tin');
      return false;
    } else if (!hasUppercase(password)) {
      setPasswordError('Chưa có chữ in hoa');
      return false;
    } else if (!hasLowercase(password)) {
      setPasswordError('Chưa có chữ in thường');
      return false;
    } else if (!hasDigit(password)) {
      setPasswordError('Chưa có chữ số');
      return false;
    } else if (!hasSpecialChar(password)) {
      setPasswordError('Chưa có ký tự đặc biệt');
      return false;
    } else if (!hasMinLength(password, 8)) {
      setPasswordError('Chưa đủ ít nhất 8 ký tự');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordError('');
    checkValidPassword(password);
  };

  // Repeat password checking
  const checkValidRepeatPassword = (repeatPassword: string) => {
    if (repeatPassword.trim() === '') {
      setRepeatPasswordError('Chưa điền thông tin');
      return false;
    } else if (repeatPassword !== password) {
      setRepeatPasswordError('Mật khẩu không trùng khớp');
      return false;
    } else {
      setRepeatPasswordError('');
      return true;
    }
  };

  const handleRepeatPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const repeatPassword = e.target.value;
    setRepeatPassword(repeatPassword);
    setRepeatPasswordError('');
    checkValidRepeatPassword(repeatPassword);
  };

  useEffect(() => {
    checkValidPassword(password);
    checkValidRepeatPassword(repeatPassword);
  }, [password, repeatPassword]);

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Ngăn chặn reload trang
    setSubmitLoading(true);

    if (password !== repeatPassword) {
      toast.error('Mật khẩu và mật khẩu xác nhận không khớp');
      setSubmitLoading(false);
      return;
    }

    fetch(backendEndpoint + '/users/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resetPasswordToken, password }),
    })
      .then(async (response) => {
        const data = await response.json();

        if (response.ok && data.status === 'success') {
          toast.success(data.message || 'Mật khẩu đã được đặt lại thành công');
          setPassword('');
          setRepeatPassword('');
          setPasswordError('Chưa điền thông tin');
          setRepeatPasswordError('Chưa điền thông tin');
          navigate('/login');
        } else {
          toast.error(data.message || 'Đặt lại mật khẩu không thành công');
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && canSubmit) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  const canSubmit = passwordError === '' && repeatPasswordError === '';

  useEffect(() => {
    console.log({ resetPasswordToken, password, repeatPassword });
  }, [resetPasswordToken, password, repeatPassword]);

  return (
    <div className={`${cx('reset-password__container')} container`}>
      <div className="row">
        <div
          className={`${cx('reset-password__form')} col col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12`}
        >
          <h1
            className={`${cx('reset-password__form-title')} text-center mt-5`}
          >
            <strong>ĐẶT LẠI MẬT KHẨU</strong>
          </h1>
          <div className="mt-3 mb-5">
            <form
              className="form"
              autoComplete="off"
              onSubmit={handleResetPassword}
            >
              <div className="row mb-0">
                <div
                  className={`${cx('reset-password__input-box__field')} col col-xxl-12 col-xl-12 col-lg-12 col-md-12`}
                >
                  <div className={cx('reset-password__input-box')}>
                    <input
                      required
                      type="password"
                      id="new-password"
                      value={password}
                      onChange={handlePasswordChange}
                      autoComplete="new-password"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Mật khẩu mới</span>
                    <div className="d-flex">
                      {passwordError ? (
                        <div className={cx('reset-password__error')}>
                          {passwordError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('reset-password__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${cx('reset-password__input-box__field')} col col-xxl-12 col-xl-12 col-lg-12 col-md-12`}
                >
                  <div className={cx('reset-password__input-box')}>
                    <input
                      required
                      type="password"
                      id="confirm-new-password"
                      value={repeatPassword}
                      onChange={handleRepeatPasswordChange}
                      autoComplete="confirm-new-password"
                      onKeyPress={handleKeyPress}
                    />
                    <span>Nhập lại mật khẩu mới</span>
                    {repeatPasswordError ? (
                      <div className={cx('reset-password__error')}>
                        {repeatPasswordError}
                        <FontAwesomeIcon
                          icon={faTriangleExclamation as IconProp}
                        />
                      </div>
                    ) : (
                      <div className={cx('reset-password__success')}>
                        <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <LoadingButton
                disabled={(!canSubmit || submitLoading) ?? false}
                fullWidth
                type="submit"
                loading={submitLoading}
                loadingPosition="start"
                startIcon={<ChangeCircleOutlined />}
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
                  ĐẶT LẠI MẬT KHẨU
                </div>
              </LoadingButton>
            </form>
          </div>
        </div>
        <div
          className={`${cx('reset-password__logo')} col col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-12 d-flex flex-column justify-content-center align-items-center`}
        >
          <img
            src="https://res.cloudinary.com/dgdn13yur/image/upload/v1707592447/logo_main_tes0gp.png"
            alt=""
          />
          <h3>
            <strong>Tech Solutions, Hub Excellence</strong>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
