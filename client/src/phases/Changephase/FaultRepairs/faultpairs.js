import React, {Component} from 'react';
import Aux from "../../../hoc/_Aux/index";
import {Row, Col, Button, 
        } from 'react-bootstrap';

import {Table } from '../../../shared/components';
import {Link} from 'react-router-dom';
import axios from 'axios';
// const data = [ {id:1, name:'1.0', description:'------', created:'March 01, 2020', by:'abdulhannan5072'},
                
// ];

const columns = [
    {
        title: 'Select Build',
        field: 'selectBuild',
      
    },
    {
        title: 'Select Module',
        field: 'selectModule',
      
    },
    {
        title: 'Fault Type',
        field: 'faultType',
      
    },
    {
        title: 'Fault name',
        field: 'fault',
      
    },
    {
        title: 'Description',
        field: 'description',
    },
 
  ];
    class FaultRepair extends Component{
        state={
            data:[]
        }

        componentDidMount(){
            this.getData();
        }

        getData = () => {
            axios.get('/api/getcorrectivemaintenance')
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
   

            return(
                <Aux>
                    <Row>
                        <Col>
                            <div className="row d-flex align-items-center mb-3">
                                <div className="col-9">
                                <h3>Fault Repair</h3>
                                </div>
                                <div className="col-3 text-right">
                                    <Button variant="dark" size="sm" className="float-right">
                                    <Link to='/project/changePhase/faultRepairs/create' className='text-light'>Create </Link>
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


export default FaultRepair;