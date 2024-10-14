import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { format } from 'date-fns';
import BlogCommentModel from '../../../models/BlogCommentModel';
import styles from '../scss/BlogComment.module.scss';
import classNames from 'classnames/bind';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
import { ReplyRounded } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../utils/Context/AuthContext';
import {
  getUserIdByToken,
  isTokenExpired,
} from '../../../utils/Service/JwtService';
import LikedBlogCommentModel from '../../../models/LikedBlogCommentModel';
import { fetchLikedBlogCommentsByUserId } from '../../../api/LikedBlogCommentAPI';
import { toast } from 'react-toastify';
import { backendEndpoint } from '../../../utils/Service/Constant';

const cx = classNames.bind(styles);

interface BlogCommentProps {
  blogComment: BlogCommentModel;
  setKeyCountReload?: Dispatch<SetStateAction<number>>;
}

const BlogComment: React.FC<BlogCommentProps> = (props: BlogCommentProps) => {
  const location = useLocation();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const userId = getUserIdByToken();

  const isChild = props.blogComment.parentCommentId !== null;
  // const [isShowReplies, setIsShowReplies] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState(false);

  const fetchLikedBlogCommentData = async () => {
    try {
      let likedBlogCommentsResult: LikedBlogCommentModel[] = [];
      if (userId) {
        likedBlogCommentsResult = await fetchLikedBlogCommentsByUserId();
        const isLiked = likedBlogCommentsResult.some(
          (likedBlogComment: LikedBlogCommentModel) =>
            likedBlogComment.blogCommentId === props.blogComment.id,
        );
        setIsLiked(isLiked);
      }
    } catch (error) {
      console.log('Lỗi khi lấy dữ liệu bình luận đã thích: ', error);
    }
  };

  const handleLikeAComment = async () => {
    if (!isLoggedIn) {
      toast.error('Bạn phải đăng nhập để thích bình luận này');
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
      const response = await fetch(
        backendEndpoint + `/liked-blog-comments/like-comment`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            blogCommentId: props.blogComment?.id,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'error') {
          toast.error(data.message || 'Đã xảy ra lỗi khi thích bình luận này');
        } else {
          props.setKeyCountReload && props.setKeyCountReload(Math.random());
        }
      } else {
        toast.error('Đã xảy ra lỗi khi thích bình luận này');
      }
    } else {
      const response = await fetch(
        backendEndpoint + `/liked-blog-comments/unlike-comment`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            blogCommentId: props.blogComment?.id,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        if (data.status === 'error') {
          toast.error(
            data.message || 'Đã xảy ra lỗi khi bỏ thích bình luận này',
          );
        } else {
          props.setKeyCountReload && props.setKeyCountReload(Math.random());
        }
      } else {
        toast.error('Đã xảy ra lỗi khi bỏ thích bình luận này');
      }
    }
  };

  useEffect(() => {
    fetchLikedBlogCommentData();
  }, []);

  useEffect(() => {
    console.log({ isLiked });
  }, [isLiked]);

  return (
    <div style={{ marginBottom: isChild ? 0 : `40px` }}>
      <div
        className={cx('comment-item', {
          'parent-item': !isChild,
          'child-item': isChild,
          'author-comment': props.blogComment.authorComment,
        })}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 1,
                alignItems: 'center',
              }}
            >
              <Avatar
                alt={`Ảnh của ${props.blogComment.user.lastName + ' ' + props.blogComment.user.firstName}`}
                src={props.blogComment.user.photo}
                sx={{ width: 35, height: 35 }}
              />
              <div className="d-flex flex-column">
                <Typography fontSize="1.4rem" variant="caption">
                  {props.blogComment.user.lastName +
                    ' ' +
                    props.blogComment.user.firstName}
                  {props.blogComment.authorComment && (
                    <strong> (Tác giả)</strong>
                  )}
                </Typography>
                <Typography fontSize="1.2rem" variant="caption">
                  {format(
                    new Date(props.blogComment.createdAt || 0),
                    'HH:mm, dd/MM/yyyy',
                  )}
                </Typography>
              </div>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '5px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  title={isLiked ? 'Bỏ thích' : 'Thích'}
                  style={{
                    color: `${isLiked ? '#0566ff' : 'rgb(158 158 158)'}`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleLikeAComment();
                  }}
                >
                  {isLiked ? (
                    <FaThumbsUp style={{ fontSize: '1.6rem' }} />
                  ) : (
                    <FaRegThumbsUp style={{ fontSize: '1.6rem' }} />
                  )}
                </IconButton>
                <span
                  style={{
                    color: `${isLiked ? '#0566ff' : 'rgb(158 158 158)'}`,
                  }}
                >
                  {props.blogComment.likedBlogComments.length}
                </span>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <IconButton
                  title="Thêm phản hồi"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <ReplyRounded
                    style={{ fontSize: '1.6rem', color: 'rgb(158 158 158)' }}
                  />
                </IconButton>
                <span>{props.blogComment.replies.length}</span>
              </Box>
            </Box>
          </Box>
        </Box>
        <p>
          {props.blogComment.replyTo && (
            <strong>@{props.blogComment.replyTo}</strong>
          )}{' '}
          {props.blogComment.content}
        </p>
      </div>
      {/* {isShowReplies ? ( */}
        {props.blogComment.replies &&
        props.blogComment.replies.length > 0 && (
          <>
            {props.blogComment.replies.map((reply) => (
              <BlogComment
                key={reply.id}
                blogComment={reply}
                setKeyCountReload={props.setKeyCountReload}
              />
            ))}
          </>
        )}
      {/* // ) : (
      //   <>
      //     {props.blogComment.replies.length > 0 && (
      //       <div
      //         className={cx('show-comments')}
      //         onClick={() => setIsShowReplies(true)}
      //       >
      //         Xem tất cả {props.blogComment.replies.length} phản hồi
      //       </div>
      //     )}
      //   </>
      // )} */}
    </div>
  );
};

export default BlogComment;
