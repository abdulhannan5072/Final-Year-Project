import * as actionTypes from "../actions/actiontypes";
import { updatedObject } from "../utility";

const initialState = {
  _id: null,
  projectName: null,
  projectKey: null,
  createdBy: null,
  createdDate: null,
  builds: {
    build: ''
  }
};

const currentOpenProject = (state, action) => {
  return updatedObject(state, {
    ...action.projectInfo,
    _id: action.projectInfo._id,
  });
};

const fetchBuilds = (state, action) => {
  return updatedObject(state, {
    builds: action.payload
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CURRENT_OPEN_PROJECT:
      return currentOpenProject(state, action);
    case actionTypes.FETCH_BUILDS:
      return fetchBuilds(state, action);
    default:
      return state;
  }
};

export default reducer;
