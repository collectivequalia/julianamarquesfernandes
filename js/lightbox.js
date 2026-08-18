document.addEventListener("DOMContentLoaded", () => {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector("img");
  const galleryImgs = document.querySelectorAll(".project-gallery img");

  galleryImgs.forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;
      lightbox.classList.add("open");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("open");
    lightboxImg.src = "";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("open");
      lightboxImg.src = "";
    }
  });
});
