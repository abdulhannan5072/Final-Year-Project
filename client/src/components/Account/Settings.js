import React, {Component} from 'react';
import Aux from '../../hoc/_Aux';
import { Paper } from '@material-ui/core';
import './style.css';
import { Row, Col, Card, Form, Button, Alert} from 'react-bootstrap';
import Editable from '../Forms/Editable/Editable';
import InputField from '../Forms/InputField';


class Settings extends Component{
    render(){
        return(
            <Aux>
                
                <div className=' d-flex lr-margin '>
                <div className="mb-5">
                    <h3 >Profile and visibility</h3>
                </div>
                    <Card >
                        <Card.Header>About you</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail"  className='mt-2'>
                                    <InputField className='w-50' id="standard-basic" label="Name" value='Abdul Hannan'/>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail"  className='mt-2'>
                                    <InputField  className='w-50' id="standard-basic" label="Username" value='abdulhannan5072'/>
                                </Form.Group>
                                <footer >
                                    <Button className='ml-2' variant='light' size='sm'  >Save changes</Button>
                                </footer>
                            </Form>
                        </Card.Body>
                    </Card>  
                    <Card >
                        <Card.Header>Email</Card.Header>
                        <Card.Body>
                            
                            <Alert variant="warning" >
                                <Alert.Heading>Connected account</Alert.Heading>
                                <p>
                                Your account is connected to a Google account. Changing the email address here will disconnect your account from the Google account.
                                </p>
                            </Alert>

                            <Card.Subtitle className='mt-3 mb-4'>Your current email is <b>abdulhannan5072.ah@gmail.com</b></Card.Subtitle>

                            <Form>

                                <Form.Group controlId="formBasicEmail"  className='mt-2'>
                                    <InputField className='w-50' type='email' id="standard-basic" label="New email address" placeholder='New email address'/>
                                </Form.Group>
                                
                                <footer >
                                    <Button className='ml-2' variant='light' size='sm'  >Save changes</Button>
                                </footer>
                            </Form>
                        </Card.Body>
                    </Card> 
                <div className="mb-5">
                    <h3 >Security</h3>
                </div>
                    <Card >
                        <Card.Header>Change password</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail"  className='mt-2'>
                                    <InputField className='w-50' type='password' id="standard-basic" label="Current password" />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail"  className='mt-2'>
                                    <InputField  className='w-50' type='password' id="standard-basic" label="New password" />
                                </Form.Group>
                                <footer >
                                    <Button className='ml-2' variant='light' size='sm'  >Save changes</Button>
                                </footer>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
                
            </Aux>
        );
    }
}

export default Settings;