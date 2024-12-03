import logoutUser from "./views/logout.js";
import addReceipe from "./views/create.js";
import loginUser from "./views/login.js";
import registerUser from "./views/register.js";
import loadCatalogPage from "./views/details.js";
import navigationHandle from "./navigation.js";
import loadHomepage from "./views/home.js";

const btnFunctions = {
    "catalogBtn": loadCatalogPage,
    "loginBtn": loginUser,
    "regBtn": registerUser,
    "createBtn": addReceipe,
    "logoutBtn": logoutUser,
    "logoBtn": loadHomepage  
};

function homePage() {
    const navigationRef = document.querySelector("nav");
    const logoBtnRef = document.getElementById("logoBtn");
    const sections = document.querySelectorAll("section");
    
    navigationRef.addEventListener("click", function (event) {
        event.preventDefault();

        if (event.target.tagName !== "A") return;

        sections.forEach(section => section.style.display = "none");
        document.querySelectorAll("A").forEach(btn => btn.classList.remove("active"));

        const selectedSection = event.target.id;
        btnFunctions[selectedSection]();
    })

    logoBtnRef.addEventListener("click", function(event) {
        event.preventDefault();

        sections.forEach(section => section.style.display = "none");
        document.querySelectorAll("A").forEach(btn => btn.classList.remove("active"));

        const selectedSection = event.currentTarget.id;
        btnFunctions[selectedSection]();
    })

    // btnFunctions["catalogBtn"]();
    navigationHandle();
    loadHomepage();
}

homePage();