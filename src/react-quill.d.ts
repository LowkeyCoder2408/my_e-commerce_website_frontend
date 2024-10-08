declare module 'react-quill' {
  import { Component } from 'react';

  interface ReactQuillProps {
    value: string;
    onChange: (content: string) => void;
    modules?: object;
    formats?: string[];
    placeholder?: string;
    readOnly?: boolean;
    theme?: string;
  }

  export default class ReactQuill extends Component<ReactQuillProps> {}
}
