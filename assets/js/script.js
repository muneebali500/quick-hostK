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
