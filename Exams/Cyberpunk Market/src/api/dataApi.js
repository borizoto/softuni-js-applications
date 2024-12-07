import request from "../lib/requester.js";

const BASE_URL = 'http://localhost:3030/data';

export const getAll = async () => request('GET', `${BASE_URL}/cyberpunk?sortBy=_createdOn%20desc`);

export const getOne = async (id) => request('GET', `${BASE_URL}/cyberpunk/${id}`);

export const create = async (data) => request('POST', `${BASE_URL}/cyberpunk`, data);

export const deleteItem = async (id) => request('DELETE', `${BASE_URL}/cyberpunk/${id}`);

export const editItem = async (id, data) => request('PUT', `${BASE_URL}/cyberpunk/${id}`, data);