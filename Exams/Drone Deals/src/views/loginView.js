import { renderMain, html } from "../lib/lit-html.js";
import notification from "../lib/notificator.js";

import { login } from "../api/authApi.js";
import { setUserData } from "../utils/userUtils.js";

const template = (onSubmit) => html`
    <!-- Login Page (Only for Guest users) -->
    <section id="login">
        <div class="form">
          <h2>Login</h2>
          <form @submit=${onSubmit} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">
              Not registered? <a href="/register">Create an account</a>
            </p>
          </form>
        </div>
      </section>
`;

export default function loginView(ctx) {
    renderMain(template(loginHandler.bind(ctx)));
}

async function loginHandler(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
      // return alert('All fields must be filled!');
      return notification('All fields must be filled!');
    }

    try {
        const userData = await login(email, password);
        setUserData(userData);

        this.page.redirect('/');
    } catch (error) {
        alert(error.message);
    }
}