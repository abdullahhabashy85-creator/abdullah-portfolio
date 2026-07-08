const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});
const projectsCount = document.querySelectorAll(".projects-grid .project-card").length;
const projectsCountElement = document.getElementById("projects-count");

if (projectsCountElement) {
  projectsCountElement.textContent = projectsCount;
}
