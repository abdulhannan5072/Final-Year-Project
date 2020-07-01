import React from 'react';
import {Formik,useField,Form} from 'formik';
import * as Yup from 'yup';
import { Checkbox } from '@material-ui/core';
import { Children } from 'react';
const CustumInputText=({label,...props})=>
{
    const [field,meta]=useField(props);
    return(
        <>
        <label htmlFor={props.id||props.name}>{label}</label>
        <input className="text-input"{...field} {...props}/>
        {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
        ):null}
        </>
    )
}
//checkbox
/*
const CustumCheckbox=({children,...props})=>
{
    const [field,meta]=useField(props,Checkbox);
    return(
        <>
        <label className="checkbox">
        <input type="checkbox"{...field} {...props}/>
         {children}
        </label>
        {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
        ):null}
        </>
    )
}
*/
const CustumSelect=({label,...props})=>
{
    const [field,meta]=useField(props);
    return(
        <>
        <label htmlFor={props.id||props.name}>{label}</label>
        <select {...field} {...props}/>
        {meta.touched && meta.error ? (
            <div className="error">{meta.error}</div>
        ):null}
        </>
    )
}
function Test()
{
return(
    <Formik
    initialValues={{
        testname:'',
        testcase:'',
        descriptoon:'',
        startdate:'',
        enddate:''
    }}
    validationSchema={Yup.object({
        testname:Yup.string()
        .min(3,'Enter name more then 3 characters')
        .required('Required'),
        testcase:Yup.string()
        .required('Required'),
        descriptoon:Yup.string()
        .required('Required'),
        startdate:Yup.string()
        .required('Required'),
        enddate:Yup.string()
        .required('Required'),
    })}

    >
        {props=>(
            <Form>
                <h1>Test phase</h1>
                <CustumInputText label="Testname" name="testname" type="text"/>
                <CustumInputText label="TestCase" name="testcase" type="text"/>
                <CustumInputText label="Description" name="description" type="text"/>
                <CustumInputText label="Startdate" name="startdate" type="text"/>
                <CustumInputText label="Enddate" name="enddate" type="text"/>
            </Form>
        )}
    </Formik>
)

}


export default Test;