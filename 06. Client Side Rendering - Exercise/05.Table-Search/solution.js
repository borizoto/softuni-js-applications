import { html, render } from "./node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/table';

const tbody = document.querySelector('tbody');
const input = document.getElementById('searchField');

loadItems();

document.querySelector('#searchBtn').addEventListener('click', onClick);

function onClick() {
   Array.from(tbody.children).forEach(row => row.classList.remove('select'));

   if (!input.value) {
      alert('Please enter a valid text!');
      return;
   }

   Array.from(tbody.children).forEach(row => {
      if (row.textContent.toLocaleLowerCase().includes(input.value.toLowerCase())) {
         row.classList.add(`select`);
      }
   });

   input.value = '';
}

async function loadItems() {
   try {
      const response = await fetch(url);

      if (!response.ok) {
         throw new Error('Failed to load items!');
      }

      const dataObj = await response.json();
      render(template(dataObj), tbody);

   } catch (error) {
      alert(error.message);
   }
}

function template(obj) {
   return html`
      ${Object.values(obj).map(el => html`
         <tr>
            <td>${el.firstName} ${el.lastName}</td>
            <td>${el.email}</td>
            <td>${el.course}</td>
         </tr>
      `)}
   `
}