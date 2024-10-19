import { TextareaAutosize } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { ChangeCircle, NoteAdd } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { isTokenExpired } from '../../../utils/Service/JwtService';
import { useAuth } from '../../../utils/Context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { backendEndpoint } from '../../../utils/Service/Constant';
import { getBlogCommentById } from '../../../api/BlogCommentAPI';

interface BlogCommentModalProps {
  blogCommentId: number | undefined;
  blogId: number | undefined;
  parentBlogCommentId?: number | undefined;
  option: string;
  setKeyCountReload: Dispatch<SetStateAction<number>>;
  handleCloseModal: () => void;
}

const BlogCommentModal = (props: BlogCommentModalProps) => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [content, setContent] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      toast.error('Bạn cần đăng nhập để cập nhật bình luận của mình');
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

    const request = {
      option: props.option,
      ...((props.option === 'add' || props.option === 'reply') && {
        blogId: props.blogId,
      }),
      content: content,
      ...(props.option === 'reply' &&
        props.parentBlogCommentId && {
          parentBlogCommentId: props.parentBlogCommentId,
        }),
      ...(props.option === 'update' &&
        props.blogCommentId && {
          blogCommentId: props.blogCommentId,
        }),
    };

    if (props.option === 'add' || props.option === 'reply') {
      const response = await fetch(
        backendEndpoint + '/blog-comments/add-comment',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
          },
          body: JSON.stringify(request),
        },
      );

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        toast.success(data.message || 'Thêm bình luận mới thành công');
        setContent('');
        props.handleCloseModal();
        props.setKeyCountReload(Math.random());
      } else {
        toast.error(data.message || 'Đã xảy ra lỗi, xin vui lòng thử lại');
      }
    } else {
      const response = await fetch(
        backendEndpoint + '/blog-comments/update-comment',
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-type': 'application/json',
          },
          body: JSON.stringify(request),
        },
      );

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        toast.success(data.message || 'Chỉnh sửa bình luận thành công');
        setContent('');
        props.handleCloseModal();
        props.setKeyCountReload(Math.random());
      } else {
        toast.error(data.message || 'Đã xảy ra lỗi, xin vui lòng thử lại');
      }
    }
    setSubmitLoading(false);
  };

  useEffect(() => {
    if (props.blogCommentId !== undefined && props.option === 'update') {
      getBlogCommentById(props.blogCommentId).then((blogCommentResult) => {
        setContent(blogCommentResult.content);
      });
    }
  }, [props.blogCommentId, props.option]);

  return (
    <>
      <div className="default-title text-center">
        {props.option === 'add'
          ? 'THÊM BÌNH LUẬN MỚI'
          : props.option === 'reply'
            ? 'PHẢN HỒI BÌNH LUẬN'
            : 'CHỈNH SỬA BÌNH LUẬN'}
      </div>
      <div className="mb-4">
        <TextareaAutosize
          className="mt-4"
          aria-label={`Nội dung ${props.option === 'reply' ? 'phản hồi' : 'bình luận'}`}
          placeholder={`Nhập nội dung ${props.option === 'reply' ? 'phản hồi' : 'bình luận'} của bạn`}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          value={content}
          maxLength={100}
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '20px',
            borderRadius: '5px',
          }}
        />
      </div>
      <div className="mt-4">
        <LoadingButton
          disabled={content.trim() === '' || content.length > 100}
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
              content.trim() === '' || content.length > 100 || submitLoading
                ? 0.5
                : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          <div className="text-white" style={{ fontSize: '1.6rem' }}>
            {props.option === 'add' ? (
              <>Tạo bình luận</>
            ) : props.option === 'reply' ? (
              <>Phản hồi bình luận</>
            ) : (
              <>Chỉnh sửa bình luận</>
            )}
          </div>
        </LoadingButton>
      </div>
    </>
  );
};

export default BlogCommentModal;
