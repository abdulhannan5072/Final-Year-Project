import React, {Component} from 'react';
import Aux from '../../hoc/_Aux';
import {FlatCard, Input, Select, Formik, Form, InputFormik, SelectFormik, QuillEditorFormik, SelectTextFieldFormik
} from '../../shared/components';

import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

import {Link} from 'react-router-dom';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import { AntInput,AntSelect } from "../../shared/components";
import {  Field } from "formik";
import { Col, Row } from "react-bootstrap";
import { Button, Card } from "antd";
import {InputLabel,  Button as MButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as Yup from 'yup';


const status =[
    {
        value: 'to do',
        label: 'To Do'
    },
    {
        value: 'progress',
        label: 'In Progress'
    },
    {
        value: 'done',
        label: 'Done'
    },
]

const initialValues= {
    taskName: 'Task Name',
    status: '',
    description: '',
    url: '',
    linkText: '',
    assignTo: '',
    attachment:'',
    startDate:'',
    dueDate:'',
    createdBy: ''
};

const validationSchema= Yup.object().shape({
    taskname: Yup.string()
        .min(3, 'Too Short!')
        .required('Required').max(12,"Too Long "),
        status: Yup.string().required('Required'),
        url: Yup.string().required('Required'),
        assignTo: Yup.string().required('Required'),
        startDate: Yup.string().required('Required'),
        dueDate: Yup.string().required('Required'),

});

class CreateTask extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            description:''
        }
    }
    editorChangeHandle(value) {
        this.setState({ description: value });
    }

    onSubmit= (values, { setSubmitting}) => {
            console.log(values);
    }

    

    render(){

        const taskDetails = (
            <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={this.onSubmit}
                >
                    {(props)=>(
                        <Form>
                            <Card>
                                <div  >
                        
                                  
                                     <Row>
                                     <Col sm="6">
                            <div className="">
                          <Field
                          component={AntSelect}
                          name="status"
                          options={status}
                          label="status"
                          hasFeedback
                        />
                              </div>
                             </Col>
                                
                                     <Col sm="6">
                               <div className="mt-2">
                                 <Field
                                 component={AntInput}
                                  label="Attachment"
                                    name="attachment"
                                  hasFeedback
                                    />
                                    
                                     </div>
                                     </Col>
                                     </Row>
                                     <Row>
                                    <Col md="4">
                               <div className="mt-2">
                                 <Field
                                 component={AntInput}
                                  label="Assign To"
                                    name="assignTo"
                                  hasFeedback
                                    />
                                     </div>
                                     </Col>
                                    
                               <Col md="4">
                               <div className="mt-2">
                                 <Field
                                 component={AntInput}
                                  label="Start Date"
                                    name="startDate"
                                  hasFeedback
                                    />
                                     </div>
                                     </Col>
                                   
                                     <Col md="4" >
                               <div className="mt-2">
                                 <Field
                                 component={AntInput}
                                  label="Due Date"
                                    name="dueDate"
                                  hasFeedback
                                    />
                                     </div>
                                     </Col>
                                     </Row>
                                   
                      <Row>
                               <Col >
                               <div className="mt-2">
                                 <Field
                                 component={AntInput}
                                  label="Task Name"
                                    name="taskname"
                                  hasFeedback
                                    />
                                     </div>
                                     </Col>
                                     </Row>
                                    <div className='m-2' >
                                        <QuillEditorFormik 
                                            label="Description"
                                            name='description'
                                        />
                                    </div> 
                                    <div className='d-flex  m-2 '>
                                        <Button variant="dark" size='sm' type='submit' >Update</Button>
                                        <Button variant="dark" size='sm' type='submit' >Cancel</Button>
                                    </div> 
                                </div>
                            </Card>
                        </Form>
                    )}
                </Formik>
        );
    

    return(
      <Aux>

        <Row>
            <Col>
                <div className="row d-flex align-items-center mb-3">
                    <div className="col-9">
                        <h3>Task</h3>
                    </div>
                </div>   
            </Col>
        </Row>
        <Row>
           
      
            
            
            <Col>
                {taskDetails}
            </Col>
          
        </Row>
      </Aux>
    );
  }

}

export default CreateTask;