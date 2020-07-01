import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form } from 'react-bootstrap';

class Editorr extends Component {
  

 
  render() {
    
    return (
      <div>
        <Form.Label>{this.props.label}</Form.Label>
        <ReactQuill theme="snow"
          modules={Editorr.modules}
          formats={Editorr.formats} 
          {...this.props}
        />
      </div>
    )
  }
  
}
Editorr.modules = {
  toolbar: [
    [{ 'header': 1 }, { 'header': 2 }, {font:[]}],
    [{ 'size': [ 'small', false, 'large', 'huge' ]}],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    [ 'code-block', 'link', 'image', 'video'],
    ['clean']
  ],
}
 

Editorr.formats = [
  'header', 'font',
  'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'code-block', 'link','image','video',
  'clean'
];

export default Editorr;



