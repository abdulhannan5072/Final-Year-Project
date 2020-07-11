import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button } from "antd";
import { Paper } from "@material-ui/core";

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
  build: Yup.string().min(2, "Too Short!").required("Required"),
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
          <Paper className="p-5  ">
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
                  <div className="mt-3">
                    <TextFieldFormik label="Build" name="build" />
                  </div>
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
export default connect(mapStateToProps)(withSnackbar(Create));
