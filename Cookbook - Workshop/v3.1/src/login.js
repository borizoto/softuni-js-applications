const loginUrl = ` http://localhost:3030/users/login`;
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

            loginForm.reset()
            
            sessionStorage.setItem("email", dataObj.email);
            sessionStorage.setItem("accessToken", dataObj.accessToken);
            sessionStorage.setItem("id", dataObj._id);

            document.getElementById("loginSection").style.display = "none";
            document.getElementById("catalog").style.display = "block";
            document.querySelector("nav #user").style.display = "inline";
            document.querySelector("nav #guest").style.display = "none";
        })
}