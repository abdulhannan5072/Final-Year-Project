import React,{ Component } from "react";
import Aux from "../../hoc/_Aux";
import {Form, Button, } from 'react-bootstrap';
import InputField from '../Forms/InputField';
import Close from '@material-ui/icons/Close';
import TagDropDown from '../Forms/Tag';
import {IconButton} from '@material-ui/core';
import {Link} from 'react-router-dom';
// import AutoComplete from '../Forms/AutoComplete';

class Create extends Component{
    render(){

        const roles = [
            {
                value: 'role1',
                label: 'Admin',
            },
            {
                value: 'role2',
                label: 'Manager',
            },
            {
                value: 'role3',
                label: 'Developer',
            },
            {
                value: 'role4',
                label: 'Tester',
            },
            {
                value: 'role5',
                label: 'Customer',
            }
        ];
        
        
        

        return(
            <Aux>
                <div className='page'>
                <div className='d-flex flex-row-reverse mb-3 '>
                    <Link to='/projects' ><IconButton><Close/></IconButton></Link>
                </div>
                <div className='p-5  '>
                    <div className="">
                        <h3 >Invite Users</h3>
                    </div>
                    
                    <Form >
                        <Form.Group controlId="formBasicEmail"  className='mt-5'>
                            <InputField className='w-25' id="standard-basic" label="Email address 1" placeholder='Enter email'/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail"  className='mt-2'>
                            <InputField className='w-25' id="standard-basic" label="Email address 2" placeholder='Enter email'/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail"  className='mt-2'>
                            <InputField className='w-25' id="standard-basic" label="Email address 3" placeholder='Enter email'/>
                        </Form.Group>
                        <div >
                            <TagDropDown data={roles} />
                        </div>
                        <div className='w-25'>
                        <Button className='mt-5 ' variant="dark" type="submit">
                            Invite
                        </Button>
                        </div>
                    </Form>
                </div>
                </div>
            </Aux>
        );
    }
}

export default Create;