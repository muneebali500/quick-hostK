// Sidebar functionality with close button on mobile view
function initializeSidebar() {
  const mobileToggle = document.querySelector(".mobile-toggle");
  const sidebar = document.querySelector(".sidebar");
  const sidebarClose = document.querySelector(".sidebar-close");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav .nav-link");

  // Mobile toggle
  if (mobileToggle) {
    mobileToggle.addEventListener("click", function () {
      sidebar.classList.add("show");
    });
  }

  // Close button
  if (sidebarClose) {
    sidebarClose.addEventListener("click", function () {
      sidebar.classList.remove("show");
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      if (!sidebar.contains(e.target) && !mobileToggle?.contains(e.target)) {
        sidebar.classList.remove("show");
      }
    }
  });

  // Handle escape key to close sidebar
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar.classList.contains("show")) {
      sidebar.classList.remove("show");
    }
  });
}

initializeSidebar();

/////////////////////// SIDEBAR SUBMENU FUNCTIONALITY
function initializeSubmenus() {
  // Select all elements with the 'data-submenu' attribute.
  const submenuTriggers = document.querySelectorAll("[data-submenu]");

  submenuTriggers.forEach((trigger) => {
    // Use a single event listener for the entire document and
    // use event delegation to handle clicks on the triggers.
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const submenu = event.currentTarget.nextElementSibling;
      const arrow = event.currentTarget.querySelector(".submenu-arrow");
      const isOpen = submenu.classList.contains("show");

      // Close all open submenus.
      closeAllSubmenus();

      // Toggle the clicked submenu.
      if (!isOpen) {
        submenu.classList.add("show");
        arrow.classList.add("rotated");
      }
    });
  });

  // Close submenus when clicking outside the sidebar.
  document.addEventListener("click", (event) => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar && !sidebar.contains(event.target)) {
      closeAllSubmenus();
    }
  });
}

function closeAllSubmenus() {
  const openSubmenus = document.querySelectorAll(".submenu.show");
  const rotatedArrows = document.querySelectorAll(".submenu-arrow.rotated");

  openSubmenus.forEach((menu) => menu.classList.remove("show"));
  rotatedArrows.forEach((arrow) => arrow.classList.remove("rotated"));
}

initializeSubmenus();

// Configure Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animation = element.getAttribute("data-animate");
        const delay = element.getAttribute("data-animate-delay") || 0;

        // Apply animation classes after delay
        setTimeout(() => {
          element.classList.add(
            "animate__animated",
            `animate__${animation}`,
            "animated"
          );
        }, delay);

        // Stop observing after animation triggers
        observer.unobserve(element);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px", // Trigger when 50px from bottom of viewport
  }
);

// Observe all elements with data-animate attribute
document.querySelectorAll("[data-animate]").forEach((element) => {
  observer.observe(element);
});
