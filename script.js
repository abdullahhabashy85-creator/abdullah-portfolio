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

document.addEventListener("DOMContentLoaded", function () {
  /* ========================================
     CREATE LOADING SCREEN
  ======================================== */

  const loader = document.createElement("div");
  loader.className = "site-loader";

  loader.innerHTML = `
    <div class="loader-content">
      <img
        class="loader-logo"
        src="favicon.png"
        alt="Abdullah Habashy Logo"
      >

      <p class="loader-name">
        Abdullah Habashy
      </p>

      <div class="loader-track">
        <div class="loader-bar"></div>
      </div>
    </div>
  `;

  document.body.prepend(loader);

  window.addEventListener("load", function () {
    setTimeout(function () {
      loader.classList.add("loader-hidden");
    }, 450);

    setTimeout(function () {
      loader.remove();
    }, 1100);
  });


  /* ========================================
     CREATE SCROLL PROGRESS BAR
  ======================================== */

  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";

  document.body.appendChild(progressBar);

  function updateScrollProgress() {
    const scrollTop =
      window.scrollY ||
      document.documentElement.scrollTop;

    const scrollHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    const progress =
      scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
  );

  updateScrollProgress();


  /* ========================================
     CREATE BACK TO TOP BUTTON
  ======================================== */

  const backToTop = document.createElement("button");

  backToTop.className = "back-to-top";
  backToTop.type = "button";
  backToTop.setAttribute(
    "aria-label",
    "Back to top"
  );

  backToTop.innerHTML = "↑";

  document.body.appendChild(backToTop);

  function updateBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  }

  window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
  );

  backToTop.addEventListener(
    "click",
    function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  );

  updateBackToTop();


  /* ========================================
     ALTERNATING DASHBOARD IMAGES
  ======================================== */

  const dashboardImages =
    document.querySelectorAll(
      ".case-study-image"
    );

  dashboardImages.forEach(
    function (image, index) {
      image.classList.remove(
        "reveal",
        "reveal-scale",
        "reveal-left",
        "reveal-right"
      );

      if (index % 2 === 0) {
        image.classList.add(
          "reveal-from-left"
        );
      } else {
        image.classList.add(
          "reveal-from-right"
        );
      }
    }
  );

  if (dashboardImages.length > 0) {
    const dashboardObserver =
      new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(
            function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add(
                  "is-visible"
                );

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.13,
          rootMargin:
            "0px 0px -45px 0px"
        }
      );

    dashboardImages.forEach(
      function (image) {
        dashboardObserver.observe(image);
      }
    );
  }


  /* ========================================
     AUTOMATIC NUMBER COUNTERS
  ======================================== */

  const counters =
    document.querySelectorAll(
      "[data-count]"
    );

  function animateCounter(element) {
    const target =
      Number(element.dataset.count);

    const suffix =
      element.dataset.suffix || "";

    const prefix =
      element.dataset.prefix || "";

    const decimals =
      Number(
        element.dataset.decimals || 0
      );

    const duration = 1300;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(elapsed / duration, 1);

      const easedProgress =
        1 -
        Math.pow(1 - progress, 3);

      const currentValue =
        target * easedProgress;

      element.textContent =
        prefix +
        currentValue.toLocaleString(
          "en-US",
          {
            minimumFractionDigits:
              decimals,
            maximumFractionDigits:
              decimals
          }
        ) +
        suffix;

      if (progress < 1) {
        requestAnimationFrame(
          updateCounter
        );
      }
    }

    requestAnimationFrame(updateCounter);
  }

  if (counters.length > 0) {
    const counterObserver =
      new IntersectionObserver(
        function (entries, observer) {
          entries.forEach(
            function (entry) {
              if (entry.isIntersecting) {
                animateCounter(
                  entry.target
                );

                observer.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.5
        }
      );

    counters.forEach(function (counter) {
      counter.classList.add(
        "counter-number"
      );

      counterObserver.observe(counter);
    });
  }


  /* ========================================
     PAGE TRANSITIONS
  ======================================== */

  const internalLinks =
    document.querySelectorAll(
      'a[href]:not([href^="#"]):not([target="_blank"]):not([download]):not([href^="mailto:"]):not([href^="tel:"])'
    );

  internalLinks.forEach(function (link) {
    link.addEventListener(
      "click",
      function (event) {
        const href =
          link.getAttribute("href");

        if (
          !href ||
          href.startsWith("http")
        ) {
          return;
        }

        event.preventDefault();

        document.body.classList.add(
          "page-exit"
        );

        setTimeout(function () {
          window.location.href = href;
        }, 300);
      }
    );
  });
});
