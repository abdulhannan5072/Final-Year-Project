import React, {Component} from 'react';
import Aux from '../../hoc/_Aux';
import { Formik, Form, SelectTextFieldFormik,TextFieldFormik,QuillEditorFormik
} from '../../shared/components';
import { withSnackbar } from 'notistack';
import axios from 'axios';
import {Row, Col 
} from 'react-bootstrap';

import * as  Yup from 'yup';

import {Button } from 'react-bootstrap';
import { Paper} from '@material-ui/core';
const types =[
    {
        value: 'select',
        label: 'Select'
    },
    {
        value: 'functional',
        label: 'Functional'
    },
    {
        value: 'ui/ux',
        label: 'UI/Ux'
    },
    {
        value: 'content',
        label: 'Content'
    },
    {
        value: 'field validation',
        label: 'Field Validation'
    },
    {
        value: 'security',
        label: 'Security'
    },
    {
        value: 'performance',
        label: 'Performance'
    },
]
const select=[

    {
        value: 'select ',
        label: 'Select '
    },
]
const priority=[
    {
        value: 'low ',
        label: 'Low'
    },
    {
        value: 'medium',
        label: 'Medium '
    },
    {
        value: 'high ',
        label: 'High '
    },
]

const severity=[
    {
        value: 'select ',
        label: 'Select '
    },
    {
        value: 'blocker ',
        label: 'Blocker '
    },
    {
        value: 'minor',
        label: 'Minor'
    },
    {
        value: 'major',
        label: 'Major'
    },
]
const initialValues=
{
 defect:'',   
 selectBuild:'',
 selectModule:'',
 defectType:'',
 severity:'',
 description:'',
 comments:'',
 assignTo:'',
 priority:'',
 defectViewers:'',

};
const validationSchema=Yup.object().shape({
defect: Yup.string()
.min(3,'Too Short')
.required('this field is required')
});

class Create extends Component{

      
      onSubmit= (values, { setSubmitting}) => {
        
        axios.post('/api/defect/create',values)
            .then(res => {
                console.log(res);
                if(res.status === 200 ){
                    this.props.enqueueSnackbar('Defect Phase created', { 
                        variant: 'success',
                    });

                }
                
            });
        
    }


render()
{
    const defectDetails=(
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={this.onSubmit}
    >
          {(props)=>(
              <Form>
        <Paper className='p-3'> 
        
      
        <Row>
        <Col md={4}>
     
         <div className='mt-5' >                                    
  <TextFieldFormik label='Defect'  name='defect'/>
                       </div>
    </Col>
        <Col md={4} >
         
             <div className='w-50'>
                 <label>Build</label>
                 <SelectTextFieldFormik name='selectBuild' items={select}/>
             </div>
         
     </Col>
     <Col md={4} >
        
             <div className='m-2'>
             <label>Module</label>
                 <SelectTextFieldFormik name='selectModule' items={select}/>
             </div>
        
     </Col>
   

    </Row>
    <Row>
 
 <Col md={4} >
 
      <div className='m-2'>
      <label>Defect Type</label>
          <SelectTextFieldFormik name='defectType' items={types}/>
      </div>
 
</Col>
<Col md={4} >
 
                    <div className='m-2'>
                    <label>Severity</label>
                        <SelectTextFieldFormik name='severity' items={severity}/>
                    </div>
                
</Col>


</Row>
<Row>
    <Col>
                        <div className='m-2' >
                            <QuillEditorFormik
                                label="Description"
                                name='description'
                            />
                        </div>
    </Col>
</Row>
<Row>
    <Col >
                        <div className='m-2' >
                            <QuillEditorFormik
                                label="Comments"
                                 name='comments'
                            />
                        </div>
    </Col>
</Row>
<Row>
    <Col md={4}>
     
        <div className='mt-5' >
        <TextFieldFormik label='Assign To' name='assignTo' />
        </div>
    </Col>
              <Col md={4}>
                <div className='m-2'>
                 <label>Priority</label>
                 <SelectTextFieldFormik name='priority'items={priority}/>
              </div>
    </Col>
    <Col md={4}>
     
           <div className='mt-5' >
        <TextFieldFormik label='Defect Viewers' name='defectViewers' />
        </div>               
        
    </Col>
</Row>
    <Row>
    <Col md={8}>
        <div  className='d-flex justify-content-end pt-2'  >
          <Button className='mt-5 ' variant="dark" type="submit">Update</Button>
          <Button className='mt-5 ' variant="dark" type="submit">Cancel</Button>

             </div>
             </Col>
             </Row>
             
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
                        <h3>Defect</h3>
                    </div>
                </div>   
            </Col>
        </Row>
        <div>
                {defectDetails}
            </div>
             
     </Aux>
    );
}
}
export default withSnackbar(Create);