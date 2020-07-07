import React, {Component} from 'react';
import Aux from "../../hoc/_Aux/index";
import {Row, Col, Button, 
        } from 'react-bootstrap';

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {IconButton} from '@material-ui/core';
import {Table } from '../../shared/components';
import {Link} from 'react-router-dom';
import axios from 'axios';
const data = [ {id:1, name:'1.0', description:'------', created:'March 01, 2020', by:'abdulhannan5072'},
                
];

const columns = [
    {
        title: 'Task Name',
        field: 'taskName',
      
    },
    {
        title: 'Status',
        field: 'status',
      
    },
    {
        title: 'Description',
        field: 'description',
      
    },
  
    {
        title: 'URl',
        field: 'url',
    },
    {
        title: 'Link text',
        field: 'linkText',
    },
    {
        title: 'Assign To',
        field: 'assignTo',
    },
    {
        title: 'Reporter',
        field: 'reporter',
    
    },
    {
        title: 'Due Date',
        field: 'dueDate',
    },
    {
        title: 'created date',
        field: 'createddate',
    },
    {
        title: 'Created by',
        field: 'createdby',
    },
 
  ];
    class Task extends Component{
        state={
            data:[]
        }

        componentDidMount(){
            this.getData();
        }

        getData = () => {
            axios.get('/api/gettask')
                .then((res)=>{
                    console.log(res);
                    this.setState({data: res.data});
                    console.log(this.state.data);

                })
                .catch((err)=>{
                    console.log(err);
                })
            }
        
        render(){
   
         
           
            
              const More = ({row}) => (
                  
                    <IconButton aria-label='morehoriz' >
                        <MoreHorizIcon/>
                    </IconButton>
                  
              );
            

            return(
                <Aux>
                    <Row>
                        <Col>
                            <div className="row d-flex align-items-center mb-3">
                                <div className="col-9">
                                <h3>Task Management</h3>
                                </div>
                                <div className="col-3 text-right">
                                    <Button variant="dark" size="sm" className="float-right">
                                    <Link to='/project/createTask' className='text-light'>Create </Link>
                                    </Button>
                                </div>
                            </div>   
                            <Table title={null} columns={columns} data={this.state.data} />

                        </Col>
                    </Row>
                    
                </Aux>
            )
        }    
    }


export default Task;