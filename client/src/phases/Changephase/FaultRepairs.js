import React, { Component } from "react";

import { Col, Row } from "react-bootstrap";
import { Button } from "antd";
import {  Paper } from "@material-ui/core";

import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

import Aux from "../../hoc/_Aux";
import * as Yup from "yup";
import { withSnackbar } from 'notistack';
import {
  Formik,
  Form,
  TextFieldFormik,
  QuillEditorFormik,
  SelectTextFieldFormik,
} from "../../shared/components";
import {fetchBuilds} from '../../store/actions'

const select = [
  {
    value: "select ",
    label: "Select ",
  },
];
const faultType = [
  {
    value: "Codding Error",
    label: "Codding Error",
  },
  {
    value: "Requirments Error",
    label: "Requirments Error",
  },
  {
    value: "Design Error",
    label: "Design Error",
  },
];
const initialValues = {
  selectBuild: "",
  selectModule: "",
  faultType: "",
  fault: "",
  description: "",
};

const validationSchema = Yup.object().shape({
  selectBuild: Yup.string().required("Required"),
});

class Create extends Component {
  state= {
    loading: false,
    build: []
  }


  componentDidMount(){
    
    this.props.getBuilds(this.props.match.params.Pid);
    this.setState({build: this.props.build})
  }

  onSubmit = (values, { setSubmitting }) => {
    this.setState= {
      loading: true
    }
    const data = {
      ...values,
      user: this.props.currentUser,
      project: this.props.match.params.Pid,
    };
    axios.post("/api/correctivemaintenance/create", data).then((res) => {
      this.setState= {
        loading: false
      }
      if (res.status === 200) {
        this.props.enqueueSnackbar("Fault created", {
          variant: "success",
        });
        this.props.history.push("/" + this.props.match.params.Pid + "/changePhase/faultRepairs");
      }
    });
  };
  render() {
    return (
      <Aux>
        <div className="page">
          <Paper className="p-5  ">
            <div className="mb-2">
              <h3>Corrective Maintenance </h3>
            </div>
            {console.log(this.props.build)}
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={this.onSubmit}
            >
              {(props) => (
                <Form>
                  <Row className="mt-4">
                    <Col sm='6' md='4'>
                      <div >
                        <SelectTextFieldFormik
                          name="selectBuild"
                          items={select}
                          label='Select Build'
                        />
                      </div>
                    </Col>
                    <Col sm='6' md='4'>
                      <div className="">
                        <SelectTextFieldFormik
                          name="selectModule"
                          items={select}
                          label='Select Module'
                        />
                      </div>
                    </Col>
                    <Col sm='6' md='4'>
                      <div className="">
                        <SelectTextFieldFormik
                          name="faultType"
                          items={faultType}
                          label='Type of Fault'
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="mt-2">
                        <TextFieldFormik label="Fault" name="fault" />
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
                  <div className="mt-5 flex-row-reverse d-flex">
                    <Button
                      loading={this.state.loading}
                      type="primary"
                      htmlType="submit"
                    >
                      Save
                    </Button>
                    <Link to={"/" + this.props.match.params.Pid + "/changePhase/faultRepairs"}>
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
    currentUser: state.auth.user.userId,
    build: state.project.builds
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getBuilds: (Pid) => dispatch(fetchBuilds(Pid))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withSnackbar(Create));
