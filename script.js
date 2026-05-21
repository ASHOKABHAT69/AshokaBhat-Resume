const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");
const mobileToggle = document.querySelector(".mobile-toggle");
const sections = document.querySelectorAll("section, #awards");
const navItems = document.querySelectorAll(".nav-links a");

function setNavbarState() {
    if (!navbar) return;
    navbar.classList.toggle("scrolled", window.scrollY > 24);
}

function toggleMenu() {
    if (!navLinks || !mobileToggle) return;
    const isOpen = navLinks.classList.toggle("active");
    document.body.classList.toggle("menu-open", isOpen);
    mobileToggle.setAttribute("aria-expanded", String(isOpen));
    mobileToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
}

function closeMenu() {
    if (!navLinks || !mobileToggle) return;
    navLinks.classList.remove("active");
    document.body.classList.remove("menu-open");
    mobileToggle.setAttribute("aria-expanded", "false");
    mobileToggle.setAttribute("aria-label", "Open navigation");
}

function setActiveLink() {
    let current = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 220) {
            current = section.getAttribute("id") || current;
        }
    });

    navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
    });
}

window.addEventListener("scroll", () => {
    setNavbarState();
    setActiveLink();
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});

navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

setNavbarState();
setActiveLink();
