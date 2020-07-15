import * as actionTypes from "./actions/actiontypes";
import { updatedObject } from "./utility";

const initialState = {
  sidebarShow: "responsive",
  msgDrawerState: 'false'
};

const msgDrawer = (state, action) => {
  return updatedObject(state, {
    msgDrawerState: action.msgDrawerState,
  });
};

const sidebarShow = (state, action) => {
  return updatedObject(state, {
    sidebarShow: action.sidebarShow,
  });
};

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case "set":
      return sidebarShow(state, action);
    case actionTypes.MSG_DRAWER:
      return msgDrawer(state, action);
    default:
      return state;
  }
};

export default changeState;
// { type, ...rest }