import * as actionTypes from './actiontypes';
// import axios from 'axios';

export const currentOpenProject = (data) => {
    return {
        type: actionTypes.CURRENT_OPEN_PROJECT,
        projectInfo: data
    };
}