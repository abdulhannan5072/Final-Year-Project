import React, {} from 'react'

import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import {useLocation} from 'react-router-dom'

import nav_changePhase from './nav-items/changephase'
import TheHeaderSubMenu from './TheHeaderSubMenu';
import HeaderH from './Header'

const TheLayout = (props) => {

  const location = useLocation();
  const currentKey = location.pathname.split("/")[2] || "/";

  let Subnav = '';
  switch(currentKey){
      case 'changePhase':
        Subnav = (<TheHeaderSubMenu nav_link={nav_changePhase} />);
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
