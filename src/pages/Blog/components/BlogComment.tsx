import React, { useState } from 'react';
import { format } from 'date-fns';
import BlogCommentModel from '../../../models/BlogCommentModel';
import styles from '../scss/BlogComment.module.scss';
import classNames from 'classnames/bind';
import { Avatar, Box, IconButton, Typography } from '@mui/material';
import { FaRegThumbsUp } from 'react-icons/fa';
import { ReplyRounded } from '@mui/icons-material';

const cx = classNames.bind(styles);

interface BlogCommentProps {
  blogComment: BlogCommentModel;
}

const BlogComment: React.FC<BlogCommentProps> = (props: BlogCommentProps) => {
  const isChild = props.blogComment.parentCommentId !== null;
  const [isShowReplies, setIsShowReplies] = useState<boolean>(false);

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
                gap: '10',
              }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <FaRegThumbsUp
                  style={{ fontSize: '1.6rem', color: 'rgb(158 158 158)' }}
                />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <ReplyRounded
                  style={{ fontSize: '1.6rem', color: 'rgb(158 158 158)' }}
                />
              </IconButton>
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
      {isShowReplies ? (
        props.blogComment.replies &&
        props.blogComment.replies.length > 0 && (
          <>
            {props.blogComment.replies.map((reply) => (
              <BlogComment key={reply.id} blogComment={reply} />
            ))}
          </>
        )
      ) : (
        <>
          {props.blogComment.replies.length > 0 && (
            <div
              className={cx('show-comments')}
              onClick={() => setIsShowReplies(true)}
            >
              Xem tất cả {props.blogComment.replies.length} phản hồi
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogComment;
