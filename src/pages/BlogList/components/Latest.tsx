import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';
import BlogModel from '../../../models/BlogModel';
import LatestBlogCard from '../../Blog/BlogCard/LatestBlogCard';
import { getNewestBlogs } from '../../../api/BlogAPI';
import { toast } from 'react-toastify';
import Loader from '../../../utils/Loader';

export default function Latest() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<BlogModel[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getNewestBlogs(6)
      .then((blogsResult) => {
        setBlogs(blogsResult.result);
      })
      .catch((error) => {
        toast.error('Đã xảy ra lỗi khi lấy danh sách bài đăng mới nhất');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="default-title mt-5">BÀI ĐĂNG MỚI NHẤT</div>
      {blogs.length > 0 ? (
        <>
          <Grid container spacing={2} columns={12} sx={{ my: 4 }}>
            {blogs.map((blog, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6 }}>
                <LatestBlogCard blog={blog} />
              </Grid>
            ))}
          </Grid>
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
              style={{ fontWeight: '550', marginTop: '50px' }}
            >
              KHÔNG THỂ TRUY XUẤT DANH SÁCH BÀI ĐĂNG MỚI NHẤT
            </h2>
          </div>
        </>
      )}
    </>
  );
}
