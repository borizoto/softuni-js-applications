import { getUserData } from "../utils/userUtils.js";


export default async function request(method = 'GET', url, data = null) {
    const { accessToken } = getUserData();

    const options = {
        method,
        headers: {}
    };

    if (accessToken) {
        options.headers['X-Authorization'] = accessToken
    }

    if (data) {
        options.headers['Content-type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (response.status === 204) {
        return;
    }

    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message);
    }

    const receivedData = await response.json();

    return receivedData;
}