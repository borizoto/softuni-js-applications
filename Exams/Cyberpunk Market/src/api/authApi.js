import request from "../lib/requester.js";

const BASE_URL = 'http://localhost:3030/users';

export const register = async (email, password) => request('POST', `${BASE_URL}/register`, {email, password});

export const login = async (email, password) => request('POST', `${BASE_URL}/login`, {email, password});

export const logout = async () => request('GET', `${BASE_URL}/logout`);