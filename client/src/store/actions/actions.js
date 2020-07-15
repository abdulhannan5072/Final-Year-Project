import * as actionTypes from "./actiontypes";


export const msgDrawer = (data) => {
  return {
    type: actionTypes.MSG_DRAWER,
    msgDrawerState: data,
  };
};

export const sidebarShow = (data) => {
  return {
    type: actionTypes.SIDEBAR_SHOW,
    sidebarShow: data,
  };
};