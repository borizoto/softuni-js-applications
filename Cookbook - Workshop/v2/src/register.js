function registerUser() {
    const regForm = document.getElementsByTagName("form")[0];
    const regUrl = ` http://localhost:3030/users/register`;

    regForm.addEventListener("submit", onSubmitRegister);

    function onSubmitRegister(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const { email, password, rePass } = Object.fromEntries(formData);

        if (!email || !password || !rePass || password !== rePass) {    
            return alert("All fields must be filled!" + "\n" + "Password and repeat must match!");
        }

        fetch(regUrl, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email,
                password,
                repass: rePass
            })
        })
        .then(response => response.json())
        .then(dataObj => {
            if (dataObj.code >= 400) {
                return alert(dataObj.message)
            }

            sessionStorage.setItem("email", dataObj.email);
            sessionStorage.setItem("accessToken", dataObj.accessToken);
            sessionStorage.setItem("id", dataObj._id);

            window.location.href = "index.html";
        })
    }
}

registerUser();