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

const contactRequestForm = document.querySelector("#contact-request-form");

if (contactRequestForm) {
  const notice = document.querySelector("#contact-form-notice");
  const submitButton = contactRequestForm.querySelector('button[type="submit"]');

  contactRequestForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactRequestForm);
    formData.append("access_key", "688934c4-252c-41c4-9c78-b89c0e72a1c7");
    formData.append("subject", "New inquiry");

    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;
    notice.textContent = "";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData
      });
      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success !== false) {
        notice.textContent = "Thank you! Your request has been sent.";
        contactRequestForm.reset();
      } else {
        notice.textContent = "Error: " + (data.message || "Could not send your request.");
      }
    } catch (error) {
      notice.textContent = "Something went wrong. Please try again.";
    } finally {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}