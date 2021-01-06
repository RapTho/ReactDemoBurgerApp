import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: "/"
}

const authStarted = (state) => {
    return updateObject(state, { loading: true });
};

const authSucceeded = (state, action) => {
    return updateObject(state, { 
        token: action.token,
        userId: action.userId,
        error: null,
        loading: false
    });
};

const authFailed = (state, action) => {
    return updateObject(state, { 
        error: action.error,
        loading: false
    });
};

const authLogout = (state) => {
    return updateObject(state, { 
        token: null,
        userId: null,
        error: null,
        loading: false
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_STARTED: return authStarted(state);
        case actionTypes.AUTH_SUCCEEDED: return authSucceeded(state, action);
        case actionTypes.AUTH_FAILED: return authFailed(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state; 
    };
};

export default authReducer;