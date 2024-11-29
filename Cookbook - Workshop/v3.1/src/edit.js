import { openReceipe } from "./home.js";
const section = document.getElementById("updateRecipeSection");
const url = `http://localhost:3030/data/recipes`;

export default function editReceipe(receipeId) {
    fetch(`${url}/${receipeId}`)
        .then(response => response.json())
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
}

function onSubmitEditReceipe(event, id) {
    event.preventDefault();

    const token = sessionStorage.getItem("accessToken");

    const formData = new FormData(event.target);
    let { img, ingredients, name, steps } = Object.fromEntries(formData);

    ingredients = ingredients.split("\n");
    steps = steps.split("\n");

    if (!img || !ingredients || !name || !steps) {
        return alert("All fields must be fullfilled!");
    }

    fetch(`${url}/${id}`, {
        method: "PUT",
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

            // formRef.reset();

            document.getElementById("updateRecipeSection").style.display = "none";
            document.getElementById("catalog").style.display = "block";
            document.querySelector("nav #user").style.display = "inline";
            document.querySelector("nav #guest").style.display = "none";
            // loadHomepage();
            openReceipe(dataObj);
        })
}