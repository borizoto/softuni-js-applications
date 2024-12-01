import loadCatalogPage from "./details.js";
import { openReceipe } from "./details.js";

const receipesUrl = 'http://localhost:3030/data/recipes';
const section = document.getElementById("createRecipeSection");
const formRef = section.getElementsByTagName("form")[0];

export default function addReceipe() {
    section.style.display = "block";
    document.getElementById("createBtn").classList.add("active");
}

formRef.addEventListener("submit", onSubmitAddReceipe);

export function onSubmitAddReceipe(event) {
    event.preventDefault();

    const token = sessionStorage.getItem("accessToken");

    const formData = new FormData(event.target);
    let { img, ingredients, name, steps } = Object.fromEntries(formData);

    ingredients = ingredients.split("\n");
    steps = steps.split("\n");

    if (!img || !ingredients || !name || !steps) {
        return alert("All fields must be fullfilled!");
    }

    fetch(receipesUrl, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "X-Authorization": token
        },
        body: JSON.stringify({
            img,
            ingredients,
            name,
            steps
        })
    })
        .then(response => response.json())
        .then(dataObj => {

            if (dataObj.code >= 400) {
                return alert(dataObj.message);
            }

            formRef.reset();

            document.getElementById("createRecipeSection").style.display = "none";
            document.getElementById("catalog").style.display = "block";
            document.querySelector("nav #user").style.display = "inline";
            document.querySelector("nav #guest").style.display = "none";
            // loadCatalogPage();
            openReceipe(dataObj);
        })
}