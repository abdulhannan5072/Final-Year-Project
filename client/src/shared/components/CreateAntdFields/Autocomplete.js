import React, { useState } from "react";
import { AutoComplete } from "antd";

const { Option } = AutoComplete;

const Complete = (props) => {

const {onSelect, onSearch, onChange, data} = props;
  return (
    <>
      <AutoComplete
        {...props}        
        style={{
          width: 300,
        }}
        onSelect={onSelect}
        onSearch={onSearch}
        onChange={onChange}
      >
        {
         data? 
         data.map((val) => (
            <Option key={val.friendUsername} value={val.friendUsername}>
              {val.friendUsername}
            </Option>
          )) 
          : null
          
        }
      </AutoComplete>
    </>
  );
};
export default Complete;
