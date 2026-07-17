const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});
window.addEventListener("load", function () {
  const projectsCount = document.querySelectorAll(".project-card").length;
  const counter = document.getElementById("projects-count");

  if (counter) {
    counter.textContent = projectsCount;
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const revealGroups = [
    {
      selector: ".section-title",
      animation: "reveal-left"
    },
    {
      selector: ".hero-content",
      animation: "reveal-left"
    },
    {
      selector: ".hero-card",
      animation: "reveal-right"
    },
    {
      selector: ".card",
      animation: "reveal"
    },
    {
      selector: ".project-card",
      animation: "reveal-scale"
    },
    {
      selector: ".timeline-item",
      animation: "reveal-left"
    },
    {
      selector: ".contact-card",
      animation: "reveal-scale"
    },
    {
      selector: ".case-study-image",
      animation: "reveal-scale"
    }
  ];

  revealGroups.forEach(function (group) {
    const elements = document.querySelectorAll(group.selector);

    elements.forEach(function (element, index) {
      element.classList.add("reveal");

      if (group.animation !== "reveal") {
        element.classList.add(group.animation);
      }

      const delayNumber = (index % 4) + 1;
      element.classList.add(`reveal-delay-${delayNumber}`);
    });
  });

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -45px 0px"
    }
  );

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
});
