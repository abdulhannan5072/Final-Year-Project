import React,{ Component } from "react";
import { Button} from 'react-bootstrap';
import Close from '@material-ui/icons/Close';
import {IconButton, Paper } from '@material-ui/core';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Aux from "../../hoc/_Aux";
import * as Yup from 'yup';
import { withSnackbar } from 'notistack';
import {Formik, Form, TextFieldFormik, QuillEditorFormik,SelectTextFieldFormik,
} from '../../shared/components';

const select=[
    {
    value: 'select ',
    label: 'Select '
    },
]
const enadvType=[
    {
        value: 'none',
        label: 'Select none',
    },
    {
        value: 'Operating System',
        label: 'Operating System',
    },
    {
        value: 'Hardware',
        label: 'Hardware',
    },

]
const initialValues= {
    selectBuild: '',
    selectModule:'',
    envAdaptType:'',
    name:'',
    adoptationrequirements: '',

    
};

const validationSchema= Yup.object().shape({
    selectBuild: Yup.string()
        .required('Required'),
});

class Create extends Component{
    

    onSubmit= (values, { setSubmitting}) => {
        
        axios.post('/api/adaptivemaintenance/create',values)
            .then(res => {
                console.log(res);
                if(res.status === 200 ){
                    this.props.enqueueSnackbar(' Adaptive created', { 
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
                    <Link to='/project/changePhase' ><IconButton><Close/></IconButton></Link>
                </div>
                    <Paper className='p-5  '>
                        
                        <div className="mb-2">
                            <h3 >Adaptive Maintenance </h3>
                        </div>
                        
                        <Formik 
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={this.onSubmit}
                        >
                            {(props) => (
                                <Form>
                                     <div className='m-2'>
                                   <label>Select Build</label>
                              <SelectTextFieldFormik name='selectBuild'  items={select}/>
                                </div>
                                <div className='m-2'>
                                   <label>Select module</label>
                              <SelectTextFieldFormik name='selectModule' items={select}/>
                                </div>
                                <div className='m-2'>
                                   <label>Adatative Type</label>
                              <SelectTextFieldFormik  name='envAdaptType' items={enadvType}/>
                                </div>
                                    <div className='mt-5' >
                                        <TextFieldFormik label='Name' name='name' />
                                    </div>
                                    
                          
                                    <div className='m-2' >
                            <QuillEditorFormik
                                label="AdoptationRequirements"
                                name='adoptationrequirements'
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