import * as actionTypes from '../actions/actiontypes';
import {updatedObject} from '../utility';


const initialState = {
    token: null,
    isAuth: null,
    errMsg: null,
    loading: false,
    user: {
        userId: null,
        name: null,
        email: null,
        username: null,

    }
};

const authStart = (state, action) => {
    return updatedObject(state, {errMsg: null, loading: true});
}

const authSuccess = (state, action) => {
    return updatedObject(state, {
        loading: false,
        isAuth: action.payload.isAuth,
        token: action.payload.token,
        userId: action.payload.userId
    });
}
const getCurrentUser = (state, action) => {
    return updatedObject(state, {user: {
        userId: action.payload.userId,
        email: action.payload.email,
        username: action.payload.username,
    }});
}
const authFail = (state, action) => {
    return updatedObject(state, {
        errMsg: action.errMsg,
        isAuth: false,
        loading: false,
    });
}

export const authLogout = (state, action) => {
    return updatedObject(state, {
        userId: null,
        token: null, 
        isAuth: false,
        user: {
            userId: null,
            name: null,
            email: null,
            username: null,
    
        }
    });
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.GET_CURRENT_USER:
            return getCurrentUser(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            return state;
    };
}

export default reducer;