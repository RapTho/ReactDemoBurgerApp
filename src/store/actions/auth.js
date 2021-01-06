import axios from 'axios';

import * as actionTypes from './actionTypes';

const authStarted = () => {
    return {
        type: actionTypes.AUTH_STARTED
    }
};

const authSucceeded = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCEEDED,
        token,
        userId
    };
};

const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
};

const checkTokenExpiration = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, expirationTime*1000); // setTimeout expects ms
    };
};

export const auth = (email, password, isSignedUp) => {
    return dispatch => {
        dispatch(authStarted());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1CGgILkj0hgXIcIBd9ez844STdn9KCAc';
        if (isSignedUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB1CGgILkj0hgXIcIBd9ez844STdn9KCAc'
        }

        const authData = {
            email,
            password,
            returnSecureToken: true
        };
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date (new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSucceeded(response.data.idToken, response.data.localId)) ;
                dispatch(checkTokenExpiration(response.data.expiresIn));
            })
            .catch(error => dispatch(authFailed(error.response.data.error)) );
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId')
        if (!token || !userId) {
            dispatch(authLogout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (!expirationDate || expirationDate < new Date()) {
                dispatch(authLogout());
            } else {
                dispatch(checkTokenExpiration( ((expirationDate.getTime()) - (new Date().getTime())) /1000 ));
                dispatch(authSucceeded(token, userId));
            }
        }
    }
};

