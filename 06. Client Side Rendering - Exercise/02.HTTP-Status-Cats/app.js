import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const section = document.getElementById('allCats');

function createUl() {
    return html`
    <ul>${cats.map(cat => template(cat))}</ul>
    `
}

function template(obj) {
    return html`
        <li>
            <img src="./images/${obj.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
            <div class="info">
                <button @click=${buttonHandle} class="showBtn">Show status code</button>
                <div class="status" style="display: none" id="${obj.id}">
                    <h4>Status Code: ${obj.statusCode}</h4>
                    <p>${obj.statusMessage}</p>
                </div>
            </div>
        </li>
    `
}

function buttonHandle(e) {
    const catInfoDiv = e.target.parentElement.children[1];
    e.target.textContent = e.target.textContent === 'Show status code' ? 'Hide status code' : 'Show status code';
    catInfoDiv.style.display = catInfoDiv.style.display === 'none' ? 'block' : 'none';
}

render(createUl(), section);