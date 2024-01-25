// region: show navbar shadow box
const navEl = document.querySelector("#menuNav");

let navShown = false;

function handleNavBarToggle() {
    if (!navShown) {
        showMenuNavbarShadow();
    }
    navShown = !navShown;
}

function showMenuNavbarShadow() {
    navEl.classList.add("navbar-scrolled");
    navEl.classList.add("bg-light-subtle");
}

function hideMenuNavbarShadow() {
    navEl.classList.remove("navbar-scrolled");
    navEl.classList.remove("bg-light-subtle");
}

window.addEventListener("scroll", () => {
    if (navShown) {
        document.querySelector("#navbarSupportedContent").classList.remove("show");
        navShown = false;
    }
    const threshold = 18;
    if (window.scrollY >= threshold) {
        showMenuNavbarShadow();
    } else if (window.scrollY < threshold) {
        hideMenuNavbarShadow();
    }
});
// endregion show navbar shadow box

// region back to top button
const backToTopBtn = document.getElementById("btn-back-to-top");

window.addEventListener("scroll", () => {
    const threshold = 18;
    backToTopBtn.style.display = document.body.scrollTop > threshold
                                                         || document.documentElement.scrollTop > threshold
                                                         ? "block" : "none";
});

backToTopBtn.addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});
// end region back to top button
