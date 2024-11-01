function lockedProfile() {

    const mainRef = document.getElementById('main');
    const demoProfileRef = document.querySelector(".profile");
    demoProfileRef.remove();
    const url = 'http://localhost:3030/jsonstore/advanced/profiles';
    const _ = undefined;
    let id = 1;

    fetch(url)
        .then(response => response.json())
        .then(dataObj => {
            const profiles = Object.values(dataObj);

            profiles.forEach(profile => {
                createProfile(profile);
            })
        })

    function createProfile({ _id, age, email, username }) {
        //Here we start making the profile div with the button
        const imgElement = elementFactory("img", { src: "./iconProfile2.png", class: "userIcon" });
        const labelLockElement = elementFactory("label", _, "Lock");
        const radioInputElementLock = elementFactory("input", { type: "radio", name: `user${id}Locked`, value: "lock", checked: true });
        const labelUnlockElement = elementFactory("label", _, "Unlock");
        const inputElementUnlocked = elementFactory("input", { type: "radio", name: `user${id}Locked`, value: "unlock" });
        const labelUsername = elementFactory("label", _, "Username");
        const inputElementText = elementFactory("input", { type: "text", name: `user${id}Username`, value: username, disabled: true, readOnly: true });
        const btn = elementFactory("button", _, "Show more");

        // Here we start making the Username div.       
        const emailLabel = elementFactory("label", _, "Email:")
        const inputElementEmail = elementFactory("input", { type: "email", name: `user${id}Email`, value: email, disabled: true, readOnly: true });
        const ageLabel = elementFactory("label", _, "Age:");
        const inputElementAge = elementFactory("input", { type: "number", name: `user${id}Age`, value: age, disabled: true, readOnly: true });

        id++;

        //Here we create the Username div and append every element of the div to the same div
        const usernameDiv = elementFactory("div",
            { class: `user${id}Username` },
            document.createElement('hr'),
            emailLabel,
            inputElementEmail,
            ageLabel,
            inputElementAge);
            
        usernameDiv.style.display = "none";

        // Here we create the Profile div and append every element of the div to the same div
        const profileDiv = elementFactory("div",
            { class: "profile" },
            imgElement,
            labelLockElement,
            radioInputElementLock,
            labelUnlockElement,
            inputElementUnlocked,
            document.createElement('br'),
            document.createElement('hr'),
            labelUsername,
            inputElementText,
            usernameDiv,
            btn);

        // Adding event listner to the view button
        btn.addEventListener("click", function () {
            if (radioInputElementLock.checked) return;

            btn.textContent = btn.textContent === "Show more" ? "Hide it" : "Show more";
            usernameDiv.style.display = usernameDiv.style.display === "block" ? "none" : "block";
        })

        mainRef.appendChild(profileDiv);
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
