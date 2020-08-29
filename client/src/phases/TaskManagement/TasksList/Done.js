import React, { Component } from "react";
import { Row} from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { Table } from "../../../shared/components";
import {connect} from 'react-redux';

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Space, Popconfirm, Tooltip,  Card } from "antd";

class Done extends Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    this.setState({ loading: true });
    // const Pid = this.props.match.params.Pid;
    try {
      const response = await axios.get("/api/getDoneTask/" + this.props.username);
      this.setState({
        loading: false,
        data: await response.data,
      });
    } catch (err) {
      console.log(err);
    }
  }

  onProjectDeleteHandle = (record) => {
    const id = {
      _id: record._id,
    };
    axios
      .post("/api/task/delete", id)
      .then((res) => {
        console.log(res);
        if (res.request.status === 201) {
          this.fetch();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onProjectEditHandle = (record) => {
    const Pid = this.props.match.params.Pid;
    this.props.history.push(
      "/" + Pid + "/task/" + record._id
    );
  };
  render() {
    const columns = [
      {
        title: "Task summary",
        dataIndex: "taskName",
        key: "taskName",
        sorter: "true",
        width: "20%",
        colSearch: "true",
        ellipsis: {
          showTitle: false,
        },
        render: (address) => (
          <Tooltip placement="topLeft" title={address}>
            {address}
          </Tooltip>
        ),
      },
      
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "20%",
        ellipsis: {
          showTitle: false,
        },
        render: (address) => (
          <Tooltip placement="topLeft" title={address.replace(/<[^>]*>/g, "")}>
            {address.replace(/<[^>]*>/g, "")}
          </Tooltip>
        ),
      },
      {
        title: "Assign to",
        dataIndex: "assignTo",
        key: "assignTo",
        width: "15%",
        sorter: "true",
        colSearch: "true",
      },
      {
        title: "StartDate",
        dataIndex: "startDate",
        key: "startDate",
        width: "15%",
        sorter: "true",
        colSearch: "true",
      },
      {
        title: "Due Date",
        dataIndex: "dueDate",
        key: "dueDate",
        width: "15%",
        sorter: "true",
        colSearch: "true",
      },
      {
        align: "right",
        render: (record) => (
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
        ),
      },
    ];

    const { data, loading } = this.state;

    return (
        <Row>
          <Card
            title="Task"
            bordered={false}
            extra={
              <Button type="primary" className="float-right">
                <Link
                  to={"/" + this.props.match.params.Pid + "/task/create"}
                  className="text-light"
                >
                  Create new tasks
                </Link>
              </Button>
            }
          >
            <Table
              columns={columns}
              rowKey={(record) => record._id}
              data={data}
              size="small"
              loading={loading}
            />
          </Card>
        </Row>
    );
  }
}
const mapStateToProps = state => {
  return{
    username: state.auth.user.username
  }
}
export default connect(mapStateToProps)(Done);
