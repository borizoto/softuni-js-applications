import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById('root');
const form = document.querySelector('form');

form.addEventListener('submit', onSubmitHandle)

function onSubmitHandle(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { towns } = Object.fromEntries(formData);
    const townsArr = towns.split(', ')

    render(template(townsArr), root)
}

function template(towns) {
    return html`
    <ul>
        ${towns.map(town => html`<li>${town}</li>`)}
    </ul>
    `
}
