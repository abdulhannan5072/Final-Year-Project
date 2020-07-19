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
  QuillEditorFormik,
  AntDatePicker,
} from "../../shared/components";
import {dateFormat, formatDate} from '../../shared/utils/dateTime'
import { status } from "../../shared/constants/Types";
import moment from 'moment'

const validationSchema = Yup.object().shape({
  taskName: Yup.string().min(3, "Too Short!").required("Required"),
  status: Yup.string().required("Required"),
  assignTo: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  dueDate: Yup.string().required("Required"),
});

class Edit extends Component {
  state = {
    loading: false,
    data: {
        taskName: "",
        status: "",
        description: "",
        attachmentUrl: "",
        assignTo: "",
        startDate: "",
        dueDate: "",
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
      const response = await axios.get("/api/task/" + id);
      this.setState({
        loading: false,
        data: await response.data,
      });
      console.log(response);
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
    };
    const id = this.props.match.params.id;
    axios.post("/api/task/" + id, data).then((res) => {
      this.setState = {
        loading: false,
      };
      if (res.status === 200) {
        this.props.enqueueSnackbar("Updated sucessfully", {
          variant: "info",
        });
        this.props.history.push(
          "/" + this.props.match.params.Pid + "/task"
        );
      }
    });
  };

  render() {

    console.log()
    return (
      <Aux>
        <div className="page">
            <Formik
              enableReinitialize={true}
              initialValues={{
                taskName: this.state.data.taskName,
                status: this.state.data.status,
                description: this.state.data.description,
                attachmentUrl: this.state.data.attachmentUrl,
                assignTo: this.state.data.assignTo,
                startDate: '',
                dueDate: '',
              }}
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
                        <QuillEditorFormik
                          label="Description"
                          name="description"
                        />
                      </div>
                      <Row className="mt-3">
                        <Col md="4">
                          <div className="">
                            <Field
                              type="input"
                              component={AntInput}
                              label="Assign To"
                              name="assignTo"
                              hasFeedback
                            />
                          </div>
                        </Col>
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
                        <Col md="4">
                          <div className="mt-2">
                            <Field
                              component={AntDatePicker}
                              defaultValue={formatDate(this.state.data.startDate)}
                              format={dateFormat}
                              label="Start Date"
                              name="startDate"
                              hasFeedback
                            />
                          </div>
                        </Col>
                        <Col md="4">
                          <div className="mt-2">
                            <Field
                              component={AntDatePicker}
                              label="Due Date"
                              defaultValue={formatDate(this.state.data.startDate)}
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
