import React, { Component } from "react";
import { connect } from "react-redux";

import { Button } from "react-bootstrap";
import Close from "@material-ui/icons/Close";
import { IconButton, Paper } from "@material-ui/core";
import axios from "axios";
import { Link } from "react-router-dom";
import Aux from "../../hoc/_Aux";
import * as Yup from "yup";

import {
  Formik,
  Form,
  TextFieldFormik,
  SelectTextFieldFormik,
} from "../../shared/components";
import { getCurrentDate } from "../../shared/utils/dateTime";
import {success} from '../../shared/components'

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
  projectKey: "",
};

const validationSchema = Yup.object().shape({
  projectName: Yup.string().min(2, "Too Short!").required("Required"),
});

class Create extends Component {
  onSubmit = (values, { setSubmitting }) => {
    const data = {
      ...values,
      createdBy: this.props.currentUser,
      createdDate: getCurrentDate(),
    };
    axios.post("/api/projects/create", data).then((res) => {
      if (res.status === 200) {
        success("Project created");
      }
    });
  };

  render() {
    return (
      <Aux>
        <div className="page">
          <div className="d-flex flex-row-reverse mb-3 ">
            <Link to="/project/build">
              <IconButton>
                <Close />
              </IconButton>
            </Link>
          </div>
          <Paper className="p-5  ">
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
                  <div className="mt-3">
                    <TextFieldFormik label="Project" name="projectName" />
                  </div>
                  <div className="mt-2">
                    <TextFieldFormik label="Key" name="projectKey" />
                  </div>
                  <div className="mt-2">
                    <SelectTextFieldFormik
                      label="Project type"
                      items={ptype}
                      name="projectType"
                    />
                  </div>
                  <div className="w-25">
                    <Button className="mt-5 " variant="dark" type="submit">
                      Create Project
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Paper>
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

export default connect(mapStateToProps)(Create);
