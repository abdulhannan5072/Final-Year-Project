import { combineReducers } from "redux";

import reducer from "../reducer";
import projectReducer from "./projects";
import authReducer from "./auth";


export default combineReducers({
  reducer: reducer,
  auth: authReducer,
  project: projectReducer,
});
