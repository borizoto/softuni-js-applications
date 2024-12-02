import { BASE_URL, getOptions, handleResponse, tokenUtils } from "../api/utils.js";
import { elementFactory } from '../helperFunctions.js';
import recipes from '../api/recipes.js';
import loadRecipeCard from './edit.js';

const section = document.getElementById("catalog");
const openedReceipeSection = document.getElementById("openedReceipe");

export default function loadCatalogPage() {
    section.style.display = "block";
    document.getElementById("catalogBtn").classList.add("active");
    loadCatalog();
}

const _ = undefined;

function loadCatalog() {
    
    recipes.loadAll()
    .then(dataObj => {
        section.replaceChildren();

        const receipesArr = Object.values(dataObj);

        receipesArr.forEach(receipe => {
            generateReceipe(receipe);
        })
    })
    .catch(err => alert(err.message));
}

function generateReceipe(receipeObj) {
    const h2Title = elementFactory("h2", _, receipeObj.name);
    const titleDiv = elementFactory("div", { class: "title" }, h2Title);
    const img = elementFactory("img", { src: receipeObj.img });
    const smallDiv = elementFactory("div", { class: "small" }, img);
    const article = elementFactory("article", { class: "preview" }, titleDiv, smallDiv);

    article.addEventListener("click", function () {

        return fetch(`${BASE_URL}/data/recipes/${receipeObj._id}`)
            .then(handleResponse)
            .then(dataObj => {
                openReceipe(dataObj);
            })
            .catch(err => alert(err.message));
    })

    section.appendChild(article);
}

export function openReceipe(obj) {
    const h2Title = elementFactory("h2", _, obj.name);
    const img = elementFactory("img", { src: obj.img });
    const thumbDiv = elementFactory("div", { class: "thumb" }, img);
    const h3Ingredients = elementFactory("h3", _, "Ingredients:");
    const ul = document.createElement("ul");

    for (const ingredient of obj.ingredients) {
        const li = elementFactory("li", _, ingredient);
        ul.appendChild(li);
    }

    const ingredientsDiv = elementFactory("div", { class: "ingredients" }, h3Ingredients, ul);
    const bandDiv = elementFactory("div", { class: "band" }, thumbDiv, ingredientsDiv);
    const h3Prep = elementFactory("h3", _, "Preparation:");
    const descriptionDiv = elementFactory("div", { class: "description" }, h3Prep);

    for (const step of obj.steps) {
        const p = elementFactory("p", _, step);
        descriptionDiv.appendChild(p);
    }

    const article = elementFactory("article", _, h2Title, bandDiv, descriptionDiv);

    section.style.display = "none";
    openedReceipeSection.innerHTML = "";
    openedReceipeSection.appendChild(article);
    openedReceipeSection.style.display = "block";

    const token = sessionStorage.getItem("accessToken");
    const email = sessionStorage.getItem("email");
    const ownerId = sessionStorage.getItem("id");

    if (token && email && obj._ownerId === ownerId) { // User is logged in
        const controlsDiv = elementFactory("div", { "class": "controls" },
            elementFactory("button", {
                onclick: function () {
                    document.getElementById("openedReceipe").style.display = "none";
                    loadCatalogPage();
                }
            }, "\u2714 Catalog"),
            elementFactory("button", { onclick: function () { loadRecipeCard(obj._id) } }, "\u270E Edit"),
            elementFactory("button", { onclick: deleteReceipe }, "\u2716 Delete"));
        article.appendChild(controlsDiv);

        function deleteReceipe() {
            const confirmed = confirm(`Are you sure you want to delete ${obj.name} receipe?`);
            if (!confirmed) return;

            const options = getOptions('DELETE', null, token)
            return fetch(`${BASE_URL}/data/recipes/${obj._id}`, options)
                .then(handleResponse)
                .then(dataObj => {
                    document.getElementById("openedReceipe").style.display = "none";
                    section.innerHTML = "";
                    section.appendChild(elementFactory("div", _, elementFactory("h2", _, `${obj.name} receipe deleted successfully!`)));
                    section.style.display = "block";
                })
                .catch(err => alert(err.message))
        }
    }
}