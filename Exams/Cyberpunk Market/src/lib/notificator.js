import { baseRender, html } from "./lit-html.js";

const errorBoxRef = document.getElementById('errorBox')

const template = (errMsg) => html`
       <span class="msg">${errMsg}</span>
`;

export default function notificator(errMsg) {
    console.log(document.getElementById('errorBox'))
    errorBoxRef.style.display = 'block';

    setTimeout(() => {
        errorBoxRef.style.display = 'none';
    }, 3000);

    baseRender(template(errMsg), document.getElementById('errorBox'))
}