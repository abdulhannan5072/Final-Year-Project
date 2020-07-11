import React, {} from 'react'

import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {useLocation} from 'react-router-dom'
import { useSelector } from "react-redux";
import nav_changePhase from './nav-items/changephase'
import TheHeaderSubMenu from './TheHeaderSubMenu';
// import HeaderH from './Header'
import path from "../hoc/project/path";

const TheLayout = (props) => {

  const location = useLocation();
  const currentKey = location.pathname.split("/")[2] || "/";
  const projectId = useSelector((state) => state.project._id);

  let Subnav = '';
  switch(currentKey){
      case 'changePhase':
        Subnav = (<TheHeaderSubMenu nav_link={path(nav_changePhase, projectId)} />);
          break;
      default:
        Subnav = '';
  }
  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        {/* <HeaderH/> */}
        <TheHeader/>
        {Subnav}

        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
