import { baseRender, html } from "../lib/lit-html.js";

import { getUserData } from "../utils/userUtils.js";

const template = (isLogged) => html`
<!-- Navigation -->
<a id="logo" href="/"><img id="logo" src="./images/logo2.png" alt="img" /></a>
      <nav>
        <div>
          <a href="/dashboard">Marketplace</a>
        </div>
        ${isLogged
          ? html`
          <!-- Logged-in users -->
        <div class="user">
          <a href="/sell">Sell</a>
          <a href="/logout">Logout</a>
        </div>
          `
          : html`
          <!-- Guest users -->
        <div class="guest">
          <a href="/login">Login</a>
          <a href="/register">Register</a>
        </div>
          `
        }
      </nav>
`;

const headerRef = document.querySelector('header');

export default function navigationMiddleware(ctx, next) {
  const { accessToken } = getUserData();

  const isLogged = !!accessToken;

  baseRender(template(isLogged), headerRef);
  next();
}