import React,{Component} from 'react';
import Aux from '../../hoc/_Aux';
import {Link} from 'react-router-dom';
import {Row, Col, Button 
} from 'react-bootstrap';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DEMO from "../../store/constant";
import {IconButton} from '@material-ui/core';
import Table from '../Tables/Table';


class Users extends Component{

render(){

    const data = [ 
        {id:4, name:'Abdul Hannan', activity:'March 05, 2020', status:'admin', action:'Show details'}, 
        {id:5, name:'Abdul Hannan', activity:'March 05, 2020', status:'admin', action:'Show details'},
    ];

    const columns = [
        {
          name: 'Users',
          selector: 'name',
          grow: 2,
          style: {
            color: '#202124',
            fontSize: '14px',
            fontWeight: 500,
          },
          cell: row => <a className='text-primary' href={DEMO.BLANK_LINK}>{row.name}</a> 
        },
        {
          name: 'Last activity',
          selector: 'activity',
        },
        {
          name: 'Status',
          selector: 'status',
        },
        {
            name: 'Actions',
            cell: row => <a className='text-primary' href={DEMO.BLANK_LINK}>{row.action}</a>,
          },
        {
            button: true,
            cell: row => <More row={row}/>
        }
      ];
    
      const More = ({row}) => (
          
            <IconButton aria-label='morehoriz' >
                <MoreHorizIcon/>
            </IconButton>
          
      );


    return(
        <Aux>
            <Row className='page'>
                        <Col>
                            <div className="row d-flex align-items-center mb-3">
                                <div className="col-9">
                                <h3>Users</h3>
                                </div>
                                <div className="col-3 text-right">
                                    <Button  variant="dark" size="sm" className="float-right">
                                    <Link to='/users/invite' className='text-light'>Invite Users</Link>
                                    </Button>
                                </div>
                            </div> 
                            <Table columns={columns} dataItems={data}  />


                        </Col>
                    </Row>
        </Aux>
    );
}

}

export default Users;