export default function navigationHandle() {

    const token = sessionStorage.getItem("accessToken");
    // const ownerId = sessionStorage.getItem("_id");
    const email = sessionStorage.getItem("email");

    if (email && token) {
        document.querySelector("nav #user").style.display = "inline";
    } else {
        document.querySelector("nav #guest").style.display = "inline";
    }
}