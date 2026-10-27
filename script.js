console.log("JavaScript connected");

const themeButton = document.getElementById("themeToggle");
themeButton.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  themeButton.setAttribute(
    "aria-label",
    isDark ? "Switch to light mode" : "Switch to dark mode"
  );
});

(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  function setActiveLink() {
    const fromTop = window.scrollY + 120;
    let currentId = "";

    sections.forEach(function (section) {
      if (section.offsetTop <= fromTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute("href");
      link.classList.toggle("is-active", href === "#" + currentId);
    });
  }

  window.addEventListener("scroll", setActiveLink, { passive: true });
  setActiveLink();

  const searchForm = document.querySelector(".project-search");
  const searchInput = document.getElementById("project-search");
  const projectCards = document.querySelectorAll(".project-card");
  const emptyResults = document.getElementById("project-search-empty");

  function filterProjects() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    let visibleCount = 0;

    projectCards.forEach(function (card) {
      const searchable = (
        (card.getAttribute("data-search") || "") +
        " " +
        card.textContent
      ).toLowerCase();
      const isMatch = query === "" || searchable.indexOf(query) !== -1;
      card.hidden = !isMatch;
      if (isMatch) {
        visibleCount += 1;
      }
    });

    if (emptyResults) {
      emptyResults.hidden = visibleCount !== 0;
    }
  }

  if (searchForm) {
    searchForm.addEventListener("submit", function (event) {
      event.preventDefault();
      filterProjects();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterProjects);
  }

  document.querySelectorAll(".project-unavailable").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const card = link.closest(".project-card");
      const error = card ? card.querySelector(".project-error") : null;
      if (!error) {
        return;
      }
      error.hidden = false;
      clearTimeout(error.hideTimer);
      error.hideTimer = setTimeout(function () {
        error.hidden = true;
      }, 3500);
    });
  });
})();
