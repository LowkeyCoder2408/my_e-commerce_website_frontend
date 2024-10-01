import { ChangeEvent, useEffect, useState } from 'react';
import styles from './scss/Register.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Link, useNavigate } from 'react-router-dom';
import { backendEndpoint } from '../../utils/Service/Constant';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';
import { useAuth } from '../../utils/Context/AuthContext';
import LoadingButton from '@mui/lab/LoadingButton';
import { AppRegistrationOutlined } from '@mui/icons-material';

const cx = classNames.bind(styles);

function Register() {
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('Chưa điền thông tin');
  const [firstNameError, setFirstNameError] = useState<string>(
    'Chưa điền thông tin',
  );
  const [lastNameError, setLastNameError] = useState<string>(
    'Chưa điền thông tin',
  );
  const [phoneNumberError, setPhoneNumberError] = useState<string>(
    'Chưa điền thông tin',
  );
  const [passwordError, setPasswordError] = useState<string>(
    'Chưa điền thông tin',
  );
  const [repeatPasswordError, setRepeatPasswordError] = useState<string>(
    'Chưa điền thông tin',
  );

  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const jwtToken = localStorage.getItem('token');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const endpoint = backendEndpoint + `/auth/register`;
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'success') {
          toast.success(
            data.message ||
              'Đăng ký thành công, vui lòng kiểm tra email để kích hoạt',
          );
          setEmail('');
          setFirstName('');
          setLastName('');
          setPhoneNumber('');
          setPassword('');
          setRepeatPassword('');
          setEmailError('Chưa điền thông tin');
          setFirstNameError('Chưa điền thông tin');
          setLastNameError('Chưa điền thông tin');
          setPhoneNumberError('Chưa điền thông tin');
          setPasswordError('Chưa điền thông tin');
          setRepeatPasswordError('Chưa điền thông tin');
        } else {
          toast.error(
            data.message || 'Đã xảy ra lỗi trong quá trình đăng ký tài khoản',
          );
        }
      } else {
        toast.error(
          data.message || 'Đã xảy ra lỗi trong quá trình đăng ký tài khoản',
        );
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi trong quá trình đăng ký tài khoản');
    } finally {
      setSubmitLoading(false);
    }
  };

  // Email checking
  const checkExistingEmail = async (email: string) => {
    const endpoint = backendEndpoint + `/users/existsByEmail?email=${email}`;
    try {
      const response = await fetch(endpoint);
      const responseData = await response.text();
      if (responseData === 'true') {
        setEmailError('Email đã tồn tại');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Đã xảy ra lỗi trong quá trình kiểm tra email', error);
      return false;
    }
  };

  const checkValidEmail = (email: string) => {
    const emailRegex =
      /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[\w-]+(?:\.[\w-]+)*|\[(?:\d{1,3}\.){3}\d{1,3}\])$/;
    if (email.trim() === '') {
      setEmailError('Chưa điền thông tin');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Chưa đúng định dạng');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmail(email);
    setEmailError('');
    const isValidEmail = checkValidEmail(email);
    if (isValidEmail) {
      checkExistingEmail(email);
    }
  };

  // First name checking
  const checkValidFirstName = (firstName: string) => {
    if (firstName.trim() === '') {
      setFirstNameError('Chưa điền thông tin');
      return false;
    } else {
      setFirstNameError('');
      return true;
    }
  };

  // Last name checking
  const checkValidLastName = (lastName: string) => {
    if (lastName.trim() === '') {
      setLastNameError('Chưa điền thông tin');
      return false;
    } else {
      setLastNameError('');
      return true;
    }
  };

  const handleFirstNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const firstName = e.target.value;
    setFirstName(firstName);
    setFirstNameError('');
    checkValidFirstName(firstName);
  };

  const handleLastNameChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const lastName = e.target.value;
    setLastName(lastName);
    setLastNameError('');
    checkValidLastName(lastName);
  };

  // Phone number checking
  const checkValidPhoneNumber = (phoneNumber: string) => {
    const phoneNumberRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    if (phoneNumber.trim() === '') {
      setPhoneNumberError('Chưa điền thông tin');
      return false;
    } else if (!phoneNumberRegex.test(phoneNumber)) {
      setPhoneNumberError('Chưa đúng định dạng');
      return false;
    } else {
      setPhoneNumberError('');
      return true;
    }
  };

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phoneNumber = e.target.value;
    setPhoneNumber(phoneNumber);
    setPhoneNumberError('');
    checkValidPhoneNumber(phoneNumber);
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

  useEffect(() => {
    setCanSubmit(
      emailError === '' &&
        firstNameError === '' &&
        lastNameError === '' &&
        phoneNumberError === '' &&
        passwordError === '' &&
        repeatPasswordError === ''
        ? true
        : false,
    );
  }, [
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    phoneNumberError,
    repeatPasswordError,
  ]);

  if (jwtToken !== null) {
    return <></>;
  }

  return (
    <div className={`${cx('register__container')} container p-0`}>
      <div className="row">
        <div
          className={`${cx('register__logo')} col col-xxl-5 col-xl-5 col-lg-12 col-md-12 col-12 d-flex flex-column justify-content-center align-items-center`}
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
          className={`${cx('register__form')} col col-xxl-7 col-xl-7 col-lg-12 col-md-12 col-12`}
        >
          <h1 className={`${cx('register__form-title')} text-center mt-5`}>
            <strong>TẠO TÀI KHOẢN MỚI</strong>
          </h1>
          <div className="mt-3 mb-5">
            <form onSubmit={handleSubmit} className="form">
              <div className="row mb-0">
                <div
                  className={`${cx('register__input-box__field')} col col-xxl-12 col-xl-12 col-lg-12 col-md-12`}
                >
                  <div className={cx('register__input-box')}>
                    <input
                      required
                      type="text"
                      id="email"
                      className=""
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <span>Email</span>
                    <div className="d-flex">
                      {emailError ? (
                        <div className={cx('register__error')}>
                          {emailError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('register__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${cx('register__input-box__field')} col col-xxl-6 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12`}
                >
                  <div className={cx('register__input-box')}>
                    <input
                      required
                      type="text"
                      id="lastName"
                      className=""
                      value={lastName}
                      onChange={handleLastNameChange}
                    />
                    <span>Họ</span>{' '}
                    <div className="d-flex">
                      {lastNameError ? (
                        <div className={cx('register__error')}>
                          {lastNameError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('register__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${cx('register__input-box__field')} col col-xxl-6 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12`}
                >
                  <div className={cx('register__input-box')}>
                    <input
                      required
                      type="text"
                      id="firstName"
                      className=""
                      value={firstName}
                      onChange={handleFirstNameChange}
                    />
                    <span>Tên</span>{' '}
                    <div className="d-flex">
                      {firstNameError ? (
                        <div className={cx('register__error')}>
                          {firstNameError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('register__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${cx('register__input-box__field')} col col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12`}
                >
                  <div className={cx('register__input-box')}>
                    <input
                      required
                      type="tel"
                      id="phoneNumber"
                      className=""
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                    <span>Số điện thoại</span>
                    <div className="d-flex">
                      {phoneNumberError ? (
                        <div className={cx('register__error')}>
                          {phoneNumberError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('register__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${cx('register__input-box__field')} col col-xxl-6 col-12`}
                >
                  <div className={cx('register__input-box')}>
                    <input
                      required
                      type="password"
                      id="password"
                      className=""
                      value={password}
                      onChange={handlePasswordChange}
                      autoComplete="new-password"
                    />
                    <span>Mật khẩu</span>
                    <div className="d-flex">
                      {passwordError ? (
                        <div className={cx('register__error')}>
                          {passwordError}
                          <FontAwesomeIcon
                            icon={faTriangleExclamation as IconProp}
                          />
                        </div>
                      ) : (
                        <div className={cx('register__success')}>
                          <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div
                  className={`${cx('register__input-box__field')} col col-xxl-6 col-12`}
                >
                  <div className={cx('register__input-box')}>
                    <input
                      required
                      type="password"
                      id="repeatPassword"
                      className=""
                      value={repeatPassword}
                      onChange={handleRepeatPasswordChange}
                    />
                    <span>Nhập lại mật khẩu</span>
                    {repeatPasswordError ? (
                      <div className={cx('register__error')}>
                        {repeatPasswordError}
                        <FontAwesomeIcon
                          icon={faTriangleExclamation as IconProp}
                        />
                      </div>
                    ) : (
                      <div className={cx('register__success')}>
                        <FontAwesomeIcon icon={faCircleCheck as IconProp} />
                      </div>
                    )}
                  </div>
                </div>
                <div
                  className={`${cx('register__input-checkbox')} my-4 d-flex gap-3`}
                >
                  <label htmlFor="privacyAgree">
                    Bằng việc đăng ký, bạn đã đồng ý với Tech Hub về{' '}
                    <Link to={'/exchange-return-refund-policy'}>
                      Điều khoản dịch vụ
                    </Link>{' '}
                    & <Link to={'/security-policy'}>Chính sách bảo mật</Link>
                  </label>
                </div>
              </div>
              <LoadingButton
                disabled={!canSubmit || submitLoading}
                fullWidth
                onClick={handleSubmit}
                loading={submitLoading}
                loadingPosition="start"
                startIcon={<AppRegistrationOutlined />}
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
                  ĐĂNG KÝ
                </div>
              </LoadingButton>
              <div className={`${cx('register__transfer')} mb-4`}>
                <span>
                  Bạn đã có tài khoản? Vui lòng chọn{' '}
                  <Link to={'/login'}>Đăng nhập</Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
