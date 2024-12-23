function loginUser() {
    const loginForm = document.getElementsByTagName("form")[0];
    const loginUrl = ` http://localhost:3030/users/login`;

    loginForm.addEventListener("submit", onSubmitLogin);

    function onSubmitLogin(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const {email, password} = Object.fromEntries(formData);

        if (!email || !password) {
            return alert("All fields must be filled!" + "\n" + "Password must be correct!");
        }

        fetch(loginUrl, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(response => response.json())
        .then(dataObj => {

            if (dataObj.code >= 400) {
                return alert(dataObj.message);
            }

            sessionStorage.setItem("email", dataObj.email);
            sessionStorage.setItem("accessToken", dataObj.accessToken);
            sessionStorage.setItem("id", dataObj._id);

            window.location.href = "index.html";
        })
    }
}

loginUser();