import { renderMain, html } from "../lib/lit-html.js";
import notificator from "../lib/notificator.js";

import setUserData from "../utils/userData.js";
import { register } from "../api/authApi.js";

const template = (onSubmit) => html`
<!-- Register Page (Only for Guest users) -->
    <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="register-form">
              <input type="text" name="email" id="register-email" placeholder="email" />
              <input type="password" name="password" id="register-password" placeholder="password" />
              <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
              <button type="submit">register</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
`;

export default function registerView(ctx) {
    renderMain(template(registerHandler.bind(ctx)));
}

async function registerHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const password = formData.get('password');
    const rePass = formData.get('re-password');
    const email = formData.get('email');

    if (!email || !password || !rePass) {
        // return alert('All fields are required!')
        return notificator('All fields are required!');
    }

    if (password !== rePass) {
        // return alert('Passwords don\'t match');
        return notificator('Passwords don\'t match');
    }

    try {
        const userData = await register(email, password);
        setUserData(userData);
        this.page.redirect('/');
    } catch (error) {
        alert(error.message);
    }
}