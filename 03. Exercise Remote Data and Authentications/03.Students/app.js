async function students() {
    const formRef = document.querySelector("form");
    const tableRef = document.querySelector("#results tbody")
    const url = `http://localhost:3030/jsonstore/collections/students`;

    const response = await fetch(url);
    const dataObj = await response.json();

    Object.values(dataObj).forEach(student => {
        const tr = document.createElement("tr");
        tr.setAttribute("id", student._id);

        const firstNameCell = tr.insertCell(0);
        firstNameCell.textContent = student.firstName;

        const lastNameCell = tr.insertCell(1);
        lastNameCell.textContent = student.lastName;

        const facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.textContent = student.facultyNumber;

        const gradeCell = tr.insertCell(3);
        gradeCell.textContent = (Number(student.grade)).toFixed(2);

        tableRef.appendChild(tr)
    })

    formRef.addEventListener("submit", submitStudent)

    function submitStudent(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const { firstName, lastName, facultyNumber, grade } = Object.fromEntries(formData);

        if (firstName === "" || lastName === "" || facultyNumber === "" || grade === "") return;

        fetch(url, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                firstName,
                lastName,
                facultyNumber,
                grade
            })
        })
            .then(response => response.json())
            .then(dataObj => {
                event.target.reset();
                location.reload();
            });
    }
}

window.onload = students();