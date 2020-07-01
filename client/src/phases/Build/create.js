import React,{ Component } from "react";
import { Button} from 'react-bootstrap';
import Close from '@material-ui/icons/Close';
import {IconButton, Paper } from '@material-ui/core';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Aux from "../../hoc/_Aux";
import * as Yup from 'yup';
import { withSnackbar } from 'notistack';


import {Formik, Form, TextFieldFormik, QuillEditorFormik
} from '../../shared/components';


const initialValues= {
    build: '',
    description: '',
    
};

const validationSchema= Yup.object().shape({
    build: Yup.string()
        .min(2, 'Too Short!')
        .required('Required'),
});

class Create extends Component{
    
    onSubmit= (values, { setSubmitting}) => {
        
        axios.post('/api/build/create',values)
            .then(res => {
                console.log(res);
                if(res.status === 200 ){
                    this.props.enqueueSnackbar('Build created', { 
                        variant: 'success',
                    });

                }
                
            });
        
    }
    

    render(){
        return(
            <Aux>
                <div className='page'>
                <div className='d-flex flex-row-reverse mb-3 '>
                    <Link to='/project/build' ><IconButton><Close/></IconButton></Link>
                </div>
                    <Paper className='p-5  '>
                        
                        <div className="mb-2">
                            <h3 >Create Build</h3>
                        </div>
                        
                        <Formik 
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={this.onSubmit}
                        >
                            {(props) => (
                                <Form>
                                    <div className='mt-5' >
                                        <TextFieldFormik label='Build' name='build' />
                                    </div>
                                    
                                    <div className='mt-4'>
                                        <QuillEditorFormik
                                            label="Description"
                                            name='description'
                                        />
                                    </div>
                                    
                                    
                                    <div className='w-25'>
                                        <Button className='mt-5 ' variant="dark" type="submit">
                                            Create
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>               
                    </Paper>
                </div>
            </Aux>
        );

    }
} 

export default withSnackbar(Create);