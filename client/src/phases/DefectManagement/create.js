import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import { connect } from "react-redux";
import {
  AntInput,
  AntSelect,
  QuillEditorFormik,
} from "../../shared/components";
import { Formik, Form, Field } from "formik";
import { Col, Row } from "react-bootstrap";
import { Button, Card } from "antd";
import { withSnackbar } from "notistack";
import axios from "axios";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import {
  defectTypes,
  status,
  osTypes,
  priority,
} from "../../shared/constants/Types";

const initialValues = {
  defect: "",
  description: "",
  selectBuild: "",
  selectModule: "",
  defectType: "",
  os: "",
  assignTo: "",
  priority: "",
  status: "To Do",
};
const validationSchema = Yup.object().shape({
  selectBuild: Yup.string().required("Select build"),
  selectModule: Yup.string().required("Select Module"),
  defectType: Yup.string().required("Select this field"),
  defect: Yup.string().min(5, "Too Short").required("This field is Required"),
  priority: Yup.string().required("Select this field"),
  assignTo: Yup.string().required(" This field is Required"),
  status: Yup.string().required("Select this field"),
  os: Yup.string().required("Select this field"),
});

class Create extends Component {
  state = {
    loading: false,
    selectedFile: null,
    selectedFileList: [],
    build: [],
    module: [],
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
          return { label: key.build, value: key._id };
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
          return { label: key.module, value: key._id };
        });
        this.setState({
          module: [{ label: "Select Module", value: "" }].concat(moduleFromApi),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  onSubmit = (values) => {
    this.setState = {
      loading: true,
    };
    const data = {
      ...values,
      createdBy: this.props.currentUser,
      project: this.props.match.params.Pid,
    };
    axios.post("/api/defect/create", data).then((res) => {
      this.setState = {
        loading: false,
      };
      if (res.status === 200) {
        this.props.enqueueSnackbar("Fault created", {
          variant: "info",
        });
        this.props.history.push("/" + this.props.match.params.Pid + "/defect");
      }
    });
  };

  render() {
    const defectDetails = (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
      >
        {(props) => (
          <Form>
            <Card title="Create Defect">
              <Row>
                <Col>
                  <div className="mt-2">
                    <Field
                      component={AntInput}
                      type="input"
                      label="Defect Summary"
                      name="defect"
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
              <Row className="mt-3">
                <Col sm="6" md="4">
                  <div className="">
                    <Field
                      component={AntSelect}
                      name="selectBuild"
                      options={this.state.build}
                      placeholder='Select build'
                      label="Build"
                      hasFeedback
                    />
                  </div>
                </Col>
                <Col sm="6" md="4">
                  <div className="">
                    <Field
                      component={AntSelect}
                      name="selectModule"
                      placeholder='Select module'
                      options={this.state.module}
                      label="Module"
                      hasFeedback
                    />
                  </div>
                </Col>
                <Col sm="6" md="4">
                  <div className="">
                  <Field
                      component={AntSelect}
                      name="priority"
                      options={priority}
                      label="Priority"
                      hasFeedback
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="6" md="4">
                  <div className="">
                    <Field
                      component={AntSelect}
                      name="defectType"
                      options={defectTypes}
                      label="Defect Type"
                      hasFeedback
                    />
                  </div>
                </Col>
                <Col sm="6" md="4">
                  <div className="">
                    <Field
                      component={AntSelect}
                      name="os"
                      options={osTypes}
                      label="Operating system"
                      hasFeedback
                    />
                  </div>
                </Col>
                <Col sm="6" md="4">
                  <div className="">
                    <Field
                      component={AntSelect}
                      name="status"
                      options={status}
                      label="Status"
                      hasFeedback
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="6" md="4">
                  <div className="mt-2">
                    <Field
                      component={AntInput}
                      type="input"
                      label="Assign To"
                      name="assignTo"
                      hasFeedback
                    />
                  </div>
                </Col>
              </Row>
              <div className="mt-3 flex-row-reverse d-flex">
                <Button
                  loading={props.loading}
                  type="primary"
                  htmlType="submit"
                >
                  Save
                </Button>
                <Link to={"/" + this.props.match.params.Pid + "/defect"}>
                  <Button className="mr-2">Cancel</Button>
                </Link>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    );

    return (
      <Aux>
        <Row>
          <Col>{defectDetails}</Col>
        </Row>
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
