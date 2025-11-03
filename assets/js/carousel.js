document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("offers-carousel");
  if (!carousel) return;

  const viewport = carousel.querySelector(".viewport");
  const track = carousel.querySelector(".track");
  const slides = Array.from(track.children);
  const dotsWrap = carousel.querySelector(".dot-wrapper");

  const isRTL = getComputedStyle(carousel).direction === "rtl";

  let visible = 1,
    slideWidth = 0,
    index = 0,
    maxIndex = 0;

  function getVisible() {
    return window.innerWidth >= 992 ? 2 : 1;
  }

  function setWidths() {
    visible = getVisible();
    slideWidth = viewport.clientWidth / visible;
    slides.forEach((s) => (s.style.width = slideWidth + "px"));
    maxIndex = Math.max(0, slides.length - visible);
    index = Math.min(index, maxIndex);
    update();
    buildDots();
  }

  function update() {
    const offset = index * slideWidth;
    // LTR: move left (negative). RTL: move right (positive).
    track.style.transform = `translateX(${isRTL ? offset : -offset}px)`;
    highlightDot();
  }

  function buildDots() {
    dotsWrap.innerHTML = "";
    const pages = maxIndex + 1;
    for (let i = 0; i < pages; i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dot";
      dot.setAttribute("aria-label", `اذهب إلى الصفحة ${i + 1}`);
      dot.addEventListener("click", () => {
        index = i;
        update();
      });
      dotsWrap.appendChild(dot);
    }
    highlightDot();
  }

  function highlightDot() {
    dotsWrap
      .querySelectorAll(".dot")
      .forEach((d, i) => d.classList.toggle("active", i === index));
  }

  // (optional) swipe support
  let startX = null;
  viewport.addEventListener(
    "touchstart",
    (e) => {
      startX = e.touches[0].clientX;
    },
    { passive: true }
  );
  viewport.addEventListener(
    "touchend",
    (e) => {
      if (startX == null) return;
      const dx = (e.changedTouches?.[0]?.clientX ?? startX) - startX;
      if (Math.abs(dx) > 40) {
        // in RTL, a left swipe should go to the next page (index+1)
        const dir = dx < 0 ? 1 : -1;
        index = Math.max(0, Math.min(maxIndex, index + dir));
        update();
      }
      startX = null;
    },
    { passive: true }
  );

  let t;
  window.addEventListener("resize", () => {
    clearTimeout(t);
    t = setTimeout(setWidths, 120);
  });

  setWidths();
});
