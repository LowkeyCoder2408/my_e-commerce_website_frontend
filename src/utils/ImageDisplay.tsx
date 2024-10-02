import { Avatar, Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';

interface ImageDisplayProps {
  alt: string;
  src: string;
  width: number;
  height: number;
  canChangeImage: boolean;
  handleUploadImage: any;
  handleSaveImage: any;
}

const ImageDisplay = (props: ImageDisplayProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenImageModel = () => setOpen(true);
  const handleCloseImageModel = () => setOpen(false);

  return (
    <>
      <Box
        sx={{
          position: 'relative',
          display: 'inline-block',
          width: `${props.width}px`,
          height: `${props.height}px`,
          '&:hover .action-buttons': {
            transform: 'translateX(-50%) scale(1)',
          },
        }}
      >
        <Avatar
          alt={props.alt}
          src={props.src}
          style={{
            border: '7px solid #17a2b8',
          }}
          sx={{
            width: '100%',
            height: '100%',
          }}
        />
        <Box
          className="action-buttons"
          sx={{
            position: 'absolute',
            left: '50%',
            bottom: '5px',
            transform: 'translateX(-50%) scale(0)',
            display: 'flex',
            gap: 1,
            transition: 'transform 0.3s ease',
            zIndex: 10,
          }}
        >
          <IconButton
            title="Xem ảnh"
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
            onClick={handleOpenImageModel}
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            title="Thay đổi ảnh"
            sx={{
              backgroundColor: '#fff',
              color: '#000',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
            onClick={() => document.getElementById('upload-avatar')?.click()}
          >
            <EditIcon />
            <input
              type="file"
              id="upload-avatar"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={props.handleUploadImage}
            />
          </IconButton>
          {props.canChangeImage && (
            <IconButton
              title="Lưu ảnh"
              sx={{
                backgroundColor: '#fff',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
              onClick={props.handleSaveImage}
            >
              <SaveIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      <Modal
        open={open}
        onClose={handleCloseImageModel}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%',
          }}
        >
          <IconButton
            onClick={handleCloseImageModel}
            sx={{
              position: 'absolute',
              backgroundColor: '#fff',
              width: 20,
              height: 20,
              color: '#000',
              top: -8,
              right: -8,
              zIndex: 8,

              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 15 }} />
          </IconButton>
          <Box
            component="img"
            src={props.src}
            alt={props.alt}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              borderColor: 'none',
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ImageDisplay;
