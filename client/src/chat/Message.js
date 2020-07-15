import React from "react";

class Message extends React.Component {
  render() {
    const { currentUser, messages } = this.props;

    return (
      <>
        <div className=" fixed-size-chat-div " style={{ height: "50vh" }}>
          {messages.map((data, index) => {
            console.log(data)
            return currentUser === data.sender ? (
              <div className="d-flex m-2" key={index}>
                <div className="ml-auto message-container-div-R">{data.message}</div>
              </div>
            ) : (
              <div className="d-flex m-2" key={index}>
                <div className=" message-container-div-L">{data.message}</div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export default Message;
