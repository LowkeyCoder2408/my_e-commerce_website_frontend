import React from 'react';
import { styled } from '@mui/material/styles';
import { toast } from 'react-toastify';
import { Button } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

interface UploadImageInputProps {
  required?: boolean;
  title: string;
  handleImageUpload: any;
}

const UploadImageInput: React.FC<UploadImageInputProps> = (props) => {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <Button
      size="small"
      component="label"
      variant="outlined"
      sx={{
        fontSize: '1.4rem',
      }}
      startIcon={<CloudUpload />}
    >
      {props.title}
      <VisuallyHiddenInput
        required={props.required}
        type="file"
        accept="image/*"
        onChange={props.handleImageUpload}
        multiple
      />
    </Button>
  );
};

export default UploadImageInput;
