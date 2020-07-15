import React, { Component } from "react";
import {  Button, Input } from "antd";

class SendForm extends Component {
  render() {
    const {onChange, onClick, value} = this.props;
    return (
      <div className="mt-3 d-flex">
        <Input
          placeholder="Type your message here..."
          onChange={onChange}
          size="large"
          value={value}
          onKeyPress={(e) => (e.key === "Enter" ? onClick(e) : null)}
        />
        <Button size="large" type="primary" onClick={onClick}>
          Send
        </Button>
      </div>
    );
  }
}
export default SendForm;
