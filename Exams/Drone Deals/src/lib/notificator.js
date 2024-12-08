import { html, baseRender } from "../lib/lit-html.js";

const template = (errMsg) => html`
          <span class="msg">${errMsg}</span>
`;

export default function notification(err) {
    const errorBoxRef = document.getElementById('errorBox');
    errorBoxRef.style.display = "block";

    setTimeout(() => {
        errorBoxRef.style.display = "none";
    }, 3000);

    baseRender(template(err), errorBoxRef);
}