import React, { Component } from "react";
import Aux from "../../hoc/_Aux/index";
import { Row, Col } from "react-bootstrap";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Button, Space, Popconfirm, Tooltip, Alert, Card } from "antd";
import { Table } from "../../shared/components";
import { Link } from "react-router-dom";
import axios from "axios";

class Defect extends Component {
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
      const response = await axios.get("/api/getDefect/" + Pid);
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
      .post("/api/defect/delete", id)
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
    this.props.history.push("/" + Pid + "/defect/" + record._id);
  };

  render() {
    const columns = [
      {
        title: "Defect Summary",
        dataIndex: "defect",
        key: "defect",
        width: "15%",
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
        width: "15%",
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
        title: "Defect Type",
        dataIndex: "defectType",
        key: "defectType",
        width: "15%",
        colSearch: "true",
      },
      {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        width: "10%",
        sorter: "true",
      },
      {
        title: "Operating System",
        dataIndex: "os",
        key: "os",
        width: "20%",
        sorter: "true",
      },
      {
        title: "Assign To",
        dataIndex: "assignTo",
        key: "assignTo",
        width: "13%",
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
      <Aux>
        <Row>
          <Col>
            <div className="row d-flex align-items-center mb-3">
              <div className="col-9">
                <h3>Defect Management</h3>
              </div>
              <div className="col-3 text-right">
                <Button type="primary" className="float-right">
                  <Link
                    to={"/" + this.props.match.params.Pid + "/defect/create"}
                    className="text-light"
                  >
                    Create Defect
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

export default Defect;
