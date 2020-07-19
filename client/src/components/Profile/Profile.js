import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import { Image, Row, Col, Button, Card } from "react-bootstrap";
import dp from "./assets/dp.jpg";
import "./style.css";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import BusinessIcon from "@material-ui/icons/Business";
import DeviceHubIcon from "@material-ui/icons/DeviceHub";
import MailIcon from "@material-ui/icons/Mail";
import SimpleCard from "../Cards/SimpleCard";
import { Paper } from "@material-ui/core";
import Avatar1 from "./assets/avatar-1.png";
import Avatar2 from "./assets/avatar-2.png";
import Cover from "./assets/cover.jpg";

class Profile extends Component {
  render() {
    let classes = "editable";
    const onFocusHandler = () => (classes = { ..."hover" });

    return (
      <Aux>
        <Row>
          <Col xl="12">
            <Image src={Cover} fluid className="img" />
          </Col>
        </Row>
        <Row className=" ml-5 mr-5">
          <Col className=" pl-3 pr-3 " md="4">
            <div>
              <Image
                className="imgDp "
                src={dp}
                roundedCircle
                width="171"
                height="180"
              />
              <div>
                <h4 className="text-left  mt-4 font-weight-bold">
                  ABDUL HANNAN
                </h4>
              </div>

              <div className="mb-5">
                <Button className="text-center w-100  mt-4" variant="light">
                  Manage your account
                </Button>
              </div>

              <Card>
                <Card.Header>About</Card.Header>
                <Card.Body>
                  <div className="d-inline-flex align-items-center">
                    <WorkOutlineIcon className="mr-3" />
                    
                  </div>
                  <div className="d-inline-flex align-items-center mt-4">
                    <DeviceHubIcon className="mr-3" />
                    
                  </div>
                  <div className="d-inline-flex align-items-center mt-4">
                    <BusinessIcon className="mr-3" />
                    
                  </div>
                  <div className="mt-4">
                    <Card.Subtitle>Contact</Card.Subtitle>
                    <div className="d-inline-flex align-items-center mt-4">
                      <MailIcon className="mr-3" />
                      
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
          <Col md="8" className=" p-4 mt ">
            <div className="d-inline-flex  p-2">
              <h5 className="mr-5">Worked on</h5>
              <a href="#" className="text-primary">
                View all
              </a>
            </div>
            <div>
              <Paper className="" elevation="0">
                <Card.Body>
                  <Row>
                    <Col md="6">
                      <SimpleCard
                        title="Softech"
                        footer="Last updated on 3 March, 2020"
                      />
                    </Col>
                    <Col md="6">
                      <SimpleCard
                        title="Softech"
                        footer="Last updated on 3 March, 2020"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <SimpleCard
                        title="Softech"
                        footer="Last updated on 3 March, 2020"
                      />
                    </Col>
                    <Col md="6">
                      <SimpleCard
                        title="Softech"
                        footer="Last updated on 3 March, 2020"
                      />
                    </Col>
                  </Row>

                  <footer>
                    <Button variant="light" size="sm">
                      View all
                    </Button>
                  </footer>
                </Card.Body>
              </Paper>
            </div>

            <div className="d-inline-flex  p-2 mt-4">
              <h5 className="mr-5">You worked with</h5>
            </div>
            <Paper
              elevation="0"
              className="paper d-flex justify-content-center"
            >
              <div className="align-self-center">
                <img src={Avatar1} />
              </div>
              <div
                className="align-self-center mr-3"
                style={{ marginLeft: -30 }}
              >
                <img src={Avatar2} />
              </div>
              <div className="align-self-center">
                <Card.Text>There are no people to see here</Card.Text>
              </div>
            </Paper>
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default Profile;
