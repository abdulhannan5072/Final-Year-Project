import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import { Image, Row, Col,  Card } from "react-bootstrap";
import dp from "./assets/dp.jpg";
import "./style.css";
import { Paper } from "@material-ui/core";
import Avatar1 from "./assets/avatar-1.png";
import Avatar2 from "./assets/avatar-2.png";
import Cover from "./assets/cover.jpg";
import { AntInput } from "../../shared/components";
import { Field, Formik } from "formik";
import {
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Empty } from "antd";

class Profile extends Component {
  render() {
    // let classes = "editable";
    // const onFocusHandler = () => (classes = { ..."hover" });

    return (
      <Aux>
        <Row>
          <Col xl="12">
            <Image src={Cover} fluid className="img" />
          </Col>
        </Row>
        <Formik
          enableReinitialize={true}
          initialValues={{
            email: "abdulhannan5072@gmail.com",
            phoneNo: "+92-333-1234567",
            company: "UOL",
            about: "Developer",
          }}
        >
          {(props) => (
            <Row className=" ml-5 ">
              <Col className="  " md="4">
                <div>
                  <div className="d-flex justify-content-center">
                    <Image
                      className="imgDp "
                      src={dp}
                      roundedCircle
                      width="171"
                      height="180"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <h4 className="  mt-4 font-weight-bold">ABDUL HANNAN</h4>
                  </div>
                  <Paper style={{ minHeight: "40vh" }}>
                    <Card.Header>Gernal Info</Card.Header>
                    <Card.Body>
                      <Field
                        className="mt-2"
                        component={AntInput}
                        prefix={<MailOutlined />}
                        type="input"
                        // label="Email"
                        name="email"
                        disabled
                      />
                      <Field
                        className="mt-2"
                        component={AntInput}
                        prefix={<PhoneOutlined />}
                        type="input"
                        // label="Phone No"
                        name="phoneNo"
                        disabled
                      />
                      <Field
                        className="mt-2"
                        component={AntInput}
                        prefix={<ShoppingOutlined />}
                        type="input"
                        // label="Company"
                        name="company"
                        disabled
                      />
                      <Field
                        className="mt-2"
                        component={AntInput}
                        prefix={<UserOutlined />}
                        type="input"
                        // label="About"
                        name="about"
                        disabled
                      />
                    </Card.Body>
                  </Paper>
                </div>
              </Col>
              <Col md="8" className=" p-4 mt-3 ">
                <div className="d-inline-flex  p-2">
                  <h5 className="mr-5">Worked on</h5>

                  {/* <a href="#" className="text-primary">
                    View all
                  </a> */}
                </div>
                <div>
                  <Paper className="" >
                    <Card.Body>
                      <div>
                        <Empty
                          className="w-100"
                          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                          imageStyle={{
                            height: 60,
                          }}
                          description={<span>No data avaliable</span>}
                        />
                      </div>
                      <footer>
                        {/* <Button variant="light" size="sm">
                          View all
                        </Button> */}
                      </footer>
                    </Card.Body>
                  </Paper>
                </div>

                <div className="d-inline-flex  p-2 mt-4">
                  <h5 className="mr-5">You worked with</h5>
                </div>
                <Paper
                 
                  className="paper d-flex justify-content-center"
                >
                  <div className="align-self-center">
                    <img alt='nothing' src={Avatar1} />
                  </div>
                  <div
                    className="align-self-center mr-3"
                    style={{ marginLeft: -30 }}
                  >
                    <img alt='nothing' src={Avatar2} />
                  </div>
                  <div className="align-self-center">
                    <Card.Text>There are no people to see here</Card.Text>
                  </div>
                </Paper>
              </Col>
            </Row>
          )}
        </Formik>
      </Aux>
    );
  }
}

export default Profile;
