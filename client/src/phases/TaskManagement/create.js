import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import { Link } from "react-router-dom";
import {
  AntInput,
  AntSelect,
  QuillEditorFormik,
  AntDatePicker,
  AutoComplete,
} from "../../shared/components";
import { Field, Formik, Form } from "formik";
import { Col, Row } from "react-bootstrap";
import { Button, Card } from "antd";
import * as Yup from "yup";
import { status } from "../../shared/constants/Types";
import moment from "moment";
import { dateFormat } from "../../shared/utils/dateTime";
import { withSnackbar } from "notistack";
import axios from "axios";
import { connect } from "react-redux";
import { search } from "../../shared/utils/AsyncFetch";

const initialValues = {
  taskName: "",
  status: "To do",
  description: "",
  attachmentUrl: "",
  // assignTo: "",
  // startDate: moment(Date.now()),
  // dueDate: "",
  createdBy: "",
};

const validationSchema = Yup.object().shape({
  taskName: Yup.string().min(3, "Too Short!").required("Required"),
  status: Yup.string().required("Required"),
  // assignTo: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  dueDate: Yup.string().required("Required"),
});

class Create extends Component {
  state = {
    loading: false,
    selectedFile: null,
    selectedFileList: [],
    options: [],
    value: "",
    username: "",
  };
  onSubmit = (values) => {
    this.setState = {
      loading: true,
    };
    const data = {
      ...values,
      assignTo: this.state.username,
      createdBy: this.props.currentUser,
      project: this.props.match.params.Pid,
    };
    axios.post("/api/task/create", data).then((res) => {
      this.setState = {
        loading: false,
      };
      if (res.status === 200) {
        this.props.enqueueSnackbar("Fault created", {
          variant: "info",
        });
        this.props.history.push("/" + this.props.match.params.Pid + "/task");
      }
    });
  };
  onSearch = async (searchText) => {
    const result = await search(
      `/api/getFriend/${this.props.userId}/${searchText}`
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
    const taskDetails = (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
      >
        {(props) => (
          <Form>
            <Card title="Create task">
              <div>
                <Row>
                  <Col>
                    <div className="mt-2">
                      <Field
                        type="input"
                        component={AntInput}
                        label="Summary"
                        name="taskName"
                        onChange={props.handleChange}
                        hasFeedback
                      />
                    </div>
                  </Col>
                </Row>
                <div className="">
                  <QuillEditorFormik label="Description" name="description" />
                </div>
                <Row className="mt-3">
                  <Col md="4">
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

                  <Col md="4">
                    <div className="">
                      <Field
                        type="input"
                        component={AntInput}
                        label="Attachment"
                        name="attachmentUrl"
                        hasFeedback
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className='mt-2' >
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
                <Row >
                  <Col md="2">
                    <div className="mt-3">
                      <Field
                        component={AntDatePicker}
                        defaultValue={props.values.startDate}
                        format={dateFormat}
                        label="Start Date"
                        name="startDate"
                        hasFeedback
                      />
                    </div>
                  </Col>
                  <Col md="2">
                    <div className="mt-3">
                      <Field
                        component={AntDatePicker}
                        label="Due Date"
                        format={dateFormat}
                        name="dueDate"
                        hasFeedback
                      />
                    </div>
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
                  <Link to={"/" + this.props.match.params.Pid + "/task"}>
                    <Button className="mr-2">Cancel</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    );

    return (
      <Aux>
        <Row>
          <Col>{taskDetails}</Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user.username,
    userId: state.auth.user.userId,
  };
};

export default connect(mapStateToProps)(withSnackbar(Create));
