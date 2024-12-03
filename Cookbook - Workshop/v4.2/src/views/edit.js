import { openReceipe } from "./details.js";
import { BASE_URL, getOptions, handleResponse, tokenUtils } from "../api/utils.js";
import recipes from "../api/recipes.js";
const section = document.getElementById("updateRecipeSection");

export default function loadRecipeCard(receipeId) {
    recipes.loadCard(receipeId)
        .then(dataObj => {
            section.querySelector('[name="name"]').value = dataObj.name;
            section.querySelector('[name="img"]').value = dataObj.img;
            section.querySelector('[name="ingredients"]').value = dataObj.ingredients.join('\n');
            section.querySelector('[name="steps"]').value = dataObj.steps.join('\n');

            const formRef = section.querySelector("form");
            formRef.addEventListener("submit", (event) => onSubmitEditReceipe(event, receipeId));

            document.getElementById("openedReceipe").style.display = "none";
            section.style.display = "block";
        })
        .catch(err => err.message)
}

function onSubmitEditReceipe(event, id) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let { img, ingredients, name, steps } = Object.fromEntries(formData);

    ingredients = ingredients.split("\n");
    steps = steps.split("\n");

    if (!img || ingredients.some(ing => ing.trim() === "") || !name || steps.some(step => step.trim() === "")) {
        return alert("All fields must be fullfilled!");
    }

    recipes.edit(img, ingredients, name, steps, id)
        .then(dataObj => {

            document.getElementById("updateRecipeSection").style.display = "none";
            document.getElementById("catalog").style.display = "block";
            document.querySelector("nav #user").style.display = "inline";
            document.querySelector("nav #guest").style.display = "none";

            openReceipe(dataObj);
        })
        .catch(err => alert(err.message));
}