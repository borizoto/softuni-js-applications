import { openReceipe } from "./details.js";
import recipes from "../api/recipes.js";

const section = document.getElementById("createRecipeSection");
const formRef = section.getElementsByTagName("form")[0];

export default function addReceipe() {
    section.style.display = "block";
    document.getElementById("createBtn").classList.add("active");
}

formRef.addEventListener("submit", onSubmitAddReceipe);

export function onSubmitAddReceipe(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let { img, ingredients, name, steps } = Object.fromEntries(formData);

    ingredients = ingredients.split("\n");
    steps = steps.split("\n");

    if (!img || ingredients.some(ing => ing.trim() === "") || !name || steps.some(step => step.trim() === "")) {
        return alert("All fields must be fullfilled!");
    }

    recipes.create(img, ingredients, name, steps)
        .then(dataObj => {
            event.target.reset();

            document.getElementById("createRecipeSection").style.display = "none";
            document.getElementById("catalog").style.display = "block";
            document.querySelector("nav #user").style.display = "inline";
            document.querySelector("nav #guest").style.display = "none";

            openReceipe(dataObj);
        })
        .catch(err => alert(err.message));
}