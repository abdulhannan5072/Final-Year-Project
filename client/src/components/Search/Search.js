import React from "react";
import {FormControl,
        InputGroup,
        DropdownButton,
        Dropdown,
        Form
        } from 'react-bootstrap';

import IconButton from '@material-ui/core/IconButton';        
import SearchIcon from '@material-ui/icons/Search';



const Search = () => {

 
  
  return (
    <div className="row d-flex align-items-center mb-3 ">
        
        <div className="col-3 text-right ">
        <InputGroup className="mb-3 text-right">
            <FormControl  type="text" placeholder="Search"  />
            
            {/* <InputGroup.Prepend>
            <IconButton aria-label='searchicon'><SearchIcon/></IconButton>
            
            </InputGroup.Prepend> */}
        </InputGroup>
        </div>
        
        <div className="col-3 text-right">
        <InputGroup className="mb-3">
        <DropdownButton variant='outline-dark' id="dropdown-basic-button" className='text-right' title="All types">
            <Dropdown.Item href="#/action-1"><Form.Check type="checkbox" label="Android" /></Dropdown.Item>
            <Dropdown.Item href="#/action-2"><Form.Check type="checkbox" label="IOS" /></Dropdown.Item>
            <Dropdown.Item href="#/action-3"><Form.Check type="checkbox" label="WEB Application" /></Dropdown.Item>
        </DropdownButton>
        </InputGroup>
        </div>

    </div> 
  );
}

export default Search;