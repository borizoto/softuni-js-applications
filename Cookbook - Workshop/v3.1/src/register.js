const regUrl = ` http://localhost:3030/users/register`;
const section = document.getElementById("registerSection")
const regForm = section.getElementsByTagName("form")[0];

export default function registerUser() {
    section.style.display = "block";
    document.getElementById("regBtn").classList.add("active");
}

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

            regForm.reset();

            sessionStorage.setItem("email", dataObj.email);
            sessionStorage.setItem("accessToken", dataObj.accessToken);
            sessionStorage.setItem("id", dataObj._id);

            document.getElementById("registerSection").style.display = "none";
            document.getElementById("catalog").style.display = "block";
            document.querySelector("nav #user").style.display = "inline";
            document.querySelector("nav #guest").style.display = "none";
        })
}