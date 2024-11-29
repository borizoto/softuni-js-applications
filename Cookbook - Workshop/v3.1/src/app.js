import logoutUser from "./logout.js";
import addReceipe from "./create.js";
import loginUser from "./login.js";
import registerUser from "./register.js";
import loadHomepage from "./home.js";
import navigationHandle from "./navigation.js";

const btnFunctions = {
    "catalogBtn": loadHomepage,
    "loginBtn": loginUser,
    "regBtn": registerUser,
    "createBtn": addReceipe,
    "logoutBtn": logoutUser
};

function homePage() {
    const navigationRef = document.querySelector("nav");

    navigationRef.addEventListener("click", function (event) {
        event.preventDefault();

        if (event.target.tagName !== "A") return;

        const sections = document.querySelectorAll("section");

        sections.forEach(section => section.style.display = "none");
        document.querySelectorAll("A").forEach(btn => btn.classList.remove("active"));

        const selectedSection = event.target.id;
        btnFunctions[selectedSection]();
    })

    btnFunctions["catalogBtn"]();
    navigationHandle();
}

homePage();