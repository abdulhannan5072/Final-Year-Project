import React, { Component } from "react";
import {  AutoComplete } from "../shared/components";
import { Row, Col } from "react-bootstrap";
import { withSnackbar } from "notistack";
import { Button } from "antd";
import { withRouter } from "react-router-dom";
import { search } from "../shared/utils/AsyncFetch";
import { connect } from "react-redux";



class AddUser extends Component {
  state = {
    loading: false,
    friendsList: [],
    options: [],
    name: "",
    username: "",
  };

  onSearch = async (searchText) => {
    const result = await search(
      `/api/getFriend/${this.props.userId}/${searchText}`
    );
    const friend = result;
    console.log(friend);
    this.setState({ options: friend });
  };

  onSelect = (data) => {
    this.state.options.map((key) => {
      return key.friendUsername === data
        ? this.setState({
            username: data,
            name: key.name,
          })
        : null;
    });
  };

  onChange = (data) => {
    this.setState({ value: data });
  };

  onSubmit = () => {
    const data = {
      name: this.state.name,
      username: this.state.username,
    };
    this.props.handleChatList(data);
    this.props.onClose();
  };

  render() {
    return (
      <>
        <div>
          <h2>Select Friend</h2>
        </div>

        <Row className="p-2">
          <Col>
            <Row className="mt-3">
              <AutoComplete
                placeholder="Search friend username"
                onSelect={this.onSelect}
                onSearch={this.onSearch}
                onChange={this.onChange}
                data={this.state.options}
              />
            </Row>
          </Col>
        </Row>
        <div className="d-flex flex-row-reverse mt-5 pt-5">
          <Button
            type="primary"
            loading={this.state.loading}
            onClick={this.onSubmit}
            className="ml-3"
          >
            Send
          </Button>
          <Button onClick={this.props.onClose}>Cancel</Button>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => {
  return{
    userId: state.auth.userId
  }
}
export default withRouter(connect(mapStateToProps)(withSnackbar(AddUser)));
