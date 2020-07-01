import React from 'react';
import {useField} from 'formik';
import {Input, Select, TextField, SelectTextField, QuillEditor}  from '../';
import FormHelperText from '@material-ui/core/FormHelperText';

export const InputFormik = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <Input {...field} {...props} label={label}
        />
        {meta.touched && meta.error ? (
        <FormHelperText className='error'>{meta.error}</FormHelperText>
      ) : null}
      </>
    );
  };

  export const SelectFormik = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <Select {...field} {...props} label={label}  
        />
        {meta.touched && meta.error ? (
        <FormHelperText className='error'>{meta.error}</FormHelperText>
      ) : null}
      </>
    );
  };

  export const TextFieldFormik = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <TextField {...field} {...props} label={label}
          error={meta.touched && meta.error? true : null}
          helperText={meta.touched && meta.error ? meta.error : null}
        />
      </>
    );
  };
  export const SelectTextFieldFormik = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
      <>
        <SelectTextField {...field} {...props} label={label}
          error={meta.touched && meta.error? true : null}
          helperText={meta.touched && meta.error ? meta.error : null}
        />
        
      </>
    );
  };

  export const QuillEditorFormik = ({ label, ...props }) => {
    const [field] = useField(props);
    return (
      <>
        <QuillEditor {...props} label={label}
          value={field.value}
          onChange={field.onChange(field.name)}
          // error={meta.touched && meta.error? 'true':'false'}
          // helperText={meta.touched && meta.error ? meta.error : null}
        />
        
      </>
    );
  };