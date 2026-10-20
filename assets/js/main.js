const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion) {
  document.querySelectorAll("main > h1, main > section").forEach((section, index) => {
    section.style.setProperty("--reveal-delay", `${index * 300}ms`);
    section.classList.add("page-reveal");
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