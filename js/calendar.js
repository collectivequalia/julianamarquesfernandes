document.addEventListener("DOMContentLoaded", () => {
  const preview = document.getElementById("rowPreview");
  if (!preview) return;

  const previewImg = preview.querySelector("img");
  const rows = document.querySelectorAll(".events-list li[data-img]");

  rows.forEach((row) => {
    row.addEventListener("mouseenter", () => {
      previewImg.src = row.dataset.img;
      preview.classList.add("visible");
    });

    row.addEventListener("mousemove", (e) => {
      preview.style.left = e.clientX + 24 + "px";
      preview.style.top = e.clientY + "px";
    });

    row.addEventListener("mouseleave", () => {
      preview.classList.remove("visible");
    });
  });
});
