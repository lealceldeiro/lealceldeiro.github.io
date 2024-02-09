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

const scrollThreshold = 18;
let tocScroll = 0;
let windowScroll = 0;
const handleElementScroll = (scrolledElement) => {
    if (navShown) {
        document.querySelector("#navbarSupportedContent").classList.remove("show");
        navShown = false;
    }
    const isWindowScroll = scrolledElement.scrollY !== undefined;
    const scrollY = isWindowScroll ? scrolledElement.scrollY : scrolledElement.scrollTop;

    windowScroll = isWindowScroll ? scrollY : windowScroll;
    tocScroll = !isWindowScroll ? scrollY : tocScroll;

    if (scrollY >= scrollThreshold) {
        showMenuNavbarShadow();
    } else if (((isWindowScroll && tocScroll < scrollThreshold) || (!isWindowScroll && windowScroll < scrollThreshold))
        && scrollY < scrollThreshold) {
        hideMenuNavbarShadow();
    }
};
window.addEventListener("scroll", () => handleElementScroll(window));
const toc = document.querySelector("#toc");
if (toc != null) {
    toc.addEventListener("scroll", () => handleElementScroll(toc));
}
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
    tweakSpecificDesigns();

    document.dispatchEvent(new Event('themeSwitched'));

    localStorage.setItem(selectedThemeKey, selectedTheme);
}

function toggleThemeIcon() {
    const toggleBtnEl = document.querySelector('i#themeToggle');
    const biSun = 'bi-brightness-high';
    const biMoon = 'bi-moon-stars-fill';

    toggleBtnEl.classList.remove(biSun, biMoon);
    toggleBtnEl.classList.add(isDark() ? biMoon : biSun);
}

function isDark() {
    return selectedTheme === DARK;
}

function setNavbarLogo() {
    const logoImg = isDark() ? 'logo500x500_dark_transparent.png' : 'logo500x500_transparent.png';
    document.querySelector('img#logo').setAttribute('src', '/img/' + logoImg);
}

function setHighlightJsTheme() {
    if (!window.hljs) {
        return;
    }
    const baseUrl = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/"
    const extension = ".min.css"

    const integrityLight = "sha512-rxoFrVtnfvSuel468Qr3r4djCRmFKs4DiJXUnOeaA/+uac9DkEOTEhfkcwUNiGTiA4jr6pBvXk6leEhweuGaVg=="
    const integrityDark = "sha512-zcatBMvxa7rT7dDklfjauWsfiSFParF+hRfCdf4Zr40/MmA1gkFcBRbop0zMpvYF3FmznYFgcL8wlcuO/GwHoA=="
    const hrefLight = "intellij-light";
    const hrefDark = "github-dark-dimmed";

    const linkEl = document.querySelector('link#highlightJsThemeLink');
    linkEl.integrity = isDark() ? integrityDark : integrityLight;
    linkEl.href = baseUrl + (isDark() ? hrefDark : hrefLight) + extension;

    hljs.highlightAll();
}

function tweakSpecificDesigns() {
    document.querySelectorAll('.timeline-with-icons .timeline-icon')
        .forEach(e => e.setAttribute('style',
            'background-color: ' + (isDark() ? '#595f69!important;' : '#cfe0fc!important;')));
}

function changeTheme() {
    selectedTheme = selectedTheme === LIGHT ? DARK : LIGHT;
    setTheme();
}

// endregion: theme picker
