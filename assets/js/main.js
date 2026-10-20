const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const sections = Array.from(document.querySelectorAll("main > section"));
  const pendingSections = new Set();
  let nextSectionIndex = 0;
  let revealTimer;

  const revealNextSection = () => {
    const section = sections[nextSectionIndex];
    if (!section || !pendingSections.has(section)) {
      revealTimer = undefined;
      return;
    }

    pendingSections.delete(section);
    section.classList.add("is-visible");
    nextSectionIndex += 1;
    revealTimer = window.setTimeout(revealNextSection, 300);
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    const intersectingIndices = entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => sections.indexOf(entry.target));

    if (intersectingIndices.length === 0) return;

    const highestIntersectingIndex = Math.max(...intersectingIndices);
    for (let index = nextSectionIndex; index <= highestIntersectingIndex; index += 1) {
      pendingSections.add(sections[index]);
      observer.unobserve(sections[index]);
    }

    if (revealTimer === undefined) revealNextSection();
  }, { rootMargin: "0px 0px -5% 0px", threshold: 0.12 });

  sections.forEach((section) => {
    section.classList.add("section-reveal");
    sectionObserver.observe(section);
  });
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
  const status = carousel.querySelector("[data-slide-status]");
  let activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.hidden = slideIndex !== activeIndex;
    });
    status.textContent = `Screen ${activeIndex + 1} of ${slides.length}`;
  };

  carousel.querySelector("[data-previous]").addEventListener("click", () => {
    showSlide(activeIndex - 1);
  });

  carousel.querySelector("[data-next]").addEventListener("click", () => {
    showSlide(activeIndex + 1);
  });
});