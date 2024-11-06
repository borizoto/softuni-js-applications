function attachEvents() {
    const loadBtnRef = document.getElementById("btnLoad");
    const phoneBookUlRef = document.getElementById("phonebook");
    const createBtnRef = document.getElementById("btnCreate");
    const url = `http://localhost:3030/jsonstore/phonebook`;

    loadBtnRef.addEventListener("click", loadAllPhones);
    createBtnRef.addEventListener("click", createContact)

    async function loadAllPhones() {
        const response = await fetch(url);
        const dataObj = await response.json();

        phoneBookUlRef.replaceChildren();

        Object.values(dataObj).forEach(({ person, phone, _id }) => {
            const li = document.createElement("li");
            li.textContent = `${person}: ${phone}`;

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.setAttribute("id", _id);

            deleteBtn.addEventListener("click", function () {
                li.remove();

                fetch(`${url}/${deleteBtn.id}`, {
                    method: "DELETE"
                })
            })

            li.appendChild(deleteBtn);
            phoneBookUlRef.appendChild(li);
        })
    }

    async function createContact() {
        const personInputRef = document.getElementById("person");
        const phoneInputRef = document.getElementById("phone");

        if (personInputRef.value === "" || phoneInputRef.value === "") return;

        try {
            await fetch(url, {
                method: "POST",
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({
                    person: personInputRef.value,
                    phone: phoneInputRef.value
                })
            });

            loadBtnRef.click();
            
        } catch (err) {
            alert(err.message);
        } finally {
            personInputRef.value = "";
            phoneInputRef.value = "";
        }
    }
}

attachEvents();