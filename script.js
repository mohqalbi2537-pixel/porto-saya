const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");
const pageSections = Array.from(document.querySelectorAll("main > section[id]"));

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "Buka menu" : "Tutup menu");
        navLinks.classList.toggle("is-open", !isExpanded);
        document.body.classList.toggle("menu-open", !isExpanded);
    });

    navLinks.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Buka menu");
            document.body.classList.remove("menu-open");
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navLinks.classList.contains("is-open")) {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Buka menu");
            document.body.classList.remove("menu-open");
            menuToggle.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 700) {
            navLinks.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Buka menu");
            document.body.classList.remove("menu-open");
        }
    });
}

function showPage(id) {
    const target = document.getElementById(id);
    const activeSection = target && target.closest("main > section");

    if (!activeSection) {
        return false;
    }

    pageSections.forEach((section) => {
        section.hidden = section !== activeSection;
    });

    document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
        if (link.getAttribute("href") === `#${activeSection.id}`) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });

    return true;
}

function showPageFromHash() {
    const requestedPage = window.location.hash.slice(1) || "Home";
    if (!showPage(requestedPage)) {
        showPage("Home");
    }
}

document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
        return;
    }

    const link = event.target.closest('.nav-links a[href^="#"]');
    if (!link) {
        return;
    }

    const pageId = link.getAttribute("href").slice(1);
    if (showPage(pageId)) {
        event.preventDefault();
        if (window.location.hash !== `#${pageId}`) {
            window.history.pushState(null, "", `#${pageId}`);
        }
        window.scrollTo(0, 0);
    }
});

window.addEventListener("popstate", showPageFromHash);
showPageFromHash();

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
}