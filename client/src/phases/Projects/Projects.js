import React, { Component } from "react";
import { Link  } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

import Aux from "../../hoc/_Aux/index";
import { Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { Button, Space, Popconfirm } from "antd";
import {
  DeleteTwoTone,
  EditTwoTone,
} from "@ant-design/icons";

import Table from "../../shared/components/Table";
import { currentOpenProject } from "../../store/actions";

const textStyle = {
  color: "white",
};


class Projects extends Component {
  state = {
    data: [],
    pagination: {
      current: 1,
      pageSize: 10,
    },
    loading: false,
  };

  componentDidMount() {
    // const { pagination } = this.state;
    this.fetch();
  }

  async fetch(params) {
    this.setState({ loading: true });

    try {
      const response = await axios.get("/api/getProjects");
      this.setState({
        loading: false,
        data: await response.data,
        // pagination: {
        //   ...params,
        //   total: response.data.length,
        // },
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleTableEvent = (text, record) => {
    return (
      <Button type="link" onClick={() => this.onProjectClickHandle(record)}>
        {text}
      </Button>
    );
  };

  onProjectClickHandle = (record) => {
    this.props.currentProject(record);
    this.props.history.push("/" + record._id + "/build");
  };

  onProjectDeleteHandle = (record) => {
    const id = {
      _id: record._id,
    };
    axios
      .post("/api/projects/delete", id)
      .then((res) => {
        console.log(res);
        if (res.request.status === 201) {
          // let updatedData = [...this.state.data];
          // updatedData = updatedData.filter(
          //   (data) => data.id !== record._id
          // );
          this.fetch()
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  onProjectEditHandle = (record) => {
    // console.log(record)
  };

  // handleTableChange = (pagination, filters, sorter) => {
  //   this.fetch({
  //     sortField: sorter.field,
  //     sortOrder: sorter.order,
  //     pagination,
  //     ...filters,
  //   });
  // };
  render() {
    const columns = [
      {
        title: "Project name",
        dataIndex: "projectName",
        key: "projectName",
        render: (text, record) => this.handleTableEvent(text, record),
        sorter: "true",
        width: "30%",
        // colSearch: true,
      },
      {
        title: "Type",
        dataIndex: "projectType",
        key: "projectType",
        width: "20%",
        sorter: "true",
        filters: [
          { text: "Android Application", value: "android" },
          { text: "Web Application", value: "web" },
          { text: "IOS Application", value: "ios" },
          { text: "Desktop Application", value: "desktop" },
        ],
      },
      {
        title: "Lead",
        dataIndex: "createdBy",
        key: "createdBy",
        sorter: "true",
        colSearch: true,
      },
      {
        title: "Created On",
        dataIndex: "createdDate",
        key: "createdDate",
        sorter: "true",
      },
      {
        align: 'right',
        render: (record) => (
          <Space size="small">
            <Button
              icon={<EditTwoTone />}
              type="link"
              onClick={() => this.onProjectEditHandle(record)}
            />
            <Popconfirm title="Are you sure？" okText="Yes" onConfirm={() => this.onProjectDeleteHandle(record)} cancelText="No">
              <Button
                icon={<DeleteTwoTone />}
                type="link"
              />
            </Popconfirm>
          </Space>
        ),
      },
    ];

    // const recentsTab = (
    //   <Card>
    //     <Card.Header>Recents</Card.Header>
    //     <Card.Body>
    //       <Row>
    //         <Col md={6} xl={3}>
    //           <Card className="bg-info rounded">
    //             <Card.Body>
    //               <div className="media position-relative" style={textStyle}>
    //                 <FontAwesomeIcon
    //                   icon={faCoffee}
    //                   size="lg"
    //                   className="mr-3"
    //                 />
    //                 <div className="media-body ">
    //                   <Card.Subtitle className="mb-2 ">
    //                     Project Title
    //                   </Card.Subtitle>
    //                   <Card.Text>Project Type</Card.Text>
    //                 </div>
    //               </div>
    //             </Card.Body>
    //           </Card>
    //         </Col>
    //         <Col md={6} xl={3}>
    //           <Card className="bg-dark rounded">
    //             <Card.Body>
    //               <div className="media position-relative" style={textStyle}>
    //                 <FontAwesomeIcon
    //                   icon={faCoffee}
    //                   size="lg"
    //                   className="mr-3"
    //                 />
    //                 <div className="media-body ">
    //                   <Card.Subtitle className="mb-2 ">
    //                     Project Title
    //                   </Card.Subtitle>
    //                   <Card.Text>Project Type</Card.Text>
    //                 </div>
    //               </div>
    //             </Card.Body>
    //           </Card>
    //         </Col>
    //         <Col md={6} xl={3}>
    //           <Card className="bg-success rounded">
    //             <Card.Body>
    //               <div className="media position-relative" style={textStyle}>
    //                 <FontAwesomeIcon
    //                   icon={faCoffee}
    //                   size="lg"
    //                   className="mr-3"
    //                 />
    //                 <div className="media-body ">
    //                   <Card.Subtitle className="mb-2 ">
    //                     Project Title
    //                   </Card.Subtitle>
    //                   <Card.Text>Project Type</Card.Text>
    //                 </div>
    //               </div>
    //             </Card.Body>
    //           </Card>
    //         </Col>
    //         <Col md={6} xl={3}>
    //           <Card className="bg-primary rounded">
    //             <Card.Body>
    //               <div className="media position-relative" style={textStyle}>
    //                 <FontAwesomeIcon
    //                   icon={faCoffee}
    //                   size="lg"
    //                   className="mr-3"
    //                 />
    //                 <div className="media-body ">
    //                   <Card.Subtitle className="mb-2 ">
    //                     Project Title
    //                   </Card.Subtitle>
    //                   <Card.Text>Project Type</Card.Text>
    //                 </div>
    //               </div>
    //             </Card.Body>
    //           </Card>
    //         </Col>
    //       </Row>
    //     </Card.Body>
    //   </Card>
    // );

    const { data, loading } = this.state;

    return (
      <Aux>
        <Row className="page">
          <Col>
            <div className="row d-flex align-items-center mb-3">
              <div className="col-9">
                <h3>Projects</h3>
              </div>
              <div className="col-3 text-right">
                <Button type="primary" size="sm" className="float-right">
                  <Link to="/projects/create" className="text-light">
                    Create Project
                  </Link>
                </Button>
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
      </Aux>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    currentProject: (project) => dispatch(currentOpenProject(project)),
  };
};

export default connect(null, mapDispatchToProps)(Projects);
