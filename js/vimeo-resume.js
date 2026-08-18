/* Handles every Vimeo-embedded trailer on the page (there's ever only
   one, but this stays generic): sizes the iframe to cover its box
   (same as object-fit:cover would for a local <video>), keeps it
   hidden behind the poster until playback has actually started (to
   hide the brief internal resize/relayout flicker Vimeo's own player
   does right as it starts), and retries play() on the visitor's first
   interaction if Low Power Mode or another autoplay restriction
   blocked it outright. */
document.addEventListener("DOMContentLoaded", () => {
  const iframe = document.querySelector('iframe[src*="player.vimeo.com"]');
  if (!iframe) return;

  const container = iframe.parentElement;
  const aspect = 16 / 9;

  function resize() {
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    let w, h;
    if (cw / ch > aspect) {
      w = cw;
      h = cw / aspect;
    } else {
      h = ch;
      w = ch * aspect;
    }
    iframe.style.width = w + "px";
    iframe.style.height = h + "px";
  }

  resize();
  window.addEventListener("resize", resize);

  const script = document.createElement("script");
  script.src = "https://player.vimeo.com/api/player.js";
  script.onload = () => {
    const player = new Vimeo.Player(iframe);
    const events = ["touchstart", "click", "scroll", "keydown"];

    // Vimeo's own player does an internal resize/relayout right as it
    // starts playing, which shows up as a brief shrink-grow flicker.
    // Re-measuring right before reveal (in case the container's own
    // size drifted since the initial resize) and keeping the iframe
    // invisible until that first "play" has actually fired hides all
    // of that — it only ever happens behind the static poster.
    player.on("play", () => {
      resize();
      requestAnimationFrame(() => iframe.classList.add("is-ready"));
    });

    const resume = () => {
      player
        .getPaused()
        .then((paused) => {
          if (paused) {
            player.play().catch(() => {});
          } else {
            events.forEach((evt) => document.removeEventListener(evt, resume));
          }
        })
        .catch(() => {});
    };

    events.forEach((evt) =>
      document.addEventListener(evt, resume, { passive: true })
    );
  };
  document.head.appendChild(script);
});
