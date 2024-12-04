import { html, render } from "./node_modules/lit-html/lit-html.js";
const url = 'http://localhost:3030/jsonstore/advanced/dropdown';

const menu = document.getElementById('menu');
const form = document.querySelector('form');

form.addEventListener('submit', addItem)

async function addItem(e) {
    e.preventDefault();

    const text = document.getElementById('itemText').value;

    if (!text) {
        alert('Please enter a valid text!')
        return;
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                text
            })
        })

        if (!response.ok) {
            throw new Error('Failed to add item!');
        }

        document.getElementById('itemText').value = '';
        loadItems();

    } catch (error) {
        alert(error.message)
    }
}

async function loadItems() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to load items!');
        }

        const dataObj = await response.json();
        render(template(dataObj), menu);

    } catch (error) {
        alert(error.message);
    }
}

function template(obj) {
    return html`${Object.entries(obj).map(([id, el]) => html`<option value=${el._id}>${el.text}</option>`)}`
}

loadItems();