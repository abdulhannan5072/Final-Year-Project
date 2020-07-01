import React, {Component} from 'react';
import Aux from "../../hoc/_Aux";
import {Row, Col, Button, 
        } from 'react-bootstrap';

import {Link} from 'react-router-dom';
import axios from 'axios';
import {Table } from '../../shared/components';


// const data = [ 
//     { build:'1.0', description:'------', created:'March 01, 2020', by:'abdulhannan5072'},
    
// ];

const columns = [
    {
        title: 'Build',
        field: 'build',
      
    },
    {
        title: 'Description',
        field: 'description',
    },
    {
        title: 'Created',
        field: 'created',
    },
    {
        title: 'By',
        field: 'by',
      },
  ];

    class Build extends Component{

        state={
            data:[]
        }

        componentDidMount(){
            this.getData();
        }

        getData = () => {
            axios.get('/api/getBuild')
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
                                <h3>Build</h3>
                                </div>
                                <div className="col-3 text-right">
                                    <Button variant="dark" size="sm" className="float-right">
                                    <Link to='/project/build/create' className='text-light'>Create Build</Link>
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


export default Build;