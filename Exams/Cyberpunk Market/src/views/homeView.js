import { renderMain, html } from "../lib/lit-html.js";

const template = () => html`
 <!-- Home page -->
        <section id="hero">
          <img src="./images/home.png" alt="home" />
          <p>We know who you are, we will contact you</p>
        </section>
`;

export default function homeView(ctx) {
    renderMain(template());
}