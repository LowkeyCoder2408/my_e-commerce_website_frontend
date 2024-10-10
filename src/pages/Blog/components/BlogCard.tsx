import { Avatar, Box, CardMedia, Typography, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import BlogModel from '../../../models/BlogModel';
import { StyledTypography, SyledCard, SyledCardContent } from './Styled';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  blog: BlogModel;
  canChange?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BlogCard = (props: BlogCardProps) => {
  return (
    <Link to={`/blog-detail?id=${props.blog.id}`}>
      <SyledCard
        variant="outlined"
        sx={{ height: '100%', position: 'relative' }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          image={props.blog.featuredImage}
          sx={{
            height: { sm: 'auto', md: '50%' },
            aspectRatio: { sm: '16 / 9', md: '' },
          }}
        />
        {props.canChange && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              display: 'flex',
              gap: 1,
            }}
          >
            <IconButton
              aria-label="edit"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (props.onEdit) props.onEdit();
              }}
              sx={{
                color: 'white',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
                padding: '5px',
                borderRadius: '50%',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Edit sx={{ fontSize: '1.8rem' }} />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (props.onDelete) props.onDelete();
              }}
              sx={{
                color: 'white',
                backgroundColor: '#d32f2f',
                '&:hover': {
                  backgroundColor: '#c62828',
                },
                padding: '5px',
                borderRadius: '50%',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Delete sx={{ fontSize: '1.8rem' }} />
            </IconButton>
          </Box>
        )}
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
            {props.blog.content
              ? new DOMParser()
                  .parseFromString(
                    (props.blog.content || '').toString(),
                    'text/html',
                  )
                  .documentElement.textContent?.replace(/<[^>]+>/g, '')
              : ''}
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
