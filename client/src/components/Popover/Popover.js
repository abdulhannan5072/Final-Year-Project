import React ,{Component} from 'react';

import {OverlayTrigger, Popover} from 'react-bootstrap'
import Aux from '../../hoc/_Aux';
import DEMO from "../../store/constant";
import ProfileCard from '../Cards/ProfileCard';


class Popovers extends Component{
    render(){
        const popover = (
            <Popover id="popover-basic">
                <ProfileCard/>
            </Popover>
          );

        const tooltip=(
            <OverlayTrigger
                key={"auto"}
                
                placement='top'
                overlay={popover}
              >
                <a className='text-danger' href={DEMO.BLANK_LINK}><u>{this.data}</u></a>
                
              </OverlayTrigger>
        );

        return(
            <Aux>
                {tooltip}
            </Aux>
        );
    }
};

export default Popovers;