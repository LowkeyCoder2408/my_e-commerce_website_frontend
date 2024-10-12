import { Avatar, Box, CardMedia, Typography, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import BlogModel from '../../../models/BlogModel';
import { StyledTypography, SyledCard, SyledCardContent } from './Styled';
import { format } from 'date-fns';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SetStateAction } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../../utils/Context/AuthContext';
import { isTokenExpired } from '../../../utils/Service/JwtService';
import { confirm } from 'material-ui-confirm';
import { backendEndpoint } from '../../../utils/Service/Constant';

interface BlogCardProps {
  blog: BlogModel;
  canChange?: boolean;
  setBlogId?: React.Dispatch<SetStateAction<number | undefined>>;
  setOption?: React.Dispatch<SetStateAction<string>>;
  setKeyCountReload?: React.Dispatch<SetStateAction<number>>;
  handleOpenModal?: () => void;
}

const BlogCard = (props: BlogCardProps) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleDeleteCartItem = () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để xóa bài đăng của mình');
      navigate('/login', { state: { from: location } });
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

    confirm({
      title: <span style={{ fontSize: '20px' }}>XÓA BÀI ĐĂNG CỦA BẠN</span>,
      description: (
        <span style={{ fontSize: '16px' }}>
          Bạn có chắc chắn rằng sẽ xóa bài đăng này khỏi danh sách?
        </span>
      ),
      confirmationText: <span style={{ fontSize: '15px' }}>Đồng ý</span>,
      cancellationText: <span style={{ fontSize: '15px' }}>Huỷ</span>,
    })
      .then(() => {
        fetch(backendEndpoint + `/blogs/delete-blog/${props.blog.id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'content-type': 'application/json',
          },
        })
          .then(async (response) => {
            const data = await response.json();
            if (response.ok) {
              if (data.status === 'success') {
                toast.success(data.message || 'Xóa bài đăng thành công');
                props.setKeyCountReload &&
                  props.setKeyCountReload(Math.random());
              } else {
                toast.error(data.message || 'Xóa bài đăng không thành công');
              }
            } else {
              toast.error('Đã xảy ra lỗi trong quá trình xóa bài đăng');
            }
          })
          .catch((error) => console.log('Lỗi khi xóa bài đăng:', error));
      })
      .catch(() => {});
  };

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
                props.handleOpenModal && props.handleOpenModal();
                props.setBlogId && props.setBlogId(props.blog.id);
                props.setOption && props.setOption('update');
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
                props.setBlogId && props.setBlogId(props.blog.id);
                handleDeleteCartItem();
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
