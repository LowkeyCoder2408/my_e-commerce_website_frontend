import { forwardRef } from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';

const QuillWrapper = forwardRef<HTMLDivElement, ReactQuillProps>(
  (props, ref) => (
    <div ref={ref}>
      <ReactQuill {...props} />
    </div>
  ),
);

export default QuillWrapper;
