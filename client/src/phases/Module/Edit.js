import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button } from "antd";
import { Paper } from "@material-ui/core";
import { withSnackbar } from "notistack";

import Aux from "../../hoc/_Aux";
import * as Yup from "yup";

import {
  Formik,
  Form,
  TextFieldFormik,
  QuillEditorFormik,
} from "../../shared/components";

const validationSchema = Yup.object().shape({
  module: Yup.string().min(2, "Too Short!").required("Required"),
});

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        module: "",
        description: "",
      },
      loading: false,
    };
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    this.setState({ loading: true });
    const id = this.props.match.params.id;
    try {
      const response = await axios.get("/api/module/" + id);
      this.setState({
        loading: false,
        data: await response.data,
      });
      console.log(this.state)
    } catch (err) {
      console.log(err);
    }
  }

  onSubmit = (values, { setSubmitting }) => {
    this.setState({ loading: true });
    const id = this.props.match.params.id;
    const data = {
      ...values,
    };
    axios
      .post("/api/module/" + id, data)
      .then((res) => {
        this.setState({
          loading: false,
        });
        if (res.status === 201) {
          this.props.enqueueSnackbar("Updated sucessfully", {
            variant: "success",
          });
          this.props.history.push(
            "/" + this.props.match.params.Pid + "/module"
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Aux>
        <div className="page">
          <Paper className="p-5  ">
            <div className="mb-2">
              <h3>Edit Module</h3>
            </div>

            <Formik
              enableReinitialize={true}
              initialValues={{
                module: this.state.data.module,
                description: this.state.data.description,
              }}
              validationSchema={validationSchema}
              onSubmit={this.onSubmit}
            >
              {(props) => (
                <Form>
                  <div className="mt-3">
                    <TextFieldFormik label="Module" name="module" />
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
                      Update
                    </Button>
                    <Link to={"/" + this.props.match.params.Pid + "/module"}>
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
