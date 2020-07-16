import React from "react";
import { CContainer } from "@coreui/react";
import { Card, Avatar, Button, Divider } from "antd";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import io from "socket.io-client";
import Message from "./Message";
import SendForm from "./SendForm";

import { connect } from "react-redux";

let socket;
const { Meta } = Card;
const ENDPOINT = "localhost:4000";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: [],
      currentSelectedFriend: "Bob",
    };
  }

  componentDidMount() {
    this.initSocket();
    this.getMsg();
  }

  initSocket() {
    socket = io(ENDPOINT);

    socket.emit("join", { user: this.props.currentUser }, (error) => {
      if (error) {
        alert(error);
      }
      console.log("User Connected");
    });
  }
  getMsg() {
    socket.on("recive message", (msg) => {
      const oldMsg = this.state.messages;
      const updatedMessages = [...oldMsg, msg];
      this.setState({ messages: updatedMessages });
      console.log(msg);
    });
  }

  onChange = (e) => {
    this.setState({ message: e.target.value });
  };

  onClick = (e) => {
    e.preventDefault();
    if (this.state.message) {
      socket.emit(
        "private message",
        {
          sender: this.props.currentUser,
          reciver: this.state.currentSelectedFriend,
          message: this.state.message,
        },
        () => this.setState({ message: "" })
      );
    }
  };

  render() {
    return (
      <>
        <CContainer>
          <Row>
            <Col md="4">
              <div className="d-flex p-2">
                <h3>Chatting</h3>
                <Button className="ml-auto" type="primary">
                  Create new
                </Button>
              </div>
              <div className=" fixed-size-chat-div p-2">
                <Link to="#">
                  <Card style={{ marginTop: 16 }} hoverable>
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Abdul Hannan"
                      description="Last online 3h ago"
                    />
                  </Card>
                </Link>
                <Link to="#">
                  <Card style={{ marginTop: 16 }} hoverable>
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Abdul Hannan"
                      description="Last online 3h ago"
                    />
                  </Card>
                </Link>
                <Link to="#">
                  <Card style={{ marginTop: 16 }} hoverable>
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Abdul Hannan"
                      description="Last online 3h ago"
                    />
                  </Card>
                </Link>
                <Link to="#">
                  <Card style={{ marginTop: 16 }} hoverable>
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Abdul Hannan"
                      description="Last online 3h ago"
                    />
                  </Card>
                </Link>
                <Link to="#">
                  <Card style={{ marginTop: 16 }} hoverable>
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Abdul Hannan"
                      description="Last online 3h ago"
                    />
                  </Card>
                </Link>
                <Link to="#">
                  <Card style={{ marginTop: 16 }} hoverable>
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Abdul Hannan"
                      description="Last online 3h ago"
                    />
                  </Card>
                </Link>
                <Link to="#">
                  <Card style={{ marginTop: 16 }} hoverable>
                    <Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      title="Abdul Hannan"
                      description="Last online 3h ago"
                    />
                  </Card>
                </Link>
              </div>
            </Col>
            <Col md="8">
              <Card title={this.state.currentSelectedFriend}>
                <Message messages={this.state.messages} {...this.props} />
                <Divider />
                <SendForm
                  onChange={this.onChange}
                  onClick={this.onClick}
                  value={this.state.message}
                />
              </Card>
            </Col>
          </Row>
        </CContainer>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user.username,
  };
};

export default connect(mapStateToProps)(Chat);