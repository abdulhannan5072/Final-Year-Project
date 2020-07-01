import React, {Component} from 'react';
import Aux from "../../hoc/_Aux/index";
import {Row, Col, Card, Button 
        } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import DEMO from "../../store/constant";
import {Link} from 'react-router-dom'
import StarRateIcon from '@material-ui/icons/StarRate';

import StarBorderIcon from '@material-ui/icons/StarBorder';






  const textStyle = {
    color:'white'
};


    class Projects extends Component{
        
        render(){

            // const data = [ 
            //     {id:1, name:'Softech', type:'Web application', lead:'abdulhannan5072'},
            //     {id:2, name:'Example', type:'Android application', lead:'unknown'}
            // ];

            const columns = [
                {
                    name: <StarRateIcon/>,
                    cell: row => <StarBorderIcon/>,
                    width: '56px',
                  },
                {
                  name: 'Name',
                  selector: 'name',
                  sortable: true,
                  grow: 2,
                  style: {
                    color: '#202124',
                    fontSize: '14px',
                    fontWeight: 500,
                  },
                  cell: row => <a className='text-primary' href={DEMO.BLANK_LINK}>{row.name}</a>
                  
                },
                {
                  name: 'Type',
                  selector: 'type',
                  sortable: true,
                  
                },
                {
                  name: 'Lead',
                  selector: 'lead',
                  sortable: true,
                  allowOverflow: true,
                    
                 
                },
                {
                    button: true,
                    
                }
              ];
            
              

            const recentsTab = (
            <Card>
                <Card.Header>Recents</Card.Header>
                <Card.Body>
                    <Row>
                    <Col md={6} xl={3}>
                            <Card className="bg-info rounded">
                                <Card.Body>
                                <div className = "media position-relative" style={textStyle}>
                                    <FontAwesomeIcon icon = {faCoffee} size="lg" className="mr-3"/>
                                        <div className = "media-body " >
                                            <Card.Subtitle className="mb-2 " >Project Title</Card.Subtitle>
                                            <Card.Text>Project Type</Card.Text>
                                        </div>
                                    </div>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} xl={3}>
                            <Card className="bg-dark rounded">
                                <Card.Body >
                                    
                                <div className = "media position-relative" style={textStyle}>
                                    <FontAwesomeIcon icon = {faCoffee} size="lg" className="mr-3"/>
                                        <div className = "media-body " >
                                            <Card.Subtitle className="mb-2 " >Project Title</Card.Subtitle>
                                            <Card.Text>Project Type</Card.Text>
                                        </div>
                                    </div>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} xl={3}>
                            <Card className="bg-success rounded">
                                <Card.Body>
                                    
                                <div className = "media position-relative" style={textStyle}>
                                    <FontAwesomeIcon icon = {faCoffee} size="lg" className="mr-3"/>
                                        <div className = "media-body " >
                                            <Card.Subtitle className="mb-2 " >Project Title</Card.Subtitle>
                                            <Card.Text>Project Type</Card.Text>
                                        </div>
                                    </div>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} xl={3}>
                            <Card className="bg-primary rounded">
                                <Card.Body>
                                    
                                <div className = "media position-relative" style={textStyle}>
                                    <FontAwesomeIcon icon = {faCoffee} size="lg" className="mr-3"/>
                                        <div className = "media-body " >
                                            <Card.Subtitle className="mb-2 " >Project Title</Card.Subtitle>
                                            <Card.Text>Project Type</Card.Text>
                                        </div>
                                    </div>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        

                    </Row>
                </Card.Body>
                </Card>
                );
            
            
                


            return(
                <Aux >
                    <Row className='page'>
                        <Col>
                            <div className="row d-flex align-items-center mb-3">
                                <div className="col-9">
                                <h3>Projects</h3>
                                </div>
                                <div className="col-3 text-right">
                                    <Button  variant="dark" size="sm" className="float-right">
                                    <Link to='/projects/create' className='text-light'>Create Project</Link>
                                    </Button>
                                </div>
                            </div>   
                            {recentsTab}
                            

                        </Col>
                    </Row>
                    
                </Aux>
            )
        }    
    }


export default Projects;