import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { AntInput } from "../../shared/components";
import {  Field } from "formik";
import { Col, Row } from "react-bootstrap";
import { Button, Card } from "antd";
import Aux from "../../hoc/_Aux";
import * as Yup from "yup";
import { getCurrentDate } from "../../shared/utils/dateTime";
import { withSnackbar } from 'notistack';

import {
  Formik,
  Form,
  TextFieldFormik,
  QuillEditorFormik,
} from "../../shared/components";

const initialValues = {
  build: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  build: Yup.string().min(2, "Too Short!").required("Required").max(10,"Too Long!"),
});

class Create extends Component {

  state= {
    loading: false
  }

  onSubmit = (values, { setSubmitting }) => {
    this.setState= {
      loading: true
    }
    const data = {
      ...values,
      createdBy: this.props.currentUser,
      createdDate: getCurrentDate(),
      project: this.props.match.params.Pid,
    };
    axios.post("/api/build/create", data).then((res) => {
      this.setState= {
        loading: false
      }
      if (res.status === 200) {
        this.props.enqueueSnackbar("Build created", {
          variant: "success",
        });
        this.props.history.push("/" + this.props.match.params.Pid + "/build");
      }
    });
  };

  render() {
    return (
      <Aux>
        <div className="page">
        <Card >
            <div className="mb-2">
              <h3>Create Build</h3>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={this.onSubmit}
            >
              {(props) => (
                <Form>
                 <Row>
                    <Col sm="4" md="4">
                      <div className="mt-2">
                        <Field
                          component={AntInput}
                          label="Build"
                          name="build"
                          hasFeedback
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="mt-2">
                    <QuillEditorFormik label="Description" name="description" />
                  </div>
                  <div className="mt-5 flex-row-reverse d-flex">
                    <Button
                      loading={this.state.loading}
                      type="primary"
                      htmlType="submit"
                    >
                      Create Build
                    </Button>
                    <Link to={"/" + this.props.match.params.Pid + "/build"}>
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
    currentUser: state.auth.user.username,
  };
};
export default connect(mapStateToProps)(withSnackbar(Create));
