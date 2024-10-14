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
import 'react-quill/dist/quill.snow.css';
import UploadImageInput from '../../../utils/UploadImageInput';
import { toast } from 'react-toastify';
import { addABlog, getBlogById, updateABlog } from '../../../api/BlogAPI';
import { useQuill } from 'react-quilljs';
import BlogModel from '../../../models/BlogModel';
import { isTokenExpired } from '../../../utils/Service/JwtService';
import { useAuth } from '../../../utils/Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

interface BlogModalProps {
  blogId: number | undefined;
  option: string;
  setKeyCountReload: any;
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
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState<string>('');
  const [errorTitle, setErrorTitle] = useState('');
  const [blog, setBlog] = useState<BlogModel | null>(null);
  const [blogCategories, setBlogCategories] = useState<BlogCategoryModel[]>([]);
  const [blogCategoryName, setBlogCategoryName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const { quill, quillRef } = useQuill();

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
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để cập nhật bài đăng của mình');
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

    setSubmitLoading(true);
    if (props.option === 'add') {
      addABlog(title, blogCategoryName, content as string, imageFile)
        .then((data) => {
          if (data.status === 'success') {
            toast.success(data.message || 'Thêm bài đăng mới thành công');
            setTitle('');
            setBlogCategoryName('');
            setContent('');
            setImageFile(null);
            setImagePreview('');
            props.handleCloseModal();
            props.setKeyCountReload(Math.random());
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
    } else {
      if (props.blogId) {
        updateABlog(
          props.blogId,
          title,
          blogCategoryName,
          content as string,
          imageFile,
        )
          .then((data) => {
            if (data.status === 'success') {
              toast.success(data.message || 'Cập nhật bài đăng thành công');
              setTitle('');
              setBlogCategoryName('');
              setContent('');
              setImageFile(null);
              setImagePreview('');
              props.handleCloseModal();
              props.setKeyCountReload(Math.random());
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
      }
    }
  };

  useEffect(() => {
    Promise.all([
      getAllBlogCategories(),
      props.blogId !== undefined && getBlogById(props.blogId),
    ]).then(([blogCategoriesResult, blogResult]) => {
      setBlogCategories(blogCategoriesResult);
      blogResult && setBlog(blogResult);
    });
  }, []);

  useEffect(() => {
    if (props.blogId !== undefined) {
      getBlogById(props.blogId).then((blogResult) => {
        setTitle(blogResult.title);
        setBlogCategoryName(blogResult.blogCategory.name || '');
        setContent(blogResult.content);
        setImagePreview(blogResult.featuredImage);
        if (quill) {
          quill.clipboard.dangerouslyPasteHTML(blogResult.content);
        }
      });
    }
  }, [props.blogId, quill]);

  useEffect(() => {
    if (quill)
      quill.on('text-change', () => {
        setContent(quillRef.current.firstChild.innerHTML);
      });
  }, [quill]);

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
        <div style={{ height: 200 }} ref={quillRef}></div>
      </div>
      <div className="d-flex mt-3">
        <UploadImageInput
          required
          title={props.option === 'add' ? 'Thêm ảnh' : 'Chỉnh sửa ảnh'}
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
            props.option === 'add'
              ? errorTitle.length > 0 ||
                blogCategoryName.trim() === '' ||
                new DOMParser()
                  .parseFromString(content.toString(), 'text/html')
                  .documentElement.textContent?.replace(/<[^>]+>/g, '')
                  .trim() === '' ||
                (!imageFile && imagePreview.trim() === '')
              : errorTitle.length > 0 ||
                blogCategoryName.trim() === '' ||
                new DOMParser()
                  .parseFromString(content.toString(), 'text/html')
                  .documentElement.textContent?.replace(/<[^>]+>/g, '')
                  .trim() === '' ||
                (!imageFile && imagePreview.trim() === '') ||
                (title.trim() === blog?.title &&
                  blogCategoryName.trim() === blog?.blogCategory?.name &&
                  content.trim() === blog?.content &&
                  imagePreview === blog?.featuredImage)
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
              (!imageFile && imagePreview.trim() === '') ||
              (title.trim() === blog?.title &&
                blogCategoryName.trim() === blog?.blogCategory?.name &&
                content.trim() === blog?.content &&
                imagePreview === blog?.featuredImage) ||
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
