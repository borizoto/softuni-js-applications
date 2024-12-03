import { BASE_URL, getOptions, handleResponse, tokenUtils } from "./utils.js";

const _ = undefined;

function loadAll() {
    const options = getOptions();
    return fetch(`${BASE_URL}/data/recipes`, options)
        .then(handleResponse)
}

function create(img, ingredients, name, steps) {
    const data = {img, ingredients, name, steps};
    const token = tokenUtils.getToken('accessToken');
    const options = getOptions('POST', data, token)
    
    return fetch(`${BASE_URL}/data/recipes`, options)
    .then(handleResponse);
}

function edit(img, ingredients, name, steps, id) {
    const data = { img, ingredients, name, steps };
    const token = tokenUtils.getToken('accessToken');
    const options = getOptions('PUT', data, token);

    return fetch(`${BASE_URL}/data/recipes/${id}`, options)
    .then(handleResponse);
}

function loadCard(id) {
    const options = getOptions();
    return fetch(`${BASE_URL}/data/recipes/${id}`, options)
    .then(handleResponse)
}

function loadRecent() {
    const query = encodeURIComponent('_createdOn desc');

    return fetch(`${BASE_URL}/data/recipes?sortBy=${query}&pageSize=5`)
    .then(handleResponse)
    .then(dataObj => Object.values(dataObj));
}

const recipes = {
    loadAll,
    loadRecent,
    loadCard,
    create,
    edit
}

export default recipes;