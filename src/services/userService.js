import config from 'config';

export const userService = {
    login,
    logout
};

function login(username, password) {

    return fetch('/api/authenticate?', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "username": username, "password": password })
    }).then(function (handleResponse) {
        return handleResponse.json()
    }).then(function (user) {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            else {
                if (user.status == "Inactive") {
                    alert("User is inactive");
                }
                else {
                    alert("Invalid Username or Password");
                }
            }
            console.log(user);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}