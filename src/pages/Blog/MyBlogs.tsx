import { useEffect, useState } from 'react';
import BlogModel from '../../models/BlogModel';
import { getMyBlogs } from '../../api/BlogAPI';
import { getUserIdByToken } from '../../utils/Service/JwtService';
import Loader from '../../utils/Loader';
import { useAuth } from '../../utils/Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Fab, Pagination } from '@mui/material';
import Grid from '@mui/material/Grid2';
import BlogCard from './components/BlogCard';
import { Add } from '@mui/icons-material';
import { FadeModal } from '../../utils/FadeModal';
import BlogModal from './components/BlogModal';

const MyBlogs = () => {
  const userId = getUserIdByToken();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [numberOfPageTemp, setTotalPageTemp] = useState(numberOfPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogId, setBlogId] = useState<number>(0);
  const [option, setOption] = useState('');
  const [openBlogModal, setOpenBlogModal] = useState<boolean>(false);

  const handleOpenBlogModal = () => setOpenBlogModal(true);
  const handleCloseBlogModal = () => {
    // setBlogId(0);
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
  }, [currentPage]);

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
            setBlogId(0);
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
                <BlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={numberOfPage}
            page={currentPage}
            onChange={(event, page) => {
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
          handleCloseModal={handleCloseBlogModal}
        />
      </FadeModal>
    </div>
  );
};

export default MyBlogs;
