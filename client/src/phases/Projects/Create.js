import React, { Component } from "react";
import { connect } from "react-redux";
import { AntInput, AntSelect } from "../../shared/components";
import { Field } from "formik";
import { Col, Row } from "react-bootstrap";
import { Button, Card } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import Aux from "../../hoc/_Aux";
import * as Yup from "yup";
import { withSnackbar } from "notistack";

import {
  Formik,
  Form,
} from "../../shared/components";

const ptype = [
  {
    value: "android",
    label: "Android Application",
  },
  {
    value: "web",
    label: "Web Application",
  },
  {
    value: "ios",
    label: "IOS Application",
  },
  {
    value: "desktop",
    label: "Desktop Application",
  },
];

const initialValues = {
  projectName: "",
  projectType: "",
};

const validationSchema = Yup.object().shape({
  projectName: Yup.string()
    .min(2, "Too Short!")
    .required("Required")
    .max(11, "Too Long!"),
  projectType: Yup.string().required("Select this Field"),
});

class Create extends Component {
  state = {
    loading: false,
  };
  
  onSubmit = (values) => {
    this.setState = {
      loading: true,
    };
    const data = {
      ...values,
      owner: this.props.currentUser,
    };
    axios.post("/api/projects/create", data).then((res) => {
      this.setState = {
        loading: false,
      };
      if (res.status === 200) {
        this.props.enqueueSnackbar("Project created", {
          variant: "success",
        });
        this.props.history.push("/projects");
      }
    });
  };
  render() {
    return (
      <Aux>
        <div className="page">
          <div className="d-flex flex-row-reverse mb-3 ">
            <Link to="/project/build"></Link>
          </div>
          <Card>
            <div className="mb-2">
              <h3>Create Project</h3>
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
                          type="input"
                          component={AntInput}
                          label="Project Name"
                          name="projectName"
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
                          name="projectType"
                          options={ptype}
                          label="Project Type"
                          hasFeedback
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className="mt-5 flex-row-reverse d-flex">
                    <Button
                      loading={this.state.loading}
                      type="primary"
                      htmlType="submit"
                    >
                      Create Project
                    </Button>
                    <Link to={"/projects"}>
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
