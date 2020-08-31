import React, { Component } from "react";
import { Button, Empty } from "antd";
import { Row, Col } from "react-bootstrap";
import "./styles.css";
import { UserCard, Modal } from "../../shared/components";
import axios from "axios";
import SendRequest from "./SendRequest";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { Link } from "react-router-dom";
import io from "socket.io-client";

let socket;

class Friends extends Component {
  state = {
    open: false,
    requests: [],
    loading: false,
    friendsList: [],
  };

  componentDidMount() {
    this.fetchRequests();
    this.getFriendsList();
    // this.initSocket();
  }
  initSocket() {
    socket = io("https://guarded-island-32704.herokuapp.com/");

    socket.on("friends", (data) => {
      console.log(data.message);
    });
  }

  async fetchRequests() {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        "/api/getFriendRequests/" + this.props.userId
      );
      this.setState({
        loading: false,
        requests: await response.data.requests,
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  async onClickDone(email, userId, username, name, requester) {
    // request accepted by user
    const data = {
      accepter: {
        email: email,
        userId: userId,
        username: username,
        name: name,
      },
      requester: requester,
    };
    this.setState({ loading: true });
    try {
      const res = await axios.post("/api/friendRequestAccepted", data);
      if (res) {
        this.setState({ loading: false });
        this.fetchRequests();
        this.props.enqueueSnackbar(res.data.message, {
          variant: "info",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async onClickCancel() {
    // request cancel buy user
  }

  async getFriendsList() {
    try {
      const res = await axios.get("/api/getFriendsList/" + this.props.userId);
      this.setState({
        friendsList: await res.data.friendsList,
      });
      console.log(this.state.friendsList);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Row className="p-4">
        <Col>
          <Row className="d-flex">
            <div className="">
              <h2>Request List</h2>
            </div>
            <div className="pl-4">
              <Button type="primary" onClick={this.handleOpen}>
                Send a request
              </Button>
            </div>
            <Modal open={this.state.open} onClose={this.handleClose}>
              <SendRequest onClose={this.handleClose} />
            </Modal>
          </Row>
          <Row className=" p-2" style={{ minHeight: "150px" }}>
            {this.state.requests[0] ? (
              this.state.requests.map((obj) => (
                <Col key={obj._id} className="mt-4">
                  <UserCard
                    iconButtons={true}
                    username={obj.username}
                    name={obj.name}
                    onClickDone={() =>
                      this.onClickDone(
                        this.props.email,
                        this.props.userId,
                        this.props.username,
                        this.props.name,
                        obj.username
                      )
                    }
                    onClickCancel={this.onClickCancel}
                  />
                </Col>
              ))
            ) : (
              <Empty
                className="w-100"
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={<span>No requests avaliable</span>}
              />
            )}
          </Row>
          <Row className="mt-4">
            <div>
              <h2>Friends List</h2>
            </div>
          </Row>
          <Row className=" p-2" style={{ minHeight: "150px" }}>
            {this.state.friendsList[0] ? (
              this.state.friendsList.map((obj) => (
                <Col key={obj._id} className="mt-4">
                  <Link to="#">
                    <UserCard username={obj.friendUsername} name={obj.name} />
                  </Link>
                </Col>
              ))
            ) : (
              <Empty
                className="w-100"
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{
                  height: 60,
                }}
                description={<span>No friends add</span>}
              >
                <Button onClick={this.handleOpen} type="primary">
                  Add friends
                </Button>
              </Empty>
            )}
          </Row>
        </Col>
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    email: state.auth.user.email,
    username: state.auth.user.username,
    name: state.auth.user.name,
  };
};
export default connect(mapStateToProps)(withSnackbar(Friends));
