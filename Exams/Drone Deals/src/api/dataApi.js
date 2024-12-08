import request from "../lib/requester.js";

const BASE_URL = 'http://localhost:3030/data';

export const getAllStock = () => request('GET', `${BASE_URL}/drones?sortBy=_createdOn%20desc`);

export const getOne = (id) => request('GET', `${BASE_URL}/drones/${id}`);

export const create = (data) => request('POST', `${BASE_URL}/drones`, data);

export const deleteDrone = (id) => request('DELETE', `${BASE_URL}/drones/${id}`);

export const edit = (data, id) => request('PUT', `${BASE_URL}/drones/${id}`, data);