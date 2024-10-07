import React from 'react';
import { format } from 'date-fns';
import BlogCommentModel from '../../../../../models/BlogCommentModel';
import styles from '../../scss/BlogComment.module.scss';
import classNames from 'classnames/bind';
import { Avatar, Box, Typography } from '@mui/material';

const cx = classNames.bind(styles);

interface BlogCommentProps {
  blogComment: BlogCommentModel;
}

const BlogComment: React.FC<BlogCommentProps> = (props: BlogCommentProps) => {
  return (
    <div className={cx('comment-item')}>
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
            </Typography>
            <Typography fontSize="1.2rem" variant="caption">
              {format(
                new Date(props.blogComment.createdAt || 0),
                'HH:mm, dd/MM/yyyy',
              )}
            </Typography>
          </div>
        </Box>
      </Box>
      <p>{props.blogComment.content}</p>
    </div>
  );
};

export default BlogComment;
