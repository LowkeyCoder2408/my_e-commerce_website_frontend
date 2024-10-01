import { Avatar, Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface ImageDisplayProps {
  alt: string;
  src: string;
  width: number;
  height: number;
}

const ImageDisplay = (props: ImageDisplayProps) => {
  const [open, setOpen] = useState(false);

  const handleOpenImageModel = () => setOpen(true);
  const handleCloseImageModel = () => setOpen(false);

  return (
    <>
      <Avatar
        alt={props.alt}
        src={props.src}
        style={{
          border: '7px solid #17a2b8',
        }}
        sx={{
          width: `${props.width}px`,
          height: `${props.height}px`,
          cursor: 'pointer',
        }}
        onClick={handleOpenImageModel}
      />
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
