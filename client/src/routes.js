import React from "react";

import Auth from "./hoc/auth";


// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));

////////............................................\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// const Dashboard = React.lazy(() => import('./phases/Dashboard/Dashboard'));
const Projects = React.lazy(() => import("./phases/Projects/Projects"));
const createProject = React.lazy(() => import("./phases/Projects/Create"));
const projectSettings = React.lazy(() => import("./phases/Projects/Settings"));

const build = React.lazy(() => import("./phases/Build/Build"));
const createBuild = React.lazy(() => import("./phases/Build/create"));
const editBuild = React.lazy(() => import("./phases/Build/EditBuild"));

const module = React.lazy(() => import("./phases/Module/module"));
const editModule = React.lazy(() => import("./phases/Module/Edit"));
const createmodule = React.lazy(() => import("./phases/Module/create"));

const taskCreate = React.lazy(() => import("./phases/TaskManagement/Create"));
const task = React.lazy(() => import("./phases/TaskManagement/Task"));
const edittask = React.lazy(() => import("./phases/TaskManagement/Edit"));

// const testphase =React.lazy(()=> import('./phases/Testphase/create'));
const createDefect = React.lazy(() =>
  import("./phases/DefectManagement/Create")
);
const editDefect = React.lazy(() => import("./phases/DefectManagement/Edit"));
const Defect = React.lazy(() => import("./phases/DefectManagement/Defect"));

const createfaultRepairs = React.lazy(() =>
  import("./phases/Changephase/FaultRepairs/Create")
);
const editfaultRepairs = React.lazy(() =>
  import("./phases/Changephase/FaultRepairs/Edit")
);
const FaultRepairs = React.lazy(() =>
  import("./phases/Changephase/FaultRepairs/faultpairs")
);

const funAdditionCreate = React.lazy(() =>
  import("./phases/Changephase/FunctionallyAddition/Create")
);
const funAddition = React.lazy(() =>
  import("./phases/Changephase/FunctionallyAddition/FunctionallyAddition")
);
const editfunAddition = React.lazy(() =>
  import("./phases/Changephase/FunctionallyAddition/Edit")
);

const adaptiveCreate = React.lazy(() =>
  import("./phases/Changephase/AdaptativeMaintenance/Create")
);
const adaptiveMaintenance = React.lazy(() =>
  import("./phases/Changephase/AdaptativeMaintenance/AdaptativeMaintenance")
);
const editadaptive = React.lazy(() =>
  import("./phases/Changephase/AdaptativeMaintenance/Edit")
);

// const rooms = React.lazy(() => import('./chat/Rooms'));
const chat = React.lazy(() => import("./chat/Chat"));
const friends = React.lazy(() => import("./components/Friends/Friends"));
const profile = React.lazy(() => import("./components/Profile/Profile") )

const routes = [
  { path: "/", exact: true, name: "Home" },
  // { path: "/dashboard", name: "Dashboard", component: Dashboard },
  

  // { path: '/dashboard', exact: true, name: 'Dashboard', component:Dashboard },

  {
    path: "/projects",
    exact: true,
    name: "Projects",
    component: Auth(Projects, true),
  },
  {
    path: "/project/settings/:Pid",
    exact: true,
    name: "Settings",
    component: Auth(projectSettings, true),
  },
  {
    path: "/projects/create",
    exact: true,
    name: "Create new Project",
    component: Auth(createProject, true),
  },

  {
    path: "/:Pid/module",
    exact: true,
    name: "Module",
    component: Auth(module, true),
  },
  {
    path: "/:Pid/module/create",
    exact: true,
    name: "Create Module",
    component: Auth(createmodule, true),
  },
  {
    path: "/:Pid/module/:id",
    exact: true,
    name: "Edit Module",
    component: Auth(editModule, true),
  },

  {
    path: "/:Pid/build",
    exact: true,
    name: "Build",
    component: Auth(build, true),
  },
  {
    path: "/:Pid/build/create",
    exact: true,
    name: "Create Build",
    component: Auth(createBuild, true),
  },
  {
    path: "/:Pid/build/:id",
    exact: true,
    name: "Edit Build",
    component: Auth(editBuild, true),
  },

  // { path: '/project/changePhase', exact: true, name: 'Invite', component: changephase },

  {
    path: "/:Pid/changePhase/faultRepairs",
    exact: true,
    name: "Fault Repairs",
    component: Auth(FaultRepairs, true),
  },
  {
    path: "/:Pid/changePhase/faultRepairs/create",
    exact: true,
    name: "Create",
    component: Auth(createfaultRepairs, true),
  },
  {
    path: "/:Pid/changePhase/faultRepairs/:id",
    exact: true,
    name: "Edit",
    component: Auth(editfaultRepairs, true),
  },

  {
    path: "/:Pid/changePhase/functionatilityAddition",
    exact: true,
    name: "Functionatility Addition",
    component: Auth(funAddition, true),
  },
  {
    path: "/:Pid/changePhase/functionatilityAddition/create",
    exact: true,
    name: "Create",
    component: Auth(funAdditionCreate, true),
  },
  {
    path: "/:Pid/changePhase/functionatilityAddition/:id",
    exact: true,
    name: "Edit",
    component: Auth(editfunAddition, true),
  },

  {
    path: "/:Pid/changePhase/adaptiveMaintenance",
    exact: true,
    name: "Functionatility Addition",
    component: Auth(adaptiveMaintenance, true),
  },
  {
    path: "/:Pid/changePhase/adaptiveMaintenance/create",
    exact: true,
    name: "Create",
    component: Auth(adaptiveCreate, true),
  },
  {
    path: "/:Pid/changePhase/adaptiveMaintenance/:id",
    exact: true,
    name: "Edit",
    component: Auth(editadaptive, true),
  },

  // { path: '/profile', exact: true, name: 'Invite', component: profile },
  // { path: '/settings', exact: true, name: 'Invite', component: settings },

  {
    path: "/:Pid/task/create",
    exact: true,
    name: "Task",
    component: Auth(taskCreate, true),
  },
  {
    path: "/:Pid/task",
    exact: true,
    name: "Task",
    component: Auth(task, true),
  },
  {
    path: "/:Pid/task/:id",
    exact: true,
    name: "Edit",
    component: Auth(edittask, true),
  },

  {
    path: "/:Pid/defect/create",
    exact: true,
    name: "Create",
    component: Auth(createDefect, true),
  },
  {
    path: "/:Pid/defect",
    exact: true,
    name: "Defect",
    component: Auth(Defect, true),
  },
  {
    path: "/:Pid/defect/:id",
    exact: true,
    name: "Edit",
    component: Auth(editDefect, true),
  },

  // { path: '/chat/rooms', exact: true, name: 'Rooms', component: rooms },
  { path: "/chat", exact: true, name: "chatting", component: chat },
  {
    path: "/friends",
    exact: true,
    name: "Rooms",
    component: Auth(friends, true),
  },

  {
    path: "/profile",
    exact: true,
    name: "Profile",
    component: Auth(profile, true),
  },
];

export default routes;
