function bookLibrary() {
    const loadBtn = document.getElementById("loadBooks");
    const url = `http://localhost:3030/jsonstore/collections/books`;
    const tableRef = document.querySelector("body table tbody");
    const formRef = document.querySelector("body form");
    const formH3Ref = document.querySelector("body form h3");
    const formButtonRef = document.querySelector("body form button");
    tableRef.innerHTML = "";
    let editBookId = null;

    loadBtn.addEventListener("click", loadBooks);
    formRef.addEventListener("submit", handleCreateOrEdit)

    async function loadBooks() {
        const response = await fetch(url);
        const dataObj = await response.json();
        tableRef.innerHTML = "";
        formRef.title.value = "";
        formRef.author.value = "";

        Object.entries(dataObj).forEach(([id, bookObj]) => {
            const tr = document.createElement("tr");
            tr.setAttribute("id", id);

            const titleCell = tr.insertCell(0);
            titleCell.textContent = bookObj.title;

            const authorCell = tr.insertCell(1);
            authorCell.textContent = bookObj.author;

            const actionCell = tr.insertCell(2);

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.addEventListener("click", function () { editBook(id, bookObj) })

            const delBtn = document.createElement("button");
            delBtn.textContent = "Detele";
            delBtn.addEventListener("click", function () {
                tr.remove();

                fetch(`${url}/${id}`, {
                    method: "DELETE"
                })
            })

            actionCell.appendChild(editBtn)
            actionCell.appendChild(delBtn)

            tableRef.appendChild(tr)
        });
    }

    function handleCreateOrEdit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const { title, author } = Object.fromEntries(formData);

        if (!title || !author) return;

        if (editBookId) {
            fetch(`${url}/${editBookId}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    title,
                    author
                })
            })
                .then(response => response.json())
                .then(dataObj => {
                    const row = document.getElementById(editBookId);
                    row.children[0].textContent = title;
                    row.children[1].textContent = author;

                    formH3Ref.textContent = "FORM";
                    formButtonRef.textContent = "Submit";

                    editBookId = null;
                    formRef.reset();
                })
                .catch((err) => alert(err.message));
        } else {
            fetch(url, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    title,
                    author
                })
            })
                .then(loadBooks)
                .catch((err) => alert(err.message));
        }
    }

    function editBook(id, bookObj) {
        editBookId = id;

        // const curTr = event.target.closest("tr")
        // let [title, author] = curTr.children;

        formH3Ref.textContent = "Edit FORM";
        formButtonRef.textContent = "Save";
        formRef.title.value = bookObj.title;
        formRef.author.value = bookObj.author;
    }
}

window.onload = bookLibrary();