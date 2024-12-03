import recipes from "../api/recipes.js";
import { openReceipe } from "./details.js";
import { elementFactory } from "../helperFunctions.js";
import loadCatalogPage from "./details.js";

const section = document.getElementById("homeSection");
const pRef = document.getElementById("browse");

export default function loadHomepage() {
    const recentRecipes = document.querySelector('.recent-recipes');
    
    recipes.loadRecent()
        .then(latestRecipes => {
            recentRecipes.innerHTML = ''; 

            latestRecipes.forEach(recipe => {
                recentRecipes.appendChild(renderRecipe(recipe));
                
                const recentSpaceDiv = elementFactory('div', { class: 'recent-space' });
                recentRecipes.appendChild(recentSpaceDiv);
            });
        })
        .catch(err => console.error('Error loading recipes:', err));

    section.style.display = "block";
}

function renderRecipe(recipe) {
    const img = elementFactory('img', { 'src': recipe.img, 'alt': recipe.name });
    const previewDiv = elementFactory('div', { 'class': 'recent-preview' }, img);
    const titleDiv = elementFactory('div', { 'class': 'recent-title' }, recipe.name);
    const article = elementFactory('article', { 'class': 'recent' , onclick: function () { openReceipe(recipe); section.style.display = 'none' }}, previewDiv, titleDiv);

    return article;
}

pRef.addEventListener('click', function (event) {
    event.preventDefault();

    if (event.target.tagName !== 'A') {
        return;
    }

    if (event.target.textContent === 'Catalog') {
        loadCatalogPage();
        section.style.display = "none";
    }
});
