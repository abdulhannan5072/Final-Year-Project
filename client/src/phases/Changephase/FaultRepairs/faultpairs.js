import React, { Component } from "react";
import Aux from "../../../hoc/_Aux/index";
import { Row, Col } from "react-bootstrap";

import { Table } from "../../../shared/components";
import { Link } from "react-router-dom";
import axios from "axios";

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Space, Popconfirm, Tooltip } from "antd";


class FaultRepair extends Component {
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
      const response = await axios.get("/api/getCorrectiveMaintenance/" + Pid);
      this.setState({
        loading: false,
        data: await response.data,
      });
      // console.log(response)
    } catch (err) {
      console.log(err);
    }
  }

  onProjectDeleteHandle = (record) => {
    const id = {
      _id: record._id,
    };
    axios
      .post("/api/correctiveMaintenance/delete", id)
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
      "/" + Pid + "/changePhase/faultRepairs/" + record._id
    );
  };
  render() {
    const columns = [
      {
        title: "Fault",
        dataIndex: "fault",
        key: "fault",
        sorter: "true",
        width: "20%",
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
        width: "30%",
        ellipsis: {
          showTitle: false,
        },
        render: (address) => (
          <Tooltip placement="topLeft" title={address.replace(/<[^>]*>/g, '')}>
            {address.replace(/<[^>]*>/g, '')}
          </Tooltip>
        ),
      },
      {
        title: "Build",
        dataIndex: "build",
        key: "build",
        sorter: "true",
      },
      {
        title: "Module",
        dataIndex: "module",
        key: "module",
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
                <h3>Fault Repair</h3>
              </div>
              <div className="col-3 text-right">
                <Button type="primary" className="float-right">
                  <Link
                    to={
                      "/" +
                      this.props.match.params.Pid +
                      "/changePhase/faultRepairs/create"
                    }
                    className="text-light"
                  >
                    Create Fault
                  </Link>
                </Button>
              </div>
            </div>
            <Table
              columns={columns}
              rowKey={(record) => record._id}
              data={data}
              size="small"
              loading={loading}
            />
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default FaultRepair;
