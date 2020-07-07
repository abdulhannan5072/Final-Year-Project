import * as actionTypes from "../actions/actiontypes";
import { updatedObject } from "../utility";

const initialState = {
  _id: null,
  projectName: null,
  projectKey: null,
  createdBy: null,
  createdDate: null,
};

const currentOpenProject = (state, action) => {
  return updatedObject(state, {
    ...action.projectInfo,
    projectKey: action.projectInfo.projectKey,
    
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CURRENT_OPEN_PROJECT:
      return currentOpenProject(state, action);
    default:
      return state;
  }
};

export default reducer;
