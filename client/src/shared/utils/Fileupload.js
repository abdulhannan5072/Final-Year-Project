import React, { Component } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message, Modal } from "antd";

const { Dragger } = Upload;

class Fileupload extends Component {
  state = {
    selectedFile: [],
    modelVisible: "true",
  };

  setModal = (modelV) => {
    this.setState({
      modelVisible: modelV,
    });
  };

  uploadRequest = async ({ file, onSuccess, onProgress }) => {
    const userId = this.props.authInfo.userId;

    const formData = new FormData();
    formData.append("file", file);
    formData.append = ("user", userId);

    try {
      const res = await axios.post("/api/upload", formData);
      // console.log(res);
      onProgress(e => {
        console.log(e)
      });
    } catch (error) {
      console.log(error);
    }
  };

  onChange = (info) => {
    // const file = event.target.files[0];
    // setSelectedFile(file);
    console.log(info);
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  render() {
    console.log();
    return (
      <form>
        {/* <input type="file" onChange={onChange} />
      <button onClick={uploadRequest}>upload</button> */}

        <Modal
          title="Upload"
          centered
          maskClosable={false}
          visible={this.state.modelVisible}
          onOk={() => this.setModal(false)}
          onCancel={() => this.setModal(false)}
        >
          <Dragger
            action='/api/upload'
            data={{
              user: this.props.authInfo.userId 
            }}
            // customRequest={this.uploadRequest}
            onChange={this.onChange}
            listType= 'picture'
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
        </Modal>

        <Upload
          fileList={this.state.selectedFile}
          customRequest={this.uploadRequest}
          onChange={this.onChange}
        >
          <Button>
            <UploadOutlined /> Click to Upload
          </Button>
        </Upload>
      </form>
    );
  }
}

export default Fileupload;
