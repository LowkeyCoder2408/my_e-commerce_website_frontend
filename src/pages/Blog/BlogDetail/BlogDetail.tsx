import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Context/AuthContext';
import BlogModel from '../../../models/BlogModel';
import { toast } from 'react-toastify';
import { getBlogById } from '../../../api/BlogAPI';
import Loader from '../../../utils/Loader';
import styles from './scss/BlogDetail.module.scss';
import classNames from 'classnames/bind';
import {
  FaBookmark,
  FaComment,
  FaEllipsisV,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaThumbsUp,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { Avatar } from '@mui/material';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const idNumber = id ? parseInt(id, 10) : 0;

  const [blog, setBlog] = useState<BlogModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBlog = async () => {
    try {
      if (idNumber) {
        const result = await getBlogById(idNumber);
        setBlog(result);
      }
    } catch (error) {
      toast.error('Đã xảy ra lỗi khi lấy dữ liệu bài đăng');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      <div className="row">
        <div className={`${cx('blog__left')} col col-xxl-7 col-12`}>
          <div className="d-flex justify-content-between align-content-center">
            <div className={cx('blog__category-name')}>
              <span>{blog?.blogCategory.name}</span>
            </div>
            <div className={cx('blog__sharing')}>
              <ul>
                <li className={cx('blog__sharing-item')}>
                  <FaComment /> {blog?.comments.length}
                </li>
                <li className={cx('blog__sharing-item')}>
                  <FaThumbsUp /> {blog?.likesCount}
                </li>
              </ul>
            </div>
          </div>
          <div className={cx('blog__content')}>
            <div className={cx('blog__title')}>{blog?.title}</div>
            <img className={cx('blog__img')} src={blog?.featuredImage} alt="" />
          </div>
          <div className={cx('blog__author')}>
            <div className={cx('blog__author-info')}>
              <Avatar src={blog?.author.photo} />
              <div className="d-flex flex-column">
                <h5 className={cx('blog__author-info__name')}>
                  {blog?.author.lastName + ' ' + blog?.author.firstName}
                </h5>
                <div className={cx('blog__author-info__time')}>
                  {format(
                    new Date(blog?.createdAt || 0),
                    'dd/MM/yyyy, HH:mm:ss',
                  )}
                </div>
              </div>
            </div>
            <div className={cx('blog__author-social')}>
              <ul>
                <li>
                  <Link to="/">
                    <FaFacebookF />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <FaTwitter />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <FaYoutube />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <FaInstagram />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <FaHeart />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <FaBookmark />
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <FaEllipsisV />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>{blog?.content}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
