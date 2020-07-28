import React, { Component } from "react";
import { AntSelect, AutoComplete } from "../../shared/components";
import { Formik, Field, Form } from "formik";
import { Row, Col } from "react-bootstrap";
import * as Yup from "yup";
import { roles } from "../../shared/constants/Types";
import { withSnackbar } from "notistack";
import { Button } from "antd";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { search } from "../../shared/utils/AsyncFetch";

const initialValues = {
  role: "",
};

const validationSchema = Yup.object().shape({
  role: Yup.string().required("Required"),
});

class AddUser extends Component {
  state = {
    loading: false,
    friendsList: [],
    options: [],
    value: "",
    userId: "",
    username: "",
  };

  componentDidMount() {
    // this.fetchFriends();
  }

  // async fetchFriends() {
  //   try {
  //     const res = await axios.get("/api/getFriendsList/" + this.props.userId);
  //     this.setState({
  //       friendsList: await res.data.friendsList,
  //     });
  //     console.log(this.state.friendsList);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  onSearch = async (searchText) => {
    const result = await search(
      `/api/getFriend/${"5f0f9020883694467c5917cc"}/${searchText}`
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
            userId: key.friendId,
          })
        : null;
    });
  };

  onChange = (data) => {
    this.setState({ value: data });
  };

  onSubmit = (values) => {
    this.setState = {
      loading: true,
    };
    const data = {
      userId: this.state.userId,
      username: this.state.username,
      role: values.role,
    };
    console.log(this.props);
    axios
      .post(`/api/addUserInProject/${this.props.match.params.Pid}`, data)
      .then((res) => {
        if (res.status === 201) {
          this.props.enqueueSnackbar(res.data.message, {
            variant: "info",
          });
          this.props.onClose();
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <div>
          <h2>Add User</h2>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={this.onSubmit}
        >
          {(props) => (
            <Form>
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
                  <Row className="mt-3">
                    <Field
                      style={{ width: 300 }}
                      component={AntSelect}
                      name="role"
                      options={roles}
                      hasFeedback
                    />
                  </Row>
                </Col>
              </Row>
              <div className="d-flex flex-row-reverse mt-5">
                <Button
                  type="primary"
                  loading={this.state.loading}
                  htmlType="submit"
                  className="ml-3"
                >
                  Send
                </Button>
                <Button onClick={this.props.onClose}>Cancel</Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     userId: state.auth.user.userId,
//     email: state.auth.user.email,
//     username: state.auth.user.username,
//     name: state.auth.user.name,
//   };
// };
export default withRouter(withSnackbar(AddUser));
