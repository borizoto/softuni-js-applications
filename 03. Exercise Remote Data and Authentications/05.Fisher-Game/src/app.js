function mainScreen() {
    const addBtnRef = document.querySelector("form fieldset button");
    const formRef = document.getElementById("addForm");

    const token = sessionStorage.getItem("accessToken");

    const mainUrl = `http://localhost:3030/data/catches`;

    document.getElementById("logout").style.display = "none";

    let loggedUser = false;
    const ownerId = sessionStorage.getItem("ownerId");

    function navigationHandle() {
        const navRef = document.getElementsByTagName("nav")[0];

        const curUserEmail = sessionStorage.getItem("email");

        if (token && curUserEmail) { // User is logged in
            loggedUser = true;
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "inline";
            document.getElementById("register").style.display = "none";
            document.querySelector("nav span").textContent = curUserEmail;

            const logoutBtnRef = document.getElementById("logout");

            logoutBtnRef.addEventListener("click", function () {
                const logoutUrl = "http://localhost:3030/users/logout";

                fetch(logoutUrl, {
                    method: "GET",
                    headers: { "X-Authorization": token },
                })

                sessionStorage.removeItem("accessToken");
                sessionStorage.removeItem("email");
                sessionStorage.removeItem("ownerId");

                loggedUser = false;
                window.location = "index.html";
            })
        }
    }

    function loadCatches() {
        const mainRef = document.getElementById("main");
        mainRef.style.display = "none";

        const loadBtnRef = document.querySelector("aside > button");

        loadBtnRef.addEventListener("click", function () {
            fetch(mainUrl)
                .then(response => response.json())
                .then(dataObj => {
                    const catchesRef = document.getElementById("catches");

                    catchesRef.innerHTML = "";

                    dataObj.forEach(obj => {
                        const l1 = elementFactory("label", undefined, "Angler");
                        const input1 = elementFactory("input", { "type": "text", "class": "angler", "value": obj.angler });

                        const l2 = elementFactory("label", undefined, "Weight");
                        const input2 = elementFactory("input", { "type": "text", "class": "weight", "value": obj.weight });

                        const l3 = elementFactory("label", undefined, "Species");
                        const input3 = elementFactory("input", { "type": "text", "class": "species", "value": obj.species });

                        const l4 = elementFactory("label", undefined, "Location");
                        const input4 = elementFactory("input", { "type": "text", "class": "location", "value": obj.location });

                        const l5 = elementFactory("label", undefined, "Bait");
                        const input5 = elementFactory("input", { "type": "text", "class": "bait", "value": obj.bait });

                        const l6 = elementFactory("label", undefined, "Capture Time");
                        const input6 = elementFactory("input", { "type": "number", "class": "captureTime", "value": obj.captureTime });

                        const updateBtn = elementFactory("button", { "class": "update", "data-id": obj._id, "disabled": true }, "UPDATE");
                        const deleteBtn = elementFactory("button", { "class": "delete", "data-id": obj._id, "disabled": true }, "DELETE");

                        if (obj._ownerId === ownerId) {
                            updateBtn.disabled = false;
                            deleteBtn.disabled = false;
                        }

                        updateBtn.addEventListener("click", updateCatch);
                        deleteBtn.addEventListener("click", deleteCatch);

                        const div = elementFactory("div", { "class": "catch", "id": obj._id }, l1, input1, l2, input2, l3, input3, l4, input4, l5, input5, l6, input6, updateBtn, deleteBtn);
                        catchesRef.appendChild(div);
                    });

                    mainRef.style.display = "inline";
                })
        })
    }

    function handleForm() {
        if (loggedUser === true) {
            addBtnRef.disabled = false;
        }

        formRef.addEventListener("submit", addCatch)
    }

    function addCatch(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const { angler, bait, captureTime, location, species, weight } = Object.fromEntries(formData)

        if (!angler || !bait || !captureTime || !location || !species || !weight) {
            return alert("All fields must be filled!");
        }

        fetch(mainUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "X-Authorization": token
            },
            body: JSON.stringify({
                angler,
                bait,
                captureTime,
                location,
                species,
                weight
            })
        })
            .then(response => response.json())
            .then(dataObj => {
                formRef.reset();
                document.querySelector("aside > button").click();
            })
    }

    function deleteCatch(event) {
        const catchId = event.target.parentElement.id;

        fetch(`${mainUrl}/${catchId}`, {
            method: "DELETE",
            headers: { "X-Authorization": token }
        })
            .then(response => response.json())
            .then(dataObj => {
                event.target.parentElement.remove();
            })
    }

    function updateCatch(event) {
        const catchId = event.target.parentElement.id;
        const curCatchElement = event.target.parentElement;

        const [angler, weight, species, location, bait, captureTime] = Array.from(curCatchElement.children)
            .filter((el, i) => {
                if (i % 2 !== 0 && i < 12) {
                    return el;
                }
            })
            .map(el => el.value);

        if (!angler || !bait || !captureTime || !location || !species || !weight) {
            return alert("All fields must be filled!");
        }

        fetch(`${mainUrl}/${catchId}`, {
            method: "PUT",
            headers: { "X-Authorization": token },
            body: JSON.stringify({
                angler,
                bait,
                captureTime,
                location,
                species,
                weight
            })
        })
            .then(response => response.json())
            .then(dataObj => {
                document.querySelector("aside > button").click();
            })
    }

    navigationHandle();
    loadCatches();
    handleForm();

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

mainScreen();