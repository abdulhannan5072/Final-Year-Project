import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Button, Space, Popconfirm } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import Table from "../../shared/components/Table";
import AddUser from './AddUser';
import {Modal} from '../../shared/components'

class Settings extends Component {
  state = {
    data: [],
    open: false,
    loading: false,
  };

  componentDidMount() {
    this.getTeam();
  }

  async getTeam() {
    try {
      const res = await axios.get("/api/getTeam/" + this.props.match.params.Pid);
      this.setState({
        data: await res.data.team,
      });
      console.log(this.state.data);
    } catch (err) {
      console.log(err);
    }
  }

  onProjectDeleteHandle = (record) => {
    const data = {
      username: record.username,
      userId: record.userId,
      role: record.role,
    }
    axios
      .post("/api/removeUserFromProject/" + this.props.match.params.Pid, data)
      .then((res) => {
        console.log(res);
        if (res.request.status === 201) {
          this.getTeam();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onProjectEditHandle = (record) => {
    this.props.history.push("/project/settings/" + record._id);
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.getTeam();
    this.setState({ open: false });
  };

  render() {
    const columns = [
      {
        title: "Username",
        dataIndex: "username",
        key: "name",
        width: "30%",
      },
      {
        title: "Username",
        dataIndex: "username",
        key: "username",
        width: "30%",
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: "30%",
      },
      {
        align: "right",
        render: (record) => {
          return record.owner === this.props.owner ? (
            <Space size="small">
              <Button
                icon={<EditTwoTone />}
                type="link"
                onClick={() => this.onProjectEditHandle(record)}
              />
              <Popconfirm
                title="Are you sure？"
                okText="Yes"
                onConfirm={() => this.onProjectDeleteHandle(record)}
                cancelText="No"
              >
                <Button icon={<DeleteTwoTone />} type="link" />
              </Popconfirm>
            </Space>
          ) : null;
        },
      },
    ];
    const { data, loading } = this.state;
    return (
      <>
        <Row className="page">
          <Col>
            <div className="row d-flex align-items-center mb-3">
              <div className="col-9">
                <h3>Team</h3>
              </div>
              <div className="col-3 text-right">
                <Button type="primary" size="sm" className="float-right" onClick={this.handleOpen}>
                    Add user
                </Button>
                <Modal open={this.state.open} onClose={this.handleClose}>
                  <AddUser onClose={this.handleClose} />
                </Modal>
              </div>
            </div>
            {/* {recentsTab} */}
            <Table
              columns={columns}
              rowKey={(record) => record._id}
              data={data}
              size="small"
              // pagination={pagination}
              loading={loading}
              // onChange={this.handleTableChange}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default Settings;
