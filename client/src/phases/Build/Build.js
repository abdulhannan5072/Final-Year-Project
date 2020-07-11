import React, { Component } from "react";
import Aux from "../../hoc/_Aux";
import { Row, Col } from "react-bootstrap";

import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { Table } from "../../shared/components";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Space, Popconfirm, Tooltip } from "antd";

class Build extends Component {
  state = {
    data: [],
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    this.setState({ loading: true });
    const Pid = this.props.match.params.Pid;
    try {
      const response = await axios.get("/api/getBuild/" + Pid);
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
      .post("/api/build/delete", id)
      .then((res) => {
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
    this.props.history.push("/" + Pid + "/build/" + record._id);
  };
  render() {
    const columns = [
      {
        title: "Build",
        dataIndex: "build",
        key: "build",
        sorter: "true",
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "40%",
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
        title: "Created",
        dataIndex: "createdDate",
        key: "createdDate",
        sorter: "true",
      },
      {
        title: "By",
        dataIndex: "createdBy",
        key: "createdBy",
        sorter: "true",
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
      <Aux>
        <Row>
          <Col>
            <div className="row d-flex align-items-center mb-3">
              <div className="col-9">
                <h3>Build</h3>
              </div>
              <div className="col-3 text-right">
                <Button type="primary" className="float-right">
                  <Link
                    to={"/" + this.props.match.params.Pid + "/build/create"}
                    className="text-light"
                  >
                    Create Build
                  </Link>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
        <Table
          columns={columns}
          rowKey={(record) => record._id}
          data={data}
          size="small"
          loading={loading}
        />
      </Aux>
    );
  }
}

export default withRouter(Build);
