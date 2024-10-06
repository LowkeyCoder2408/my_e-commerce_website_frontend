import { Avatar, Box, CardMedia, Typography } from '@mui/material';
import BlogModel from '../../../models/BlogModel';
import {
  StyledTypography,
  SyledCard,
  SyledCardContent,
} from '../Styled/Styled';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  blog: BlogModel;
}

const BlogCard = (props: BlogCardProps) => {
  return (
    <Link to={`/blog-detail?id=${props.blog.id}`}>
      <SyledCard variant="outlined" sx={{ height: '100%' }}>
        <CardMedia
          component="img"
          alt="green iguana"
          image={props.blog.featuredImage}
          sx={{
            height: { sm: 'auto', md: '50%' },
            aspectRatio: { sm: '16 / 9', md: '' },
          }}
        />
        <SyledCardContent>
          <Typography
            gutterBottom
            variant="caption"
            component="div"
            sx={{ fontSize: '1.4rem' }}
          >
            {props.blog.blogCategory.name}
          </Typography>
          <Typography
            gutterBottom
            style={{
              fontSize: '1.8rem',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 1,
              lineClamp: 1,
            }}
            component="div"
          >
            <strong>{props.blog.title}</strong>
          </Typography>

          <StyledTypography
            variant="body2"
            color="text.secondary"
            gutterBottom
            style={{ fontSize: '1.2rem' }}
          >
            {props.blog.content}
          </StyledTypography>
        </SyledCardContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
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
              alt={`Ảnh của ${props.blog.author.lastName + ' ' + props.blog.author.firstName}`}
              src={props.blog.author.photo}
              sx={{ width: 30, height: 30 }}
            />
            <Typography fontSize="1.4rem" variant="caption">
              {props.blog.author.lastName + ' ' + props.blog.author.firstName}
            </Typography>
          </Box>
          <Typography fontSize="1.4rem" variant="caption">
            {format(new Date(props.blog.createdAt || 0), 'HH:mm, dd/MM/yyyy')}
          </Typography>
        </Box>
      </SyledCard>
    </Link>
  );
};

export default BlogCard;
