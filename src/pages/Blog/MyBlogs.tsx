import { useEffect, useState } from 'react';
import BlogModel from '../../models/BlogModel';
import { getMyBlogs } from '../../api/BlogAPI';
import {
  getUserIdByToken,
  isTokenExpired,
} from '../../utils/Service/JwtService';
import Loader from '../../utils/Loader';
import { useAuth } from '../../utils/Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Fab, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import BlogCard from './components/BlogCard';
import { Add } from '@mui/icons-material';
import { FadeModal } from '../../utils/FadeModal';
import BlogModal from './components/BlogModal';
import { toast } from 'react-toastify';

const MyBlogs = () => {
  const userId = getUserIdByToken();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [numberOfPageTemp, setTotalPageTemp] = useState(numberOfPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogId, setBlogId] = useState<number | undefined>(undefined);
  const [option, setOption] = useState('');
  const [openBlogModal, setOpenBlogModal] = useState<boolean>(false);
  const [keyCountReload, setKeyCountReload] = useState<number>(0);

  const handleOpenBlogModal = () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để thêm vào giỏ hàng');
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
    setOpenBlogModal(true);
  };

  const handleCloseBlogModal = () => {
    setBlogId(undefined);
    setOpenBlogModal(false);
  };

  if (numberOfPageTemp !== numberOfPage) {
    setCurrentPage(1);
    setTotalPageTemp(numberOfPage);
  }

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      getMyBlogs(userId, 3, currentPage - 1)
        .then((blogsResult) => {
          setBlogs(blogsResult.result);
          setNumberOfPage(blogsResult.totalPages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentPage, keyCountReload]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container" style={{ marginTop: '40px' }}>
      <div className="d-flex justify-between">
        <div className="default-title mb-4">BÀI ĐĂNG CỦA BẠN</div>
        <Fab
          title="Thêm bài đăng"
          color="primary"
          aria-label="add"
          sx={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '45px',
            height: '45px',
            backgroundColor: '#1976d2',
          }}
          onClick={() => {
            handleOpenBlogModal();
            setOption('add');
            setBlogId(undefined);
          }}
        >
          <Add sx={{ fontSize: '3rem' }} />
        </Fab>
      </div>
      {blogs.length > 0 ? (
        <>
          <Grid container spacing={2} columns={12}>
            {blogs.map((blog, index) => (
              <Grid key={index} size={{ xs: 12, md: 4 }}>
                <BlogCard
                  blog={blog}
                  canChange
                  setBlogId={setBlogId}
                  setOption={setOption}
                  setKeyCountReload={setKeyCountReload}
                  handleOpenModal={handleOpenBlogModal}
                />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={numberOfPage}
            page={currentPage}
            onChange={(event, page) => {
              if (!isLoggedIn) {
                toast.error('Bạn cần đăng nhập để xem bài đăng của mình');
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
              setCurrentPage(page);
            }}
            style={{ marginTop: '20px' }}
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: '1.6rem',
              },
            }}
          />
        </>
      ) : (
        <>
          <div
            style={{ marginTop: '50px' }}
            className="d-flex align-items-center justify-content-center flex-column"
          >
            <img
              src="https://res.cloudinary.com/dgdn13yur/image/upload/v1728187703/pjftz2gngmppamgreg4u.png"
              alt=""
              width="35%"
            />
            <h2
              className="text-center"
              style={{ fontWeight: '550', marginTop: '70px' }}
            >
              HỆ THỐNG CHƯA NHẬN ĐƯỢC BẤT KỲ BÀI ĐĂNG NÀO CỦA BẠN
            </h2>
          </div>
        </>
      )}
      <FadeModal
        open={openBlogModal}
        handleOpen={handleOpenBlogModal}
        handleClose={handleCloseBlogModal}
      >
        <BlogModal
          blogId={blogId}
          option={option}
          setKeyCountReload={setKeyCountReload}
          handleCloseModal={handleCloseBlogModal}
        />
      </FadeModal>
    </div>
  );
};

export default MyBlogs;
