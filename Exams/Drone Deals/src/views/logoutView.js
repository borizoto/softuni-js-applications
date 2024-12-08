import { logout } from "../api/authApi.js";

export default async function logoutView(ctx) {
    try {
        await logout();
        sessionStorage.clear();
        ctx.page.redirect('/');
    } catch (error) {
        alert(error.message);
    }
}