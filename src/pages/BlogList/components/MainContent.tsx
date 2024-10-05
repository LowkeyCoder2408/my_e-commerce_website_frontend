import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import BlogCategoryModel from '../../../models/BlogCategoryModel';
import { getAllBlogCategories } from '../../../api/BlogCategoriAPI';
import BlogModel from '../../../models/BlogModel';
import { getAllFilteredBlogs } from '../../../api/BlogAPI';
import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  Pagination,
} from '@mui/material';
import BlogCard from '../../Blog/BlogCard';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export default function MainContent() {
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
    Promise.all([
      getAllFilteredBlogs(6, currentPage - 1, blogCategorySelected),
    ]).then(([blogsResult]) => {
      setBlogs(blogsResult.result);
      setNumberOfPage(blogsResult.totalPages);
    });
  }, [currentPage, blogCategorySelected]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
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
            inputProps={{
              'aria-label': 'search',
            }}
            style={{ fontSize: '1.3rem' }}
          />
        </FormControl>
        <IconButton size="small" aria-label="RSS feed">
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
                blogCategorySelected === 'Tất cả' ? '#fff' : 'rgb(20, 37, 41)',
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
              placeholder="Tìm kiếm bài đăng..."
              sx={{ flexGrow: 1 }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchRoundedIcon fontSize="medium" />
                </InputAdornment>
              }
              inputProps={{
                'aria-label': 'search',
              }}
              style={{ fontSize: '1.3rem' }}
            />
          </FormControl>
          <IconButton size="medium" aria-label="RSS feed">
            <RssFeedRoundedIcon />
          </IconButton>
        </Box>
      </Box>
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
    </Box>
  );
}
