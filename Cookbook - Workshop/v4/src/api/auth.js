const url = 'http://localhost:3030';

function getOptions() {
    return {
        headers: {}
    }
}

function login(email, password) {
    const options = getOptions();

    options.method = 'POST';
    options.headers['Content-type'] = 'application/json';
    options.body = JSON.stringify({ email, password });

    return fetch(`${url}/users/login`, options)
        .then(response => {
            if (response.status !== 200) {
                return response.json()
                    .then(err => {
                        throw new Error(err.message);
                    })
            }
            return response.json();
        })
        .then(dataObj => {
            sessionStorage.setItem("email", dataObj.email);
            sessionStorage.setItem("accessToken", dataObj.accessToken);
            sessionStorage.setItem("id", dataObj._id);
        })
}

function register(email, password, rePass) {
    const options = getOptions();

    options.method = 'POST';
    options.headers['Content-type'] = 'application/json';
    options.body = JSON.stringify({ email, password, rePass });

    return fetch(`${url}/users/register`, options)
        .then(response => {
            if (response.status !== 200) {
                return response.json()
                    .then(err => {
                        throw new Error(err.message);
                    })
            }
            return response.json();
        })
        .then(dataObj => {
            sessionStorage.setItem("email", dataObj.email);
            sessionStorage.setItem("accessToken", dataObj.accessToken);
            sessionStorage.setItem("id", dataObj._id);
        })
}

function logout() {
    const options = getOptions();

    const token = sessionStorage.getItem("accessToken");

    options.method = 'GET';
    options.headers['X-Authorization'] = token;

    return fetch(`${url}/users/logout`, options)
        .then(response => {
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("email");
            sessionStorage.removeItem("id");
        })
}

const auth = {
    login,
    register,
    logout
};

export default auth;