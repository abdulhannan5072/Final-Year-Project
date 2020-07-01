import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form } from 'react-bootstrap';

class QuillEditor extends Component {
  render() {
    
    return (
      <div>
        <Form.Label>{this.props.label}</Form.Label>
        <ReactQuill theme="snow"
          modules={QuillEditor.modules}
          formats={QuillEditor.formats} 
          {...this.props}
        />
      </div>
    )
  }
  
}
QuillEditor.modules = {
  toolbar: [
    [{ 'header': 1 }, { 'header': 2 }, {font:[]}],
    [{ 'size': [ 'small', false, 'large', 'huge' ]}],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    [ 'code-block', 'link', 'image', 'video'],
    ['clean']
  ],
}
 

QuillEditor.formats = [
  'header', 'font',
  'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'code-block', 'link','image','video',
  'clean'
];

export default QuillEditor;



