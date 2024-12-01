import auth from '../api/auth.js';
import loadCatalogPage from "./details.js";

export default function logoutUser() {
    auth.logout()
        .catch(err => alert(err.message));

    loadCatalogPage();
    document.querySelector("nav #user").style.display = "none";
    document.querySelector("nav #guest").style.display = "inline";
}