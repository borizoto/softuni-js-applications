import auth from '../api/auth.js';
const section = document.getElementById("loginSection");
const loginForm = section.getElementsByTagName("form")[0];

export default function loginUser() {
    section.style.display = "block";
    document.getElementById("loginBtn").classList.add("active");
}

loginForm.addEventListener("submit", onSubmitLogin);

function onSubmitLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData);

    if (!email || !password) {
        return alert("All fields must be filled!" + "\n" + "Password must be correct!");
    }

    auth.login(email, password)
        .then(resolve => {
            event.target.reset();

            document.getElementById("loginSection").style.display = "none";
            document.getElementById("catalog").style.display = "block";
            document.querySelector("nav #user").style.display = "inline";
            document.querySelector("nav #guest").style.display = "none";
        })
        .catch(err => alert(err.message));
}