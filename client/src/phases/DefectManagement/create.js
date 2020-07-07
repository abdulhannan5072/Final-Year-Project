import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import {
  Formik,
  Form,
  InputFormik,
  SelectFormik,
  SelectTextFieldFormik,
  TextFieldFormik,
  QuillEditorFormik,
} from "../../shared/components";
import { withSnackbar } from "notistack";
import axios from "axios";
import { Row, Col } from "react-bootstrap";

import * as Yup from "yup";

import { Button } from "react-bootstrap";
import { Paper } from "@material-ui/core";

const types = [
  {
    value: "select",
    label: "Select",
  },
  {
    value: "functional",
    label: "Functional",
  },
  {
    value: "ui/ux",
    label: "UI/Ux",
  },
  {
    value: "content",
    label: "Content",
  },
  {
    value: "field validation",
    label: "Field Validation",
  },
  {
    value: "security",
    label: "Security",
  },
  {
    value: "performance",
    label: "Performance",
  },
];
const select = [
  {
    value: "select ",
    label: "Select ",
  },
];
const priority = [
  {
    value: "low ",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium ",
  },
  {
    value: "high ",
    label: "High ",
  },
];
const os = [
  {
    value: "windows 10 ",
    label: "Windows 10",
  },
  {
    value: "Mac Os",
    label: "Mac Os ",
  },
  {
    value: "Android ",
    label: "Android ",
  },
];
const severity = [
  {
    value: "select ",
    label: "Select ",
  },
  {
    value: "blocker ",
    label: "Blocker ",
  },
  {
    value: "minor",
    label: "Minor",
  },
  {
    value: "major",
    label: "Major",
  },
];
const initialValues = {
  defectDes: "",
  selectBuild: "",
  selectModule: "",
  defectType: "",
  os: "",
  severity: "",
  detailDes: "",
  assignTo: "",
  priority: "",
  defectViewers: "",
};
const validationSchema = Yup.object().shape({
  defect: Yup.string().min(3, "Too Short").required("this field is required"),
});

class Create extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit = (values, { setSubmitting }) => {
    axios.post("/api/defect/create", values).then((res) => {
      console.log(res);
      if (res.status === 200) {
        this.props.enqueueSnackbar("Defect Phase created", {
          variant: "success",
        });
      }
    });
  };

  render() {
    const defectDetails = (
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
      >
        {(props) => (
          <Form>
            <Paper className="p-3">
              <Row>
                <Col>
                  <div className="m-2">
                    <SelectTextFieldFormik
                      label="Build"
                      name="selectBuild"
                      items={select}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="m-2">
                    <SelectTextFieldFormik
                      label="Module"
                      name="selectModule"
                      items={select}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="m-2">
                    <SelectTextFieldFormik
                      label="Priority"
                      name="priority"
                      items={priority}
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="m-2">
                    <SelectTextFieldFormik
                      label="Defect Type"
                      name="defectType"
                      items={types}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="m-2">
                    <SelectTextFieldFormik label="OS" name="os" items={os} />
                  </div>
                </Col>
                <Col>
                  <div className="m-2">
                    <SelectTextFieldFormik
                      label="Severity"
                      name="severity"
                      items={severity}
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="m-2">
                    <TextFieldFormik
                      label="Defect Description"
                      name="defectDes"
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="m-2">
                    <QuillEditorFormik
                      label="Detail Description"
                      name="detailDes"
                    />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <div className="m-2">
                    <TextFieldFormik label="Assign To" name="assignTo" />
                  </div>
                </Col>
              </Row>
              <div className="d-flex flex-row-reverse ">
                <Button className=" " variant="dark" type="submit">
                  Create Defect
                </Button>
                <Button className="mr-3 " variant="dark" type="submit">
                  Cancel
                </Button>
              </div>
            </Paper>
          </Form>
        )}
      </Formik>
    );

    return (
      <Aux>
        <Row>
          <Col>
            <div className="row d-flex align-items-center mb-3">
              <div className="col-9">
                <h3>Defect</h3>
              </div>
            </div>
          </Col>
        </Row>
        <div>{defectDetails}</div>
      </Aux>
    );
  }
}
export default withSnackbar(Create);
