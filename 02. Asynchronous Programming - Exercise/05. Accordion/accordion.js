function solution() {
    const mainRef = document.getElementById("main");
    const articlesListUrl = " http://localhost:3030/jsonstore/advanced/articles/list";
    const _ = undefined;

    fetch(articlesListUrl)
        .then(responsePromise => responsePromise.json())
        .then(dataObj => {
            dataObj.forEach(obj => {
                createDiv(obj)
            })
        });

    function createDiv({ _id, title }) {
        
        const span = elementFactory("span", _, title);
        const btn = elementFactory("button", { class: "button", id: _id }, "More");
        const headDiv = elementFactory("div", { class: "head" }, span, btn);
        
        const p = elementFactory("p")
        const extraDiv = elementFactory("div", { class: "extra", id: _id }, p);
        
        const accordionDiv = elementFactory("div", { class: "accordion" }, headDiv, extraDiv);
        
        btn.addEventListener("click", function () {
            const detailsUrl = `http://localhost:3030/jsonstore/advanced/articles/details/${_id}`;

            fetch(detailsUrl)
            .then(responsePromise => responsePromise.json())
            .then(dataObj => {
                const content = dataObj.content;
                p.textContent = content;        
            })

            btn.textContent = btn.textContent === "More" ? "Less" : "More";
            extraDiv.style.display = extraDiv.style.display === "block" ? "none" : "block";
        })

        mainRef.appendChild(accordionDiv);
    }

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
}

window.onload = solution();