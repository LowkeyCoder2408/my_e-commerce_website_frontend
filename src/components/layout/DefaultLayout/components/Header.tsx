import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import CategoryModel from '../../../../models/CategoryModel';
import 'boxicons/css/boxicons.min.css';
import classNames from 'classnames/bind';
import styles from './scss/Header.module.scss';
import { getAllCategories } from '../../../../api/CategoryAPI';
import { frontendEndpoint } from '../../../../utils/Service/Constant';
import { MicNone } from '@mui/icons-material';

const cx = classNames.bind(styles);
// Kiểm tra xem trình duyệt có hỗ trợ Web Speech API không
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

function Header() {
  const location = useLocation();

  const currentUrl = `${window.location.origin}${location.pathname}${location.search}`;
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isCategoryClose, setIsCategoryClose] = useState(true);
  const [isAccessoryClose, setIsAccessoryClose] = useState(true);
  const [isSearchClose, setIsSearchClose] = useState(true);
  const [isSidebarClose, setIsSidebarClose] = useState(true);
  const [keyword, setKeyword] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  if (!isSidebarClose) {
    if (navLinksRef.current) {
      // Kiểm tra ref trước khi sử dụng
      navLinksRef.current.style.left = '0';
    }
  } else {
    if (navLinksRef.current) {
      navLinksRef.current.style.left = '-100%';
    }
  }

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);

    if (currentUrl.startsWith(`${frontendEndpoint}/product-list`)) {
      if (keyword.trim() === '') {
        queryParams.delete('keyword');
      } else {
        queryParams.set('keyword', encodeURIComponent(keyword));
      }
      const newUrl = `${location.pathname}?${queryParams}`;
      navigate(newUrl);
    } else {
      if (keyword.trim() === '') {
        navigate('/product-list');
      } else {
        navigate(`/product-list?keyword=${encodeURIComponent(keyword)}`);
      }
    }
    setKeyword('');
  };

  const handleSearchOnVoice = (transcript: string) => {
    const queryParams = new URLSearchParams(location.search);

    if (currentUrl.startsWith(`${frontendEndpoint}/product-list`)) {
      if (transcript.trim() === '') {
        queryParams.delete('keyword');
      } else {
        queryParams.set('keyword', encodeURIComponent(transcript));
      }
      const newUrl = `${location.pathname}?${queryParams}`;
      navigate(newUrl);
    } else {
      if (transcript.trim() === '') {
        navigate('/product-list');
      } else {
        navigate(`/product-list?keyword=${encodeURIComponent(transcript)}`);
      }
    }
    setKeyword('');
  };

  const handleVoiceSearch = () => {
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn không hỗ trợ tìm kiếm bằng giọng nói.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setKeyword(transcript);
      handleSearchOnVoice(transcript);
    };

    recognition.start();
  };

  useEffect(() => {
    setIsSidebarClose(true);
    setIsSearchClose(true);
    getAllCategories().then((result) => {
      setCategories(result.categories);
    });
    setKeyword('');
  }, [location]);

  useEffect(() => {
    // Kiểm tra nếu form không đóng và input được tìm thấy
    if (!isSearchClose && searchBoxRef.current) {
      // Focus vào input
      searchBoxRef.current.querySelector('input')?.focus();
    }
  }, [isSearchClose]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node) &&
        isListening
      ) {
        setIsSearchClose(true);
      }
    };

    // Thêm sự kiện mousedown để xử lý click bên ngoài search-box
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="container-fluid p-0 bg-white">
      <div className="container">
        <nav className={cx('navbar-area')}>
          <div className={cx('navbar')}>
            <i
              onClick={() => {
                setIsSidebarClose(false);
              }}
              className={`${cx('btn-show', 'bx-menu-main')} bx bx-menu`}
            ></i>
            <div className={`${cx('logo')} hide-on-mobile`}>
              <Link to="/">
                <img
                  className={cx('logo-img')}
                  src="https://res.cloudinary.com/dgdn13yur/image/upload/v1707592447/logo_main_tes0gp.png"
                  alt=""
                />
              </Link>
            </div>
            <div
              className={cx('nav-links', {
                show1: !isCategoryClose,
                show2: !isAccessoryClose,
              })}
              ref={navLinksRef}
            >
              <div className={cx('sidebar-logo')}>
                <i
                  onClick={() => {
                    setIsSidebarClose(true);
                    setIsCategoryClose(true);
                    setIsAccessoryClose(true);
                  }}
                  className={`${cx('btn-show')} bx bx-x`}
                ></i>
              </div>
              <ul className={cx('links')}>
                <li className={cx('links-list-item')}>
                  <a
                    onClick={() => {
                      setIsCategoryClose(!isCategoryClose);
                      if (isCategoryClose) {
                        setIsAccessoryClose(true);
                      }
                    }}
                  >
                    DANH MỤC SẢN PHẨM
                    <i
                      className={`${cx('category-arrow', 'arrow')} bx bxs-chevron-down`}
                    ></i>
                  </a>
                  <ul className={cx('accessory-menu', 'sub-menu')}>
                    {categories.map((category, index) => (
                      <li key={index}>
                        <Link
                          className={cx('link-cat', 'text-dark')}
                          to={`/product-list/${category.alias}`}
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className={cx('links-list-item')}>
                  <Link to={'/product-list'}>KHO HÀNG</Link>
                </li>
                <li className={cx('links-list-item')}>
                  <Link to={'/about-us'}>GIỚI THIỆU</Link>
                </li>
                <li className={cx('links-list-item')}>
                  <Link to={'/faq'}>HỎI & ĐÁP</Link>
                </li>
                <li className={cx('links-list-item')}>
                  <Link to={'/blog'}>BÀI ĐĂNG</Link>
                </li>
                {/* {userRoles &&
                userRoles.length === 1 &&
                userRoles.includes('Khách hàng') ? (
                  <li className={cx('links-list-item')}>
                    <Link to={'/contact'}>LIÊN HỆ</Link>
                  </li>
                ) : (
                  userRoles && (
                    <li className={cx('links-list-item')}>
                      <Link to={'/admin/dashboard'}>TRANG QUẢN TRỊ</Link>
                    </li>
                  )
                )} */}
              </ul>
            </div>
            <div className={cx('search-box')} ref={searchBoxRef}>
              {isSearchClose ? (
                <i
                  onClick={() => {
                    setIsSearchClose(false);
                  }}
                  className={`${cx('btn-show')} bx bx-search`}
                ></i>
              ) : (
                <i
                  onClick={() => {
                    if (!isListening) {
                      setIsSearchClose(true);
                    }
                  }}
                  className={`${cx('btn-show')} bx bx-x`}
                ></i>
              )}

              <form
                onSubmit={handleSearch}
                className={cx('input-box', { hide: isSearchClose })}
              >
                <div className={cx('input-container')}>
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder={`${isListening ? 'Đang nghe...' : 'Tìm kiếm sản phẩm tại đây...'}`}
                    aria-label="Search"
                    onChange={onSearchInputChange}
                    value={keyword}
                  />
                  <span onClick={handleVoiceSearch} className={cx('mic-icon')}>
                    <MicNone
                      style={{
                        fontSize: '2rem',
                        color: `${isListening ? 'red' : ''}`,
                      }}
                    />
                  </span>
                </div>

                <button type="submit" className="">
                  <i className="bx bx-search text-white"></i>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Header;
