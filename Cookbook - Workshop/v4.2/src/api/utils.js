const BASE_URL = 'http://localhost:3030';

function getOptions(method = 'GET', data = null, token = null) {
    const options = {
        method,
        headers: {}
    };

    if (token) {
        options.headers['X-Authorization'] = token;
    }

    if (data) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    return options;
}

function handleResponse(response) {
    if (!response.ok) {
        return response.json()
            .then(err => {
                throw new Error(err.message || 'Something went wrong!')
            });
    }
    return response.json();
}

const tokenUtils = {
    getToken(tokenToGet) {
        return sessionStorage.getItem(tokenToGet);
    },

    setToken(tokenToSetStr, token) {
        sessionStorage.setItem(tokenToSetStr, token);
    },

    removeToken(tokenToRemoveStr) {
        sessionStorage.removeItem(tokenToRemoveStr);
    }
}

export { BASE_URL, getOptions, handleResponse, tokenUtils };