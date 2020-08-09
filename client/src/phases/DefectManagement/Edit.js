import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { withSnackbar } from "notistack";
import Aux from "../../hoc/_Aux";
import { Form, Field } from "formik";
import { Col, Row } from "react-bootstrap";
import { Button, Card } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  AntInput,
  AntSelect,
  AutoComplete,
  QuillEditorFormik,
} from "../../shared/components";
import { dateFormat, formatDate } from "../../shared/utils/dateTime";
import moment from "moment";
import {
  defectTypes,
  status,
  osTypes,
  priority,
} from "../../shared/constants/Types";
import { search } from "../../shared/utils/AsyncFetch";

const validationSchema = Yup.object().shape({
  selectBuild: Yup.string().required("Select build"),
  selectModule: Yup.string().required("Select Module"),
  defectType: Yup.string().required("Select this field"),
  defect: Yup.string().min(5, "Too Short").required("This field is Required"),
  priority: Yup.string().required("Select this field"),
  // assignTo: Yup.string().required(" This field is Required"),
  status: Yup.string().required("Select this field"),
  os: Yup.string().required("Select this field"),
});

class Edit extends Component {
  state = {
    loading: false,
    data: {
      defect: "",
      description: "",
      selectBuild: "",
      selectModule: "",
      defectType: "",
      os: "",
      assignTo: "",
      priority: "",
      status: "",
      options: [],
    value: "",
    username: "",
    },

    selectedFile: null,
    selectedFileList: [],
  };

  componentDidMount() {
    this.fetch();
  }
  async fetch() {
    this.setState({ loading: true });
    const id = this.props.match.params.id;
    try {
      const response = await axios.get("/api/defect/" + id);
      this.setState({
        loading: false,
        data: await response.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  onSubmit = (values, { setSubmitting }) => {
    this.setState = {
      loading: true,
    };
    const data = {
      ...values,
      assignTo: this.state.username,

    };
    const id = this.props.match.params.id;
    axios.post("/api/defect/" + id, data).then((res) => {
      this.setState = {
        loading: false,
      };
      if (res.status === 200) {
        this.props.enqueueSnackbar("Updated sucessfully", {
          variant: "info",
        });
        this.props.history.push("/" + this.props.match.params.Pid + "/defect");
      }
    });
  };
  onSearch = async (searchText) => {
    const result = await search(
      `/api/getFriend/${this.props.currentUser}/${searchText}`
    );
    const friend = result;
    console.log(friend);
    this.setState({ options: friend });
  };

  onSelect = (data) => {
    this.state.options.map((key) => {
      return key.friendUsername === data
        ? this.setState({
            username: data,
            userId: key.friendId,
          })
        : null;
    });
  };

  onChange = (data) => {
    this.setState({ value: data });
  };
  render() {
    return (
      <Aux>
        <div className="page">
          <Formik
            enableReinitialize={true}
            initialValues={{
              defect: this.state.data.defect,
              description: this.state.data.description,
              selectBuild: this.state.data.selectBuild,
              selectModule: this.state.data.selectModule,
              defectType: this.state.data.defectType,
              os: this.state.data.os,
              assignTo: this.state.data.assignTo,
              priority: this.state.data.priority,
              status: this.state.data.status,
            }}
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
                          placeholder="Select build"
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
                          placeholder="Select module"
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
                <Col className="mt-2">
                  <AutoComplete
                    label="Assign To"
                    placeholder="Search friend username"
                    onSelect={this.onSelect}
                    onSearch={this.onSearch}
                    onChange={this.onChange}
                    data={this.state.options}
                  />
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

export default connect(mapStateToProps)(withSnackbar(Edit));
