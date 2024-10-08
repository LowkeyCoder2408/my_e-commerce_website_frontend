import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import BlogCategoryModel from '../../../models/BlogCategoryModel';
import { getAllBlogCategories } from '../../../api/BlogCategoriAPI';
import BlogModel from '../../../models/BlogModel';
import { getAllFilteredBlogs, getAndFindBlogs } from '../../../api/BlogAPI';
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Pagination,
} from '@mui/material';
import BlogCard from '../../Blog/components/BlogCard';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Loader from '../../../utils/Loader';

export default function MainContent() {
  const [keyword, setKeyword] = useState<string>('');
  const [keywordTemp, setKeywordTemp] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<BlogModel[]>([]);
  const [blogCategories, setBlogCategories] = useState<BlogCategoryModel[]>([]);
  const [blogCategorySelected, setBlogCategorySelected] =
    useState<string>('Tất cả');
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [numberOfPageTemp, setTotalPageTemp] = useState(numberOfPage);
  const [currentPage, setCurrentPage] = useState(1);

  if (numberOfPageTemp !== numberOfPage) {
    setCurrentPage(1);
    setTotalPageTemp(numberOfPage);
  }

  useEffect(() => {
    getAllBlogCategories().then((blogCategoriesResult) => {
      setBlogCategories(blogCategoriesResult);
    });
  }, []);

  useEffect(() => {
    const isKeywordValid =
      keyword !== null && keyword !== undefined && keyword.trim() !== '';
    setIsLoading(true);
    if (!isKeywordValid) {
      getAllFilteredBlogs(6, currentPage - 1, blogCategorySelected)
        .then((blogsResult) => {
          setBlogs(blogsResult.result);
          setNumberOfPage(blogsResult.totalPages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getAndFindBlogs(6, currentPage - 1, blogCategorySelected, keyword)
        .then((blogsResult) => {
          setBlogs(blogsResult.result);
          setNumberOfPage(blogsResult.totalPages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [currentPage, blogCategorySelected, keyword]);

  const handleSearch = () => {
    setKeyword(keywordTemp);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <FormControl
          sx={{ width: { xs: '100%', md: '25ch' } }}
          variant="outlined"
        >
          <OutlinedInput
            size="small"
            id="search"
            placeholder="Tìm kiếm bài đăng..."
            sx={{ flexGrow: 1 }}
            startAdornment={
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="medium" />
              </InputAdornment>
            }
            value={keywordTemp}
            onChange={(e) => setKeywordTemp(e.target.value)}
            onKeyPress={handleKeyPress}
            inputProps={{
              'aria-label': 'search',
            }}
            style={{ fontSize: '1.3rem' }}
          />
        </FormControl>
        <IconButton size="small" aria-label="RSS feed" onClick={handleSearch}>
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 1,
            overflowX: 'auto',
            '&::-webkit-scrollbar': {
              height: '5px',
            },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: '5px',
            },
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'transparent',
            },
          }}
        >
          {blogCategories.length > 0 ? (
            <>
              <Chip
                onClick={() => setBlogCategorySelected('Tất cả')}
                label="Tất cả"
                sx={{
                  marginY: '8px',
                  fontSize: '1.6rem',
                  backgroundColor:
                    blogCategorySelected === 'Tất cả'
                      ? 'rgb(20, 37, 41)'
                      : 'transparent',
                  color:
                    blogCategorySelected === 'Tất cả'
                      ? '#fff'
                      : 'rgb(20, 37, 41)',
                  '&:hover': {
                    backgroundColor:
                      blogCategorySelected === 'Tất cả'
                        ? 'rgb(20, 37, 41)'
                        : 'rgb(208, 208, 208)',
                  },
                }}
              />
              {blogCategories.map((blogCategory, index) => (
                <Chip
                  key={index}
                  onClick={() => setBlogCategorySelected(blogCategory.name)}
                  label={blogCategory.name}
                  sx={{
                    marginY: '8px',
                    fontSize: '1.6rem',
                    backgroundColor:
                      blogCategory.name === blogCategorySelected
                        ? 'rgb(20, 37, 41)'
                        : 'transparent',
                    color:
                      blogCategory.name === blogCategorySelected
                        ? '#fff'
                        : 'rgb(20, 37, 41)',
                    '&:hover': {
                      backgroundColor:
                        blogCategory.name === blogCategorySelected
                          ? 'rgb(20, 37, 41)'
                          : 'rgb(208, 208, 208)',
                    },
                  }}
                />
              ))}
            </>
          ) : (
            <>Không có danh mục bài đăng</>
          )}
        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
            marginY: '8px',
          }}
        >
          <FormControl
            sx={{ width: { xs: '100%', md: '25ch' } }}
            variant="outlined"
          >
            <OutlinedInput
              size="small"
              id="search"
              type="text"
              placeholder="Tìm kiếm bài đăng..."
              sx={{ flexGrow: 1 }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="medium" />
                </InputAdornment>
              }
              value={keywordTemp}
              onChange={(e) => setKeywordTemp(e.target.value)}
              onKeyPress={handleKeyPress}
              inputProps={{
                'aria-label': 'search',
              }}
              style={{ fontSize: '1.3rem' }}
            />
          </FormControl>
          <IconButton
            size="medium"
            aria-label="RSS feed"
            onClick={handleSearch}
          >
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
      {keyword && (
        <div
          className="alert alert-success alert-dismissible mb-0 position-relative"
          role="alert"
        >
          Kết quả tìm kiếm cho: <strong>{keyword}</strong>
          <button
            type="button"
            className="btn-close "
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '7px',
              right: '7px',
              width: '10px',
              height: '10px',
              padding: '0',
            }}
            onClick={() => {
              setKeyword('');
              setKeywordTemp('');
            }}
          ></button>
        </div>
      )}
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
              style={{ fontWeight: '550', marginTop: '50px' }}
            >
              RẤT TIẾC, KHÔNG CÓ BÀI ĐĂNG NÀO PHÙ HỢP VỚI NHU CẦU CỦA BẠN
            </h2>
          </div>
        </>
      )}
    </Box>
  );
}
