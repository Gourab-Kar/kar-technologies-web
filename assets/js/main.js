const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window) {
  const sections = document.querySelectorAll("main > section");
  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
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