const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth" });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const projects = document.querySelectorAll("article.project-card");
  const projectsCountElement = document.getElementById("projects-count");

  if (projectsCountElement) {
    projectsCountElement.textContent = projects.length;
  }
});
