const navEl = document.querySelector("#menuNav");
window.addEventListener("scroll", () => {
    const threshold = 18;
    if (window.scrollY >= threshold) {
        navEl.classList.add("navbar-scrolled");
        navEl.classList.add("bg-light-subtle");
    } else if (window.scrollY < threshold) {
        navEl.classList.remove("navbar-scrolled");
        navEl.classList.remove("bg-light-subtle");
    }
});
