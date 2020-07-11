import * as actionTypes from "./actiontypes";
import axios from 'axios';

export const currentOpenProject = (data) => {
  return {
    type: actionTypes.CURRENT_OPEN_PROJECT,
    projectInfo: data,
  };
};

export const builds = (data) => {
  return {
    type: actionTypes.FETCH_BUILDS,
    payload: data,
  };
};

export const fetchBuilds = (Pid) => {
  return (dispatch) => {
    axios
      .get("/api/getBuild/"+Pid)
      .then((res) => {
        if (res.request.status) {
          dispatch(builds(res.data));
        } 
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
