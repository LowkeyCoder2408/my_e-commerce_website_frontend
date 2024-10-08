import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import BlogCategoryModel from '../../../models/BlogCategoryModel';
import { getAllBlogCategories } from '../../../api/BlogCategoriAPI';
import LoadingButton from '@mui/lab/LoadingButton';
import { ChangeCircle, NoteAdd } from '@mui/icons-material';
// import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';

interface BlogModalProps {
  blogId: number;
  option: string;
  handleCloseModal: () => void;
}

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['bold', 'italic', 'underline', 'strike'],
    ['link', 'image'],
    [{ align: [] }],
    ['clean'],
  ],
};

const BlogModal = (props: BlogModalProps) => {
  const [title, setTitle] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState('');
  const [blogCategories, setBlogCategories] = useState<BlogCategoryModel[]>([]);
  const [blogCategoryName, setBlogCategoryName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [errorContent, setErrorContent] = useState('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  // Hàm check có đúng định dạng không
  const checkEmpty = (setErrorFunction: any, content: string) => {
    if (content.trim() === '') {
      setErrorFunction('Trường này không được để trống');
      return true;
    } else {
      setErrorFunction('');
      return false;
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
  };

  useEffect(() => {
    getAllBlogCategories().then((blogCategoriesResult) => {
      setBlogCategories(blogCategoriesResult);
    });
  }, []);

  useEffect(() => {
    console.log('Object: ', { title, blogCategoryName });
    console.log('Error: ', { errorTitle });
  }, [title, blogCategoryName, errorTitle]);

  return (
    <>
      <div>
        BlogModal, {props.option?.toString()}, {props.blogId}
      </div>
      <div className="default-title text-center">
        {props.option === 'add' ? 'TẠO BÀI ĐĂNG MỚI' : 'CHỈNH SỬA BÀI ĐĂNG'}
      </div>
      <div className="mb-4">
        <TextField
          required
          fullWidth
          helperText={errorTitle}
          type="text"
          id="standard-required"
          label="Tiêu đề bài đăng"
          value={title}
          error={errorTitle.length > 0}
          variant="standard"
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e: any) => {
            checkEmpty(setErrorTitle, e.target.value);
          }}
          className="input-field"
          InputLabelProps={{
            style: { fontSize: '1.5rem' },
          }}
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '1.6rem',
              fontWeight: '500',
            },
            '& .MuiFormHelperText-root': {
              fontSize: '1rem',
            },
          }}
        />
      </div>
      <div className="mt-4">
        <FormControl fullWidth variant="standard">
          <InputLabel
            id="demo-simple-select-standard-label"
            sx={{ fontSize: '1.5rem' }}
          >
            Chọn danh mục bài đăng
          </InputLabel>
          <Select
            required
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            variant="standard"
            value={blogCategoryName}
            onChange={(e) => {
              setBlogCategoryName(e.target.value + '');
            }}
            sx={{
              '& .MuiSelect-select': {
                fontSize: '1.6rem',
                fontWeight: '500',
              },
            }}
          >
            <MenuItem value="">
              <em>Chưa chọn danh mục bài đăng</em>
            </MenuItem>
            {blogCategories.map((blogCategory) => (
              <MenuItem key={blogCategory.id} value={blogCategory.name}>
                {blogCategory.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {/* <div className="mt-4">
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
        />
      </div> */}
      <div className="mt-4">
        <LoadingButton
          disabled={errorTitle.length > 0 || blogCategoryName.trim() === ''}
          fullWidth
          onClick={handleSubmit}
          loading={submitLoading}
          loadingPosition="start"
          startIcon={props.option === 'add' ? <NoteAdd /> : <ChangeCircle />}
          sx={{
            marginTop: '7px',
            padding: '3px 0',
            color: '#fff',
            backgroundColor: 'primary.light',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
            '& svg': {
              color: 'white',
            },
            border: 'none',
            opacity:
              errorTitle.length > 0 ||
              blogCategoryName.trim() === '' ||
              submitLoading
                ? 0.5
                : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div className="text-white" style={{ fontSize: '1.6rem' }}>
            {props.option === 'add' ? (
              <>Tạo bài đăng</>
            ) : (
              <>Chỉnh sửa bài đăng</>
            )}
          </div>
        </LoadingButton>
      </div>
    </>
  );
};

export default BlogModal;
