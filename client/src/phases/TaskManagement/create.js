import React, {Component} from 'react';
import Aux from '../../hoc/_Aux';
import {FlatCard, Formik, Form, InputFormik, QuillEditorFormik, SelectTextFieldFormik
} from '../../shared/components';
import {Row, Col, Button,
} from 'react-bootstrap';
import Close from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import {InputLabel, Paper, Button as MButton} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import * as Yup from 'yup';


const items =[
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
    reporter:'',
    dueDate:'',
    createdBy: ''
};

const validationSchema= Yup.object().shape({
    taskname: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
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
                            <Paper className='p-2'>
                                <div  >
                                    <div className='d-flex  m-2 '>
                                        <Button variant="dark" size='sm' type='submit' >Update</Button>
                                        <div className='ml-auto' >
                                            <Link to='//#region ' ><IconButton><Close/></IconButton></Link>
                                        </div>
                                        
                                    </div>
                                    <div className='mt-2' >
                                        <InputFormik fullWidth name='taskName' id='name'  />
                                    </div>
                                    <div className='m-2' >
                                        
                                        <IconButton>
                                            <AttachFileIcon  />
                                        </IconButton>
                                        
                                        <IconButton>
                                            <InsertLinkIcon  />
                                        </IconButton>
                                    </div>

                                    <div className='m-2'>
                                        <SelectTextFieldFormik name='status'  items={items} />
                                    </div>

                                    <div className='m-2' >
                                        <QuillEditorFormik 
                                            label="Description"
                                            name='description'
                                        />
                                    </div>
                                    <div className='m-2' >
                                        <label>Attachments</label>
                                        <div></div>
                                    </div>
                                    <div className='m-2'>
                                        <label>Web links</label>
                                        <div className='d-inline-flex' >
                                            <InputFormik name='url' id='url' label='URL' className='mr-2' border='true' bgc='true'/>
                                            <InputFormik name='linkText' id='label' label='Link text' border='true' bgc='true' />
                                        </div>
                                        <div  className='d-flex justify-content-end pt-2'  >
                                            <Button size='sm' variant="dark" className='mr-2 mt-2'>Link</Button>
                                            <Button size='sm' variant="dark" className='mr-0 mt-2'>Cancel</Button>

                                        </div>
                                    </div>
                                    <div className='m-2' >
                                        <InputLabel shrink >Assignee</InputLabel>
                                        <InputFormik fullWidth name='assignTo'  id='name' border='true' />
                                        
                                    </div>
                                    <Divider className='mt-4 mb-3' />
                                    <div className='m-2' >
                                        <InputLabel shrink >Reporter</InputLabel>
                                        <InputFormik fullWidth name='reporter'  id='name'  border='true'/>
                                        
                                    </div>
                                    <Divider className='mt-4 mb-3 ' />
                                    <Divider className='mt-4 mb-3' />
                                    <div className='m-2' >
                                        <InputLabel shrink >Due Date</InputLabel>
                                        <InputFormik fullWidth name='dueDate'  id='name'  border='true'/>
                                        
                                    </div>
                                    <Divider className='mt-4 mb-3 ' />
                                </div>
                            </Paper>
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
           
            <Col md={8} >
                <Paper className='p-2'>
                    <div>
                        <FlatCard  title="Task Name" />
                        <FlatCard  title="Task Name" />
                        <FlatCard  title="Task Name" />
                    </div>
                    <div className='mt-2'>
                        <MButton
                            variant="contained"
                            color="default"
                            className=''
                            startIcon={<AddIcon />}
                        >
                            Create
                        </MButton>
                    </div>
                </Paper>
            </Col>
            
            
            <Col md={4} >
                {taskDetails}
            </Col>
            
        </Row>
      </Aux>
    );
  }

}

export default CreateTask;