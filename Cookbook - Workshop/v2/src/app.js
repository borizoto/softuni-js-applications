import logoutUser from "./logout.js";

function homePage() {
    const token = sessionStorage.getItem("accessToken");
    // const ownerId = sessionStorage.getItem("_id");
    const email = sessionStorage.getItem("email");

    function navigationHandle() {
        if (email && token) {
            document.querySelector("nav #user").style.display = "inline";

            const logoutBtn = document.getElementById("logoutBtn");
            logoutBtn.addEventListener("click", logoutUser);
        } else {
            document.querySelector("nav #guest").style.display = "inline";
        }
    }

    function loadRecipes() {
        const mainRef = document.querySelector("body main");
        const receipesUrl = 'http://localhost:3030/data/recipes';

        const _ = undefined;

        fetch(receipesUrl)
            .then(response => response.json())
            .then(dataObj => {
                mainRef.replaceChildren();

                const receipesArr = Object.values(dataObj);
                
                receipesArr.forEach(receipe => {
                    createReceipe(receipe);
                })
            })
            .catch(err => alert(err.message));

        function createReceipe(receipeObj) {
            const h2Title = elementFactory("h2", _, receipeObj.name);
            const titleDiv = elementFactory("div", { class: "title" }, h2Title);
            const img = elementFactory("img", { src: receipeObj.img });
            const smallDiv = elementFactory("div", { class: "small" }, img);
            const article = elementFactory("article", { class: "preview" }, titleDiv, smallDiv);

            article.addEventListener("click", function () {
                const url = `http://localhost:3030/data/recipes/${receipeObj._id}`;

                fetch(url)
                    .then(response => response.json())
                    .then(dataObj => {
                        openReceipe(dataObj, article);
                    })
                    .catch(err => alert(err.message));
            })

            mainRef.appendChild(article);
        }

        function openReceipe(obj, curArticleRef) {
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

            mainRef.replaceChild(article, curArticleRef)
        }
    }

    loadRecipes();
    navigationHandle();
}

homePage();

function elementFactory(type, attributes, ...children) {
    const element = document.createElement(type);

    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }

    children.forEach(child => {
        if (typeof child === "string") {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    })

    return element;
}
