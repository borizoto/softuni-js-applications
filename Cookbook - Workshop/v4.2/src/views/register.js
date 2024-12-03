import auth from '../api/auth.js';
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

    auth.register(email, password, rePass)
        .then(resolve => {
            event.target.reset();

            document.getElementById("registerSection").style.display = "none";
            document.getElementById("catalog").style.display = "block";
            document.querySelector("nav #user").style.display = "inline";
            document.querySelector("nav #guest").style.display = "none";
        })
        .catch(err => alert(err.message));
}