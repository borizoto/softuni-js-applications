import { renderMain, html } from "../lib/lit-html.js";
import notification from "../lib/notificator.js";

import { register } from "../api/authApi.js";
import { setUserData } from "../utils/userUtils.js";

const template = (OnSubmit) => html`
<!-- Register Page (Only for Guest users) -->
<section id="register">
        <div class="form">
          <h2>Register</h2>
          <form @submit=${OnSubmit} class="register-form">
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

    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('re-password');

    if (!email || !password) {
        // return alert('All fields must be filled!');
        return notification('All fields must be filled!');
    }

    if (password !== rePass) {
        // return alert('Passwords don\'t match');
        return notification('Passwords don\'t match');
    }

    try {
        const userData = await register(email, password);
        setUserData(userData);

        this.page.redirect('/');
    } catch (error) {
        alert(error.message);
    }
}