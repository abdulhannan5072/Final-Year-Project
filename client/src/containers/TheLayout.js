import React from "react";

import { TheContent, TheSidebar, TheHeader } from "./index";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import nav_changePhase from "./nav-items/changephase";
import nav_task from "./nav-items/task";
import TheHeaderSubMenu from "./TheHeaderSubMenu";
import path from "../hoc/project/path";

import Chat from "../components/RightDrawer/RTL_Drawer";

const TheLayout = (props) => {
  const location = useLocation();
  const currentKey = location.pathname.split("/")[2] || "/";
  const projectId = useSelector((state) => state.project._id);

  let Subnav = "";
  switch (currentKey) {
    case "changePhase":
      Subnav = <TheHeaderSubMenu nav_link={path(nav_changePhase, projectId)} />;
      break;
    case "task":
      Subnav = <TheHeaderSubMenu nav_link={path(nav_task, projectId)} />;
      break;
    default:
      Subnav = "";
  }
  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <TheHeader />
        {Subnav}
        <div className="c-body site-drawer-render-in-current-wrapper">
          <Chat />
          <TheContent />
        </div>
      </div>
    </div>
  );
};

export default TheLayout;
