import React from 'react';

import TextField from './TextField';
import TagDropDown from './Tag';

class InputField extends React.Component{

    

    render(){
        let inputElement = null;
        
        switch (this.props.type){

            case ('textfield'):
                inputElement =  <TextField {...this.props}/>;
                break;
            case ('dropdown'):
                inputElement = <TagDropDown  {...this.props} />
                break;
            default: 
                inputElement = <TextField {...this.props}/>;
        }

        return(
            <div>
                {inputElement}
            </div>
        );
    }

}
export default InputField;