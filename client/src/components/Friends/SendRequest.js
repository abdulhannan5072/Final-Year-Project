import React, { Component } from "react";
import { AntInput } from "../../shared/components";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { withSnackbar } from "notistack";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { Button } from "antd";
import { connect } from "react-redux";
import { UsergroupAddOutlined } from "@ant-design/icons";

const initialValues = {
  requestReciver: "",
};

const validationSchema = Yup.object().shape({
  requestReciver: Yup.string().required("Required").email(),
});

class SendRequest extends Component {
  state = {
    loading: false,
  };

  onSubmit = (values) => {
    this.setState = {
      loading: true,
    };
    const data = {
      requestSender: {
        email: this.props.email,
        userId: this.props.userId,
        username: this.props.username,
        name: this.props.name,
      },
      requestReciver: values.requestReciver,
    };

    axios.post("/api/sendFriendRequest", data).then((res) => {
      this.setState = {
        loading: false,
      };
      console.log(res);

      if (res.status === 200) {
        this.props.enqueueSnackbar(res.data.message, {
          variant: "info",
        });
        this.props.onClose();
      }
    });
  };

  render() {
    return (
      <div>
        <h1 className="d-flex justify-content-center" style={{ color: "#08c" }}>
          Send a request
        </h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        >
          {(props) => (
            <Form>
              <Row className="mt-4">
                <Col>
                  <div className="d-flex justify-content-center">
                    <UsergroupAddOutlined
                      style={{ fontSize: "50px", color: "#08c" }}
                    />
                  </div>
                  <div className="mt-3">
                    <h3>Email</h3>
                  </div>
                  <div>
                    <Field
                      type="input"
                      component={AntInput}
                      name="requestReciver"
                      placeholder="Enter email of your friend"
                      onChange={props.handleChange}
                      hasFeedback
                    />
                  </div>
                </Col>
              </Row>
              <div className="d-flex flex-row-reverse mt-5">
                <Button
                  type="primary"
                  loading={this.state.loading}
                  htmlType="submit"
                  className="ml-3"
                >
                  Send
                </Button>
                <Button onClick={this.props.onClose}>Cancel</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    email: state.auth.user.email,
    username: state.auth.user.username,
    userId: state.auth.user.userId,
    name: state.auth.user.name,
  };
};

export default connect(mapStateToProps)(withSnackbar(SendRequest));
