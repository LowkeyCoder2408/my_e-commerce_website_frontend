import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BlogModel from '../../../models/BlogModel';
import { getBlogById } from '../../../api/BlogAPI';
import Loader from '../../../utils/Loader';
import styles from '../scss/BlogDetail.module.scss';
import classNames from 'classnames/bind';
import {
  FaBookmark,
  FaEllipsisV,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaRegThumbsUp,
  FaThumbsUp,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { Avatar, IconButton } from '@mui/material';
import { format } from 'date-fns';
import BlogComment from './BlogComment';
import 'react-quill/dist/quill.snow.css';
import Latest from '../../BlogList/components/Latest';
import { CommentOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useAuth } from '../../../utils/Context/AuthContext';
import {
  getUserIdByToken,
  isTokenExpired,
} from '../../../utils/Service/JwtService';
import { backendEndpoint } from '../../../utils/Service/Constant';
import LikedBlogModel from '../../../models/LikedBlogModel';
import { fetchLikedBlogsByUserId } from '../../../api/LikedBlogAPI';
import BlogCommentModel from '../../../models/BlogCommentModel';

const cx = classNames.bind(styles);

const BlogDetail = () => {
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const userId = getUserIdByToken();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const idNumber = id ? parseInt(id, 10) : 0;

  const [blog, setBlog] = useState<BlogModel | null>(null);
  const [userLikedBlogs, setUserLikedBlogs] = useState<LikedBlogModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [parentComments, setParentComments] = useState<BlogCommentModel[]>([]);
  const [keyCountReload, setKeyCountReload] = useState<number>(0);

  const fetchBlogAndLikedData = async () => {
    try {
      setIsLoading(true);

      if (idNumber) {
        let blogResult;
        let likedBlogsResult: LikedBlogModel[] = [];

        if (userId) {
          [blogResult, likedBlogsResult] = await Promise.all([
            getBlogById(idNumber),
            fetchLikedBlogsByUserId(),
          ]);
        } else {
          blogResult = await getBlogById(idNumber);
        }

        setBlog(blogResult);
        setParentComments(
          blogResult.comments.filter(
            (comment) => comment.parentCommentId === null,
          ),
        );

        if (userId) {
          setUserLikedBlogs(likedBlogsResult);
          if (blogResult?.id) {
            const isLiked = likedBlogsResult.some(
              (likedBlog: LikedBlogModel) => likedBlog.blogId === blogResult.id,
            );
            setIsLiked(isLiked);
          }
        }
      }
    } catch (error) {
      console.log(
        'Lỗi khi lấy dữ liệu blog hoặc danh sách bài đã thích: ',
        error,
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLikeABlog = async () => {
    if (!isLoggedIn) {
      toast.error('Bạn phải đăng nhập để thích bài đăng');
      navigate('/login', {
        state: { from: location },
      });
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

    if (!isLiked) {
      const response = await fetch(backendEndpoint + `/liked-blogs/like-blog`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          blogId: blog?.id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'error') {
          toast.error(data.message || 'Đã xảy ra lỗi khi thích bài đăng này');
        } else {
          fetchBlogAndLikedData();
        }
      } else {
        toast.error('Đã xảy ra lỗi khi thích bài đăng này');
      }
    } else {
      const response = await fetch(
        backendEndpoint + `/liked-blogs/unlike-blog`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            blogId: blog?.id,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'error') {
          toast.error(
            data.message || 'Đã xảy ra lỗi khi bỏ thích bài đăng này',
          );
        } else {
          fetchBlogAndLikedData();
        }
      } else {
        toast.error('Đã xảy ra lỗi khi thích bài đăng này');
      }
    }
  };

  useEffect(() => {
    fetchBlogAndLikedData();
  }, [idNumber, keyCountReload]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container" style={{ marginTop: '50px' }}>
      {blog ? (
        <div className="row">
          <div
            className={`${cx('blog__left')} col col-xxl-8 col-xl-8 col-lg-8 col-12`}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div className={cx('blog__category-name')}>
                <span>{blog?.blogCategory.name}</span>
              </div>
              <div className={cx('blog__sharing')}>
                <IconButton
                  sx={{
                    display: 'flex',
                    gap: '5px',
                    padding: '5px',
                    borderRadius: '5px',
                    pointerEvents: 'none',
                  }}
                >
                  <CommentOutlined
                    style={{ fontSize: '1.6rem', color: 'rgb(158 158 158)' }}
                  />
                  {blog?.comments.length} bình luận
                </IconButton>
                <IconButton
                  title={isLiked ? 'Bỏ thích' : 'Thích'}
                  sx={{
                    display: 'flex',
                    gap: '5px',
                    padding: '5px',
                    borderRadius: '5px',
                  }}
                  style={{
                    color: `${isLiked ? '#0566ff' : 'rgb(158 158 158)'}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleLikeABlog();
                  }}
                >
                  {isLiked ? (
                    <FaThumbsUp style={{ fontSize: '1.6rem' }} />
                  ) : (
                    <FaRegThumbsUp style={{ fontSize: '1.6rem' }} />
                  )}
                  {blog?.likesCount} lượt thích
                </IconButton>
              </div>
            </div>
            <div className={cx('blog__content')}>
              <div className={cx('blog__title')}>{blog?.title}</div>
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
              <img
                className={cx('blog__img')}
                src={blog?.featuredImage}
                alt=""
              />
            </div>
            <div
              className="mt-4 view ql-editor p-0"
              dangerouslySetInnerHTML={{ __html: blog?.content || '' }}
            />
          </div>
          <div
            className={`${cx('blog__right')} col col-xxl-4 col-xl-4 col-lg-4 col-12`}
            style={{ height: '1000px' }}
          >
            <div className={cx('blog__category-name')}>
              <span>CÁC BÌNH LUẬN GẦN ĐÂY</span>
            </div>
            {parentComments.length > 0 ? (
              parentComments
                .sort((a, b) => (b.authorComment === true ? 1 : -1))
                .map((blogComment, index) => (
                  <BlogComment
                    key={index}
                    blogComment={blogComment}
                    setKeyCountReload={setKeyCountReload}
                  />
                ))
            ) : (
              <div className="h-100 d-flex flex-column gap-5 justify-content-center align-items-center">
                <img
                  src="https://res.cloudinary.com/dgdn13yur/image/upload/v1711643592/no_review_isqiad.png"
                  alt=""
                />
                <span>Chưa có bình luận nào cho bài đăng này</span>
              </div>
            )}
          </div>
          <Latest />
        </div>
      ) : (
        <>
          <h1 className="text-center mt-5">
            <strong>BÀI ĐĂNG KHÔNG TỒN TẠI</strong>
          </h1>
          <div className="text-center mt-5">
            <img
              style={{ width: '20%' }}
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1728747132/eosgj3jl9fc5keeb1hci.png"
              alt=""
              className="mb-5"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default BlogDetail;
