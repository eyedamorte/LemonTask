import axios from 'axios';
import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (isLogin, username) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        isLogin: isLogin,
        username: username
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}
const dataforauth = {'username': 'Admin',
                     'password': '12345'};
export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        console.log(username, password);
        const authdata = {'username': username,
                          'password': password};
        if((authdata['username'] === dataforauth['username'])&&(authdata['password'] === dataforauth['password'])){
          console.log('access');
          const isLogin = true;
          const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
          localStorage.setItem('isLogin', isLogin);
          localStorage.setItem('username', username);
          localStorage.setItem('expirationDate', expirationDate);
          console.log(dataforauth);
          dispatch(authSuccess(isLogin, username));
          dispatch(checkAuthTimeout(3600));
        }else{
          dispatch(authFail('Неправильный пароль'));
        }

    }
}


export const authCheckState = () => {
    return dispatch => {
        const isLogin = localStorage.getItem('isLogin');
        const username = localStorage.getItem('username');
        if (isLogin === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(isLogin, username));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}
