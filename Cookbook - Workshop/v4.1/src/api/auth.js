import { BASE_URL, getOptions, handleResponse, tokenUtils } from "./utils.js";

function login(email, password) {
    const data = {email, password};
    const options = getOptions('POST', data);

    return fetch(`${BASE_URL}/users/login`, options)
    .then(handleResponse)
    .then(dataObj => {
        tokenUtils.setToken('accessToken', dataObj.accessToken);
        tokenUtils.setToken('email', dataObj.email);
        tokenUtils.setToken('id', dataObj._id);
    })
}

function register(email, password, rePass) {
    const data = {email, password, rePass};
    const options = getOptions('POST', data);

    return fetch(`${BASE_URL}/users/register`, options)
    .then(handleResponse)
    .then(dataObj => {
        tokenUtils.setToken('accessToken', dataObj.accessToken);
        tokenUtils.setToken('email', dataObj.email);
        tokenUtils.setToken('id', dataObj._id);
    })
}

function logout() {
    const token = tokenUtils.getToken('accessToken')
    const options = getOptions('GET', null, token);
    
    return fetch(`${BASE_URL}/users/logout`, options)
    .then(response => {
        tokenUtils.removeToken('accessToken');
        tokenUtils.removeToken('email');
        tokenUtils.removeToken('id');
    })
}

const auth = {
    login,
    register,
    logout
};

export default auth;