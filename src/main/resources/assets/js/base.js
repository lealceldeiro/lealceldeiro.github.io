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

// region: back to top button
const backToTopBtn = document.getElementById("btn-back-to-top");
if (backToTopBtn != null) {
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
}
// endregion back to top button

// region: mark active menu items
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a.nav-link.active")
            .forEach(li => {
                li.classList.remove("active");
                li.attributes.removeNamedItem("aria-current");
            });

    document.querySelectorAll(`a[href="${location.pathname}"].nav-link`)
            .forEach(a => {
                a.classList.add("active");
                a.setAttribute("aria-current", "page");
            });
});
// endregion: mark active menu items

// region: theme picker
const LIGHT = 'light';
const DARK = 'dark';
const selectedThemeKey = 'lc_theme';

const storedTheme = localStorage.getItem(selectedThemeKey);
let selectedTheme = storedTheme === undefined || storedTheme === null ? LIGHT : storedTheme;

setTheme();

function setTheme() {
    document.querySelectorAll('html').forEach(e => e.setAttribute('data-bs-theme', selectedTheme));

    toggleThemeIcon();
    setNavbarLogo();
    setHighlightJsTheme();

    localStorage.setItem(selectedThemeKey, selectedTheme);
}

function toggleThemeIcon() {
    const toggleBtnEl = document.querySelector('i#themeToggle');
    const biToggleOff = 'bi-toggle2-off';
    const biToggleOn = 'bi-toggle2-on';

    toggleBtnEl.classList.remove(biToggleOff, biToggleOn);
    toggleBtnEl.classList.add(isDark() ? biToggleOn : biToggleOff);
}

function isDark() {
    return selectedTheme === DARK;
}

function setNavbarLogo(){
    const logoImg = isDark() ? 'logo500x500_dark_transparent.png' : 'logo500x500_transparent.png';
    document.querySelector('img#logo').setAttribute('src', 'img/' + logoImg);
}

function setHighlightJsTheme() {
    if (!window.hljs) {
        return;
    }
    const baseUrl = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/"
    const extension = ".min.css"

    const integrityLight="sha512-rxoFrVtnfvSuel468Qr3r4djCRmFKs4DiJXUnOeaA/+uac9DkEOTEhfkcwUNiGTiA4jr6pBvXk6leEhweuGaVg=="
    const integrityDark="sha512-bfLTSZK4qMP/TWeS1XJAR/VDX0Uhe84nN5YmpKk5x8lMkV0D+LwbuxaJMYTPIV13FzEv4CUOhHoc+xZBDgG9QA=="
    const hrefLight = "intellij-light";
    const hrefDark = "dark";

    const linkEl = document.querySelector('link#highlightJsThemeLink');
    linkEl.integrity = isDark() ? integrityDark : integrityLight;
    linkEl.href = baseUrl + (isDark() ? hrefDark : hrefLight) + extension;

    hljs.highlightAll();
}

function changeTheme() {
    selectedTheme = selectedTheme === LIGHT ? DARK : LIGHT;
    setTheme();
}
// endregion: theme picker
