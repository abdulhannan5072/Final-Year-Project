import * as actionTypes from './actiontypes';
import axios from 'axios';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: data
    };
};
export const getCurrentUser = (data) => {
    return {
        type: actionTypes.GET_CURRENT_USER,
        payload: data
    };
};
export const authFail = (message, error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        // error: error,
        errMsg: message
    };
};

export const authLogout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const data = {
            email: email,
            password: password
        }
        setTimeout(
            () => {
                axios.post('/api/login',data)
            .then(res => {
                console.log(res);
                if(res.data.isAuth){
                    dispatch(authSuccess(res.data.userData._id, res.data.userData.token, res.data.userData.username));
                }else{
                    dispatch(authFail(res.data.message));
                }
                
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(null, err));
                
            })
            }
            ,2000);
        
    };
};

export const authCheckState = () => {
    return dispatch => {
        axios.get('/api/auth')
            .then(res => {
                if(res.data.isAuth){
                    dispatch(authSuccess(res.data));
                    dispatch(getCurrentUser(res.data));
                } else{
                    dispatch(authFail());
                }
                
            })
            .catch(err => {
                console.log(err);
            })
    }
};



export const logout = () => {
    return dispatch => {
        axios.get('/api/logout')
            .then(res => {
                console.log(res);
                if(!res.data.isAuth){
                    dispatch(authLogout());
                }
                
            })
            .catch(err => {
                console.log(err);
            })
    }
};