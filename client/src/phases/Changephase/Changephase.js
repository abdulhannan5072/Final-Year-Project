import React, {Component} from 'react';
import Aux from "../../hoc/_Aux/index";
import {Row, Col, Button,
        } from 'react-bootstrap';
import DEMO from "../../store/constant";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {IconButton} from '@material-ui/core';
import Table from '../../components/Tables/Table';
import IssueCreate from '../TaskManagement/create'; 
import { Modal } from '../../shared/components';


    class Changephase extends Component{

        

        render(){
            
            
           
            const data = [ 
                {id:1, name:"Softech", build:'5.0', type:'Fault Repairs', description:'Navbar not working on mobile screens', created:'March 01, 2020', by:'abdulhannan5072'},
                
            ];

            const columns = [
                
                {
                  name: 'Project',
                  selector: 'name',
                  
                  grow: 2,
                  style: {
                    color: '#202124',
                    fontSize: '14px',
                    fontWeight: 500,
                  },
                  cell: row => <a className='text-primary' href={DEMO.BLANK_LINK}>{row.name}</a>
                  
                },
                {
                    name: 'Build',
                    selector: 'build',
                },  
                {
                    name: 'Type',
                    selector: 'type',
                }, 
                {
                  name: 'Description',
                  selector: 'description',
                },
                {
                  name: 'Created',
                  selector: 'created',
                },
                {
                    name: 'By',
                    selector: 'by',
                  },
                {
                    button: true,
                    cell: row => <More row={row}/>
                }
              ];
            
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
                                <h3>Change Phase</h3>
                                </div>
                                <div className="col-3 text-right">
                                    <Button variant="dark" size="sm"  className="float-right">
                                    Create Requirment
                                    </Button>
                                </div>
                            </div>   
                            <Table columns={columns} dataItems={data} />

                        </Col>
                    </Row>
                    
                </Aux>
            )
        }    
    }


export default Changephase;