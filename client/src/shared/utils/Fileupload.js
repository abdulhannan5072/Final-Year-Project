import React, { useState } from "react";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";

function Fileupload() {
  const [selectedFile, setSelectedFile] = useState();

  const uploadRequest = async ({ file, onSuccess }) => {
    // e.preventDefault();
    // console.log(selectedFile);

    const formData = new FormData();
    formData.append("file", file);
    // formData.append = ('user',this.props.match.params.Pid);

    try {
      const res = await axios.post("/api/upload", formData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (info) => {
    // const file = event.target.files[0];
    // setSelectedFile(file);
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <form>
      {/* <input type="file" onChange={onChange} />
      <button onClick={uploadRequest}>upload</button> */}
      <Upload
        fileList={selectedFile}
        customRequest={uploadRequest}
        onChange={onChange}
      >
        <Button>
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>
    </form>
  );
}

export default Fileupload;
