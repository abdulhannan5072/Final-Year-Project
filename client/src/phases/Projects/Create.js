import React,{ Component } from "react";
import Aux from "../../hoc/_Aux";
import {Form, Button} from 'react-bootstrap';
import InputField from '../../components/Forms/InputField';
import Close from '@material-ui/icons/Close';

import {IconButton, Paper} from '@material-ui/core';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './style.css';
// import AutoComplete from '../Forms/AutoComplete';




class Create extends Component{

    state = {
        createProjectForm: {
            projectName: {
                
                elementType: 'textfield',
                elementConfig: {
                    required: true,
                    error: false,
                    label: 'Name',
                    placeholder: 'Enter project name'
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
                validationMessage: ''
            },
            key: {
                
                elementType: 'textfield',
                elementConfig: {
                    label: 'Key',
                    placeholder: 'Enter key'
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
                validationMessage: ''
            },
            projectType: {
                
                elementType: 'dropdown',
                elementConfig: {
                    error: false,
                    label: 'Project Type',
                    data:[
                        {
                          value: 'android',
                          label: 'Android Application',
                        },
                        {
                          value: 'web',
                          label: 'Web Application',
                        },
                        {
                          value: 'ios',
                          label: 'IOS Application',
                        },
                        {
                          value: 'desktop',
                          label: 'Desktop Application',
                        },
                      ]
                },
                value: '',
                validation: {
                    required: true,
                },
                touched: false,
                valid: false,
                validationMessage: ''
            },
        },

        formIsValid: false,

    };
    postDataHandler = ()=>{
        if(this.state.formIsValid){
            const data = {
                projectName: this.state.createProjectForm.projectName.value,
                key:this.state.createProjectForm.key.value,
                projectType:this.state.createProjectForm.projectType.value,
               
            }
    
            axios.post('/api/projects/create',data)
                .then(res => {
                    console.log(res);
                });
        } else console.log("Fill fields");
        
    }


    isCheckValidity = (value, rules) => {
        let isValid = true;
        let error = [true,''];

        if (rules.required){
            isValid = value.trim() !== '' && isValid;
            const message = `${!isValid ? 'This field is required!':''}`
            error = !isValid ? [isValid,message]:error;
        }
        
        return error;
    }

    inputChangeHandler = (event, elementIdentifier) => {
        // console.log(event.target.value);
        const updateForm = {...this.state.createProjectForm};
        const updatedElement = {...updateForm[elementIdentifier]};
        const updatedElementConfig = {...updatedElement['elementConfig']}
        updatedElement.value= event.target.value;
        const error = this.isCheckValidity(updatedElement.value, updatedElement.validation);
        updatedElement.valid = error[0];
        updatedElement.validationMessage = error[1];
        updatedElement.touched= true;
        if (updatedElement.touched && !updatedElement.valid){
            updatedElementConfig.error= true;
        } else {
            updatedElementConfig.error = false;
        }
        updatedElement['elementConfig'] = updatedElementConfig;
        updateForm[elementIdentifier] = updatedElement;
        this.setState({createProjectForm: updateForm});

        let formIsValid = true;
        for(let e in updateForm ){
            formIsValid = updateForm[e].valid && formIsValid;
        }
        this.setState({formIsValid: formIsValid});
    }

    render(){

        const showValidation = (elementIdentifier) =>{
            let errorMessage = null;
            const updateForm = {...this.state.createProjectForm};
            const updatedElement = {...updateForm[elementIdentifier]};
            
            console.log(updatedElement.value);
            if (updatedElement.validation && !updatedElement.valid){
                errorMessage = updatedElement.validationMessage;
            }

            return errorMessage;
        }

        const formElementsArray = [];
        for (let key in this.state.createProjectForm){
            formElementsArray.push({
                id: key,
                config: this.state.createProjectForm[key]
            });
        }

        
        
          
        

        return(
            <Aux>
                <div className='page'>
                <div className='d-flex flex-row-reverse mb-3 '>
                    <Link to='/projects' ><IconButton><Close/></IconButton></Link>
                </div>
                
                
                <Paper className='p-5  '>
                    <div className="mb-2">
                        <h3 >Create Project</h3>
                    </div>
                    
                    <Form onSubmit={this.postDataHandler} >
                        {formElementsArray.map(formElement => (
                            <InputField className='mt-4' 
                                key={formElement.id} 
                                type={formElement.config.elementType} 
                                {...formElement.config.elementConfig} 
                                value={formElement.config.value}
                                helperText={showValidation(formElement.id)}
                                onChange={(event) => this.inputChangeHandler(event, formElement.id)}
                                />
                        ))}

                        
                        <div className='w-25'>
                        <Button disabled={!this.state.formIsValid} className='mt-5 ml-3' variant="dark" type="submit">
                            Create 
                        </Button>
                        </div>
                    </Form>
                </Paper>
                </div>
            </Aux>
        );
    }
}

export default Create;