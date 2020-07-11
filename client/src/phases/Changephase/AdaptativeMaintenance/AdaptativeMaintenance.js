import React, { Component } from "react";
import Aux from "../../../hoc/_Aux/index";
import { Row, Col } from "react-bootstrap";

import { Table } from "../../../shared/components";
import { Link } from "react-router-dom";
import axios from "axios";

import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Space, Popconfirm, Tooltip, Alert, Card } from "antd";

class AdoptiveMaintenance extends Component {
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
      const response = await axios.get("/api/getAdaptiveMaintenance/" + Pid);
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
      .post("/api/adaptiveMaintenance/delete", id)
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
      "/" + Pid + "/changePhase/adaptiveMaintenance/" + record._id
    );
  };
  render() {
    const columns = [
      {
        title: "Affected",
        dataIndex: "affected",
        key: "affected",
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
        dataIndex: "type",
        key: "type",
        sorter: "true",
        width: "15%",
        colSearch: "true",
      },
      {
        title: "Affected By",
        dataIndex: "affectedBy",
        key: "affectedBy",
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
        width: "30%",
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
        width: "15%",
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
                message="What is Adaptive Maintenance"
                description="Adaptive maintenance is the modification of a software product, performed after delivery, to keep a software product usable in a changed or changing environment"
                type="info"
                showIcon
              />
            </div>
            <Card
              title="Adoptive Maintenance"
              bordered={false}
              extra={
                <Button type="primary" className="float-right">
                  <Link
                    to={
                      "/" +
                      this.props.match.params.Pid +
                      "/changePhase/adaptiveMaintenance/create"
                    }
                    className="text-light"
                  >
                    Create requirements
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

export default AdoptiveMaintenance;
