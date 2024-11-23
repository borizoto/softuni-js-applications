export default function logoutUser() {
    const logoutUrl = ` http://localhost:3030/users/logout`;
    const token = sessionStorage.getItem("accessToken");

    fetch(logoutUrl, {
        headers: { "X-Authorization": token }
    }).then(response => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("id");
    })
    
    window.location.href = 'index.html';
}