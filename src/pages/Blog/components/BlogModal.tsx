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
import { ChangeCircle, CloudUpload, NoteAdd } from '@mui/icons-material';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import UploadImageInput from '../../../utils/UploadImageInput';
import { toast } from 'react-toastify';
import { addABlog } from '../../../api/BlogAPI';

interface BlogModalProps {
  blogId: number;
  option: string;
  fetchBlogs: () => Promise<void>;
  handleCloseModal: () => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }, { font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    [{ color: [] }, { background: [] }],
    ['link'],
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
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
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

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files.length > 1) {
        toast.error(`Bạn chỉ được upload tối đa 1 ảnh`);
        return;
      }
      const selectedImage = event.target.files[0];
      setImageFile(selectedImage);
      setImagePreview(URL.createObjectURL(selectedImage));
    }
  };

  const handleSubmit = async () => {
    setSubmitLoading(true);
    addABlog(title, blogCategoryName, content, imageFile)
      .then((data) => {
        if (data.status === 'success') {
          toast.success(data.message || 'Thêm bài đăng mới thành công');
          setTitle('');
          setBlogCategoryName('');
          setContent('');
          setImageFile(null);
          setImagePreview('');
          props.handleCloseModal();
          props.fetchBlogs();
        } else {
          toast.error(data.message || 'Đã có lỗi xảy ra, vui lòng thử lại');
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error('Đã có lỗi trong quá trình xử lý');
      })
      .finally(() => {
        setSubmitLoading(false);
      });
  };

  useEffect(() => {
    getAllBlogCategories().then((blogCategoriesResult) => {
      setBlogCategories(blogCategoriesResult);
    });
  }, []);

  useEffect(() => {
    console.log('Object: ', {
      title,
      blogCategoryName,
      content,
      imageFile,
      imagePreview,
    });
    console.log('Error: ', { errorTitle });
  }, [title, blogCategoryName, content, errorTitle, imageFile, imagePreview]);

  return (
    <>
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
      <div className="mt-5">
        <div className="default-title mb-3">Nội dung bài đăng</div>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
        />
      </div>
      <div className="d-flex mt-3">
        <UploadImageInput
          required
          title="Thêm ảnh"
          handleImageUpload={handleUploadImage}
        />
      </div>
      {imagePreview && (
        <div
          className="mt-3 position-relative"
          style={{ width: '450px', maxWidth: '100%', borderRadius: '5px' }}
        >
          <img src={imagePreview} alt="" style={{ borderRadius: '5px' }} />
          <button
            onClick={() => {
              setImageFile(null);
              setImagePreview('');
            }}
            style={{
              position: 'absolute',
              top: '-12px',
              right: '-12px',
              backgroundColor: '#ff3e3e',
              color: '#fff',
              border: '2px solid #fff',
              width: '24px',
              height: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '2rem',
              fontWeight: '600',
            }}
          >
            &times;
          </button>
        </div>
      )}
      <div className="mt-4">
        <LoadingButton
          disabled={
            errorTitle.length > 0 ||
            blogCategoryName.trim() === '' ||
            new DOMParser()
              .parseFromString(content.toString(), 'text/html')
              .documentElement.textContent?.replace(/<[^>]+>/g, '')
              .trim() === '' ||
            !imageFile
          }
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
              new DOMParser()
                .parseFromString(content.toString(), 'text/html')
                .documentElement.textContent?.replace(/<[^>]+>/g, '')
                .trim() === '' ||
              !imageFile ||
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
