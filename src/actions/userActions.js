import { userConstants } from '../constants';
import { userService } from '../services/userService';
import { history } from '../helpers/history';


export const userActions = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    if (user.role == 'admin') {
                        history.push('/admin');
                    }
                    else if(user.role=="user"){
                        history.push('/home');
                    }
                    else if(user.role == "analyst"){
                        history.push('/analyst');
                    }
                    else{
                        history.push('/rmpage');
                    }
                    window.location.href = window.location.href;
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}