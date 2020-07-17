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
import { AntInput,AntSelect } from "../../shared/components";
import {  Field } from "formik";
import { Col, Row } from "react-bootstrap";
import { Button, Card } from "antd";
import { withSnackbar } from "notistack";
import axios from "axios";
import * as Yup from "yup";
import { Link } from "react-router-dom";



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
const status=[
{
  value: "to do",
  label: "To Do",
},
{
  value: "in progress",
  label: "In Progress",

},
{
  value: "done",
  label: "Done",
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

const initialValues = {
  defectDes: "",
  selectBuild: "",
  selectModule: "",
  defectType: "",
  os: "",
  
  detailDes: "",
  assignTo: "",
  priority: "",
  status:""
};
const validationSchema = Yup.object().shape({
  selectBuild: Yup.string().min(3, "Too Short").required("Select this field"),
  selectModule: Yup.string().min(3, "Too Short").required("Select this field"),
  defectType: Yup.string().min(3, "Too Short").required("Select this field"),
  defectDes: Yup.string().min(3, "Too Short").required("This field is Required").min(1000,"Too Short ").max(2500,"Too Long "),
  priority: Yup.string().min(3, "Too Short").required("Select this field"),
  assignTo: Yup.string().min(3, "Too Short").required(" This field is Required"),
  status: Yup.string().min(3, "Too Short").required("Select this field"),
  os: Yup.string().min(3, "Too Short").required("Select this field"),
});

class Create extends Component {
 
    state={
      loading:false
    };
  

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
            <Card>
              <Row>
              <Col sm="6" md="4">
                      <div className="">
                        <Field
                          component={AntSelect}
                          name="selectBuild"
                          options={select}
                          label="Select Build"
                          hasFeedback
                        />
                      </div>
                    </Col>
                    <Col sm="6" md="4">
                      <div className="">
                        <Field
                          component={AntSelect}
                          name="selectModule"
                          options={select}
                          label="Select Module"
                          hasFeedback
                        />
                      </div>
                    </Col>
                    <Col sm="6" md="4">
                      <div className="">
                        <Field
                          component={AntSelect}
                          name="priority"
                          options={priority}
                          label="Priority"
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
                          name="defectType"
                          options={types}
                          label="Defect Type"
                          hasFeedback
                        />
                      </div>
                    </Col>
                    <Col sm="6" md="4">
                      <div className="">
                        <Field
                          component={AntSelect}
                          name="os"
                          options={os}
                          label="OS"
                          hasFeedback
                        />
                      </div>
                    </Col>
                    <Col sm="6" md="4">
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
              </Row>

              <Row>
              <Col >
                      <div className="mt-2">
                        <Field
                          component={AntInput}
                          label="Defect Description"
                          name="defectDes"
                          hasFeedback
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
              <Col sm="6" md="4">
                      <div className="mt-2">
                        <Field
                          component={AntInput}
                          label="Assign To"
                          name="projectKey"
                          hasFeedback
                        />
                      </div>
                    </Col>
                
              </Row>
              <div className="w-25">
                    <Button  
                    loading={this.state.loading}
                      type="primary"
                      htmlType="submit">
                      Create Defect
                    </Button>
                    <Link to={"/" + this.props.match.params.key + "/defect"}>
                      <Button className="mr-2">Cancel</Button>
                    </Link>
                 
                  </div>
            </Card>
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
