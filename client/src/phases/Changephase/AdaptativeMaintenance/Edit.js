import React, { Component } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { fetchBuilds } from "../../../store/actions";
import { withSnackbar } from "notistack";
import Aux from "../../../hoc/_Aux";
import { Form, Field } from "formik";
import { Col, Row } from "react-bootstrap";
import { AntInput, AntSelect } from "../../../shared/components";
import { Button, Card } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { QuillEditorFormik } from "../../../shared/components";
import { affectedReqType } from "../../../shared/constants/Types";

const validationSchema = Yup.object().shape({
  affected: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  affectedBy: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
});

class Edit extends Component {
  state = {
    loading: false,
    data: {
      affected: "",
      type: "",
      affectedBy: "",
      description: "",
    },
  };

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    this.setState({ loading: true });
    const id = this.props.match.params.id;
    try {
      const response = await axios.get("/api/adaptiveMaintenance/" + id);
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
    axios.post("/api/adaptiveMaintenance/" + id, data).then((res) => {
      this.setState = {
        loading: false,
      };
      if (res.status === 200) {
        this.props.enqueueSnackbar("Updated sucessfully", {
          variant: "success",
        });
        this.props.history.push(
          "/" + this.props.match.params.Pid + "/changePhase/adaptiveMaintenance"
        );
      }
    });
  };

  render() {
    return (
      <Aux>
        <div className="page">
          <Card title="Adaptive Maintenance" bordered={false}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                affected: this.state.data.affected,
                type: this.state.data.type,
                affectedBy: this.state.data.affectedBy,
                description: this.state.data.description,
              }}
              validationSchema={validationSchema}
              onSubmit={this.onSubmit}
            >
              {(props) => (
                <Form>
                  <Row className="mt-4">
                    <Col sm="6">
                      <div>
                        <Field
                          component={AntInput}
                          label="Affected"
                          name="affected"
                          placeholder="Enter what is affected"
                          onChange={props.handleChange}
                          hasFeedback
                        />
                      </div>
                    </Col>
                    <Col sm="6">
                      <div className="">
                        <Field
                          component={AntInput}
                          label="Affected By"
                          name="affectedBy"
                          placeholder="Enter cause of affect"
                          onChange={props.handleChange}
                          hasFeedback
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <div className="mt-2">
                        <Field
                          component={AntSelect}
                          name="type"
                          options={affectedReqType}
                          label="Type"
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
                          placeholder="Provide detailed requriements"
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
                    <Link
                      to={
                        "/" +
                        this.props.match.params.Pid +
                        "/changePhase/adaptiveMaintenance"
                      }
                    >
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
    build: state.project,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBuilds: (Pid) => dispatch(fetchBuilds(Pid)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withSnackbar(Edit));
