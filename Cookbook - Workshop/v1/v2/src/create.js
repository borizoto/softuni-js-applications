function addReceipe() {
    const receipesUrl = 'http://localhost:3030/data/recipes';
    const formRef = document.getElementsByTagName("form")[0];

    const token = sessionStorage.getItem("accessToken");

    formRef.addEventListener("submit", onSubmitAddReceipe);

    function onSubmitAddReceipe(event) {
        event.preventDefault();

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

            window.location.href = "index.html";
        })
    }
}

addReceipe()