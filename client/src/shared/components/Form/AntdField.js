import React from 'react';
import {useField} from 'formik';
import {Input, Form} from 'antd';

export const InputAntd = ({ label, name, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <Form.Item 
            label={label}
            {...field}
            // help={meta.touched && meta.error? meta.error : ''}
            validateStatus={meta.touched && meta.error? true : null}
        >
            <Input {...props} {...field} />
        </Form.Item>
        
      </>
    );
  };