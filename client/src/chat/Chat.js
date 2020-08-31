import React from "react";
import { CContainer } from "@coreui/react";
import { Card,  Button, Divider } from "antd";
import { Row, Col } from "react-bootstrap";
import io from "socket.io-client";
import Message from "./Message";
import SendForm from "./SendForm";
import { UserCard, Modal } from "../shared/components";
import { connect } from "react-redux";
import User from "./User";

let socket;
const ENDPOINT = "https://guarded-island-32704.herokuapp.com/";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      open: false,
      messages: [],
      currentSelectedFriend: "Bob",
      chatList: [],
    };
  }

  componentDidMount() {
    this.initSocket();
    this.getMsg();
  }
   
  componentWillUnmount(){
    socket.emit('leave', { user: this.props.currentUser } )
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

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  handleChatList = (data) => {
    const oldList = this.state.chatList;
    const updatedList = [...oldList, data];
    this.setState({ chatList: updatedList, currentSelectedFriend: data.username });
  };
  // selectHandle(data) {
  //   console.log(data)
  //   this.setState({
  //     currentSelectedFriend: data,
  //   })
  // }

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
                <Button
                  className="ml-auto"
                  type="primary"
                  onClick={this.handleOpen}
                >
                  Select friend
                </Button>
                <Modal open={this.state.open} onClose={this.handleClose}>
                  <User
                    handleChatList={this.handleChatList}
                    onClose={this.handleClose}
                  />
                </Modal>
              </div>
              <div className=" fixed-size-chat-div p-2">
                {this.state.chatList.map((val, idx) => (
                    <UserCard username={val.username} name={val.name} key={idx} />
                ))}
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
