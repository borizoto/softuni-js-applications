export default function setUserData(userData) {
    sessionStorage.setItem('email', userData.email);
    sessionStorage.setItem('accessToken', userData.accessToken);
    sessionStorage.setItem('userId', userData._id);
}

export function getUserData() {
    const userData = {
        userId: sessionStorage.getItem('userId'),
        email: sessionStorage.getItem('email'),
        accessToken: sessionStorage.getItem('accessToken')
    }

    return userData;
}