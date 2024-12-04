import { html, render } from "./node_modules/lit-html/lit-html.js";
import { towns } from "./towns.js";

const townsListRef = document.getElementById('towns');
const inputRef = document.getElementById('searchText');
const searchBtn = document.getElementsByTagName('button')[0];
const result = document.getElementById('result');

searchBtn.addEventListener('click', search);

function search() {
   const townsArr = Array.from(document.getElementsByTagName('ul')[0].children);
   townsArr.forEach(town => town.classList.remove('active'));
   result.textContent = '';

   const indexesArr = [];

   if (!inputRef.value) return;

   townsArr.forEach(town => {
      if (town.textContent.includes(inputRef.value)) {
         indexesArr.push(townsArr.indexOf(town));
         town.classList.add('active');
      }
   });

   result.textContent = `${indexesArr.length} matches found`;
   inputRef.value = '';
}

function onLoadTemplate() {
   return html`
   <ul>
      ${towns.map(town => townTemplate(town))}
   </ul>
   `
}

function townTemplate(town) {
   return html`
      <li>${town}</li>
   `
}

render(onLoadTemplate(), townsListRef)