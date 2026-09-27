// Minimal navigation behavior for the starter.
// No framework required.

const toggle = document.querySelector(".nav-toggle");
const collapse = document.querySelector(".nav-collapse");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const sections = navLinks
  .map(link => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

toggle?.addEventListener("click", () => {
  const isOpen = collapse.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    collapse.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

// Highlight the menu item corresponding to the section in view.
const observer = new IntersectionObserver(
  entries => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${visible.target.id}`
      );
    });
  },
  {
    root: null,
    threshold: [0.2, 0.35, 0.5, 0.65],
    rootMargin: "-20% 0px -45% 0px"
  }
);

sections.forEach(section => observer.observe(section));
