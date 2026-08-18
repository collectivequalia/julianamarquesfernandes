document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const summary = item.querySelector("summary");
    const content = item.querySelector(".accordion-content");

    summary.addEventListener("click", (e) => {
      e.preventDefault();

      const isOpen = item.hasAttribute("open");

      items.forEach((other) => {
        if (other !== item && other.hasAttribute("open")) {
          const otherContent = other.querySelector(".accordion-content");
          otherContent.style.maxHeight = otherContent.scrollHeight + "px";

          requestAnimationFrame(() => {
            otherContent.style.maxHeight = "0px";
          });

          setTimeout(() => other.removeAttribute("open"), 300);
        }
      });

      if (isOpen) {
        content.style.maxHeight = content.scrollHeight + "px";

        requestAnimationFrame(() => {
          content.style.maxHeight = "0px";
        });

        setTimeout(() => item.removeAttribute("open"), 300);
      } else {
        item.setAttribute("open", "true");
        content.style.maxHeight = "0px";

        requestAnimationFrame(() => {
          content.style.maxHeight = content.scrollHeight + "px";
        });
      }
    });
  });
});
