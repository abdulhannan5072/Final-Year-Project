import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { withSnackbar } from "notistack";
import Aux from "../../../hoc/_Aux";
import { Form, Field } from "formik";
import { Col, Row } from "react-bootstrap";
import { AntInput, AntSelect } from "../../../shared/components";
import { Button, Card } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { QuillEditorFormik } from "../../../shared/components";
import { faultTypes } from "../../../shared/constants/Types";

const initialValues = {
  selectBuild: "",
  selectModule: "",
  faultType: "",
  fault: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  selectBuild: Yup.string().required("Required"),
  selectModule: Yup.string().required("Required"),
  faultType: Yup.string().required("Required"),
  fault: Yup.string()
    .required("Required")
    .min(2, "Too Short ")
    .max(6, "Too Long "),
});

class Create extends Component {
  state = {
    loading: false,
    build: [],
    module: [],
    selectedFile: null,
    selectedFileList: [],
  };

  componentDidMount() {
    this.getBuild();
    this.getModule();
  }

  getBuild = async () => {
    try {
      const res = await axios.get(
        "/api/getBuild/" + this.props.match.params.Pid
      );
      if (res.data) {
        let buildFromApi = res.data.map((key) => {
          return { label: key.build, value: key.build };
        });
        this.setState({
          build: [{ label: "Select build", value: "" }].concat(buildFromApi),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getModule = async () => {
    try {
      const res = await axios.get(
        "/api/getModule/" + this.props.match.params.Pid
      );
      if (res.data) {
        let moduleFromApi = res.data.map((key) => {
          return { label: key.module, value: key.module };
        });
        this.setState({
          module: [{ label: "Select Module", value: "" }].concat(moduleFromApi),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = (values, { setSubmitting }) => {
    this.setState = {
      loading: true,
    };
    const data = {
      ...values,
      user: this.props.currentUser,
      project: this.props.match.params.Pid,
    };
    axios.post("/api/correctivemaintenance/create", data).then((res) => {
      this.setState = {
        loading: false,
      };
      if (res.status === 200) {
        this.props.enqueueSnackbar("Fault created", {
          variant: "success",
        });
        this.props.history.push(
          "/" + this.props.match.params.Pid + "/changePhase/faultRepairs"
        );
      }
    });
  };

  render() {
    return (
      <Aux>
        <div className="page">
          <Card title="Corrective Maintenance" bordered={false}>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={this.onSubmit}
            >
              {(props) => (
                <Form>
                  <Row className="mt-4">
                    <Col sm="6" md="4">
                      <div>
                        <Field
                          component={AntSelect}
                          name="selectBuild"
                          options={this.state.build}
                          as="select"
                          label="Select Build"
                          hasFeedback
                        />
                      </div>
                    </Col>
                    <Col sm="6" md="4">
                      <div className="">
                        <Field
                          component={AntSelect}
                          name="selectModule"
                          options={this.state.module}
                          label="Select Module"
                          hasFeedback
                        />
                      </div>
                    </Col>
                    <Col sm="6" md="4">
                      <div className="">
                        <Field
                          component={AntSelect}
                          name="faultType"
                          options={faultTypes}
                          label="Type of Fault"
                          hasFeedback
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mt-2">
                        <Field
                          component={AntInput}
                          type="input"
                          label="Fault"
                          name="fault"
                          onChange={props.handleChange}
                          hasFeedback
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mt-2">
                        <QuillEditorFormik
                          label="Detail Description"
                          name="description"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {/* <Upload
                        fileList={this.state.selectedFileList}
                        customRequest={this.uploadRequest}
                        onChange={this.onChange}
                        accept='.doc,.docx,.pdf'
                        // beforeUpload= {file => {
                        //   this.setState(state => ({
                        //     fileList: [...state.fileList, file],
                        //   }));
                        //   return false;
                        // }}
                      >
                        <Button>
                          <UploadOutlined /> Click to Upload
                        </Button>
                      </Upload> */}
                    </Col>
                  </Row>
                  <div className="mt-5 flex-row-reverse d-flex">
                    <Button
                      loading={props.loading}
                      type="primary"
                      htmlType="submit"
                    >
                      Save
                    </Button>
                    <Link
                      to={
                        "/" +
                        this.props.match.params.Pid +
                        "/changePhase/faultRepairs"
                      }
                    >
                      <Button className="mr-2">Cancel</Button>
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </Card>
        </div>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user.userId,
  };
};

export default connect(mapStateToProps)(withSnackbar(Create));
