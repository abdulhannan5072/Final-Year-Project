import React, { Component } from "react";
import Aux from "../../../hoc/_Aux/index";
import { Row, Col } from "react-bootstrap";

import { Table } from "../../../shared/components";
import { Link } from "react-router-dom";
import axios from "axios";

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Space, Popconfirm, Tooltip, Card, Alert } from "antd";

class PerfectiveMaintenance extends Component {
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
      const response = await axios.get(
        "/api/getFunctionatilityAddition/" + Pid
      );
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
      .post("/api/functionatilityAddition/delete", id)
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
      "/" + Pid + "/changePhase/functionatilityAddition/" + record._id
    );
  };
  render() {
    const columns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
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
        title: "Type",
        dataIndex: "functionalityType",
        key: "functionalityType",
        sorter: "true",
        colSearch: "true",
        width: "20%",
      },
      {
        title: "Requirements",
        dataIndex: "requirements",
        key: "requirements",
        width: "25%",
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
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: "25%",
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
        align: "right",
        width: "10%",
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
            <div className="mb-4">
              <Alert
                message="What is Perfective Maintenance"
                description="	Perfective maintenance mainly deals with implementing new or changed user requirements. Perfective maintenance involves making functional enhancements to the system in addition to the activities to increase the system’s performance even when the changes have not been suggested by faults. This includes enhancing both the function and efficiency of the code and changing the functionalities of the system as per the users’ changing needs."
                type="info"
                showIcon
              />
            </div>
            <Card
              title="Perfective Maintenance"
              bordered={false}
              extra={
                <Button type="primary" className="float-right">
                  <Link
                    to={
                      "/" +
                      this.props.match.params.Pid +
                      "/changePhase/functionatilityAddition/create"
                    }
                    className="text-light"
                  >
                    Create new requirements
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
          </Col>
        </Row>
      </Aux>
    );
  }
}

export default PerfectiveMaintenance;
