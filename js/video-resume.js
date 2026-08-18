/* Low Power Mode (iOS/macOS Safari) can block autoplay outright, even
   for muted/playsinline video — there is no way to override that from
   script. The best available fallback: as soon as the visitor
   interacts with the page at all (tap/click/scroll/key), retry every
   autoplay video that's still paused. Runs once per interaction type,
   and stops entirely once nothing is paused anymore. */
document.addEventListener("DOMContentLoaded", () => {
  const resumeVideos = () => {
    const videos = document.querySelectorAll("video[autoplay]");
    let stillPaused = false;

    videos.forEach((video) => {
      if (video.paused) {
        video.play().catch(() => {});
        stillPaused = true;
      }
    });

    if (!stillPaused) {
      events.forEach((evt) => document.removeEventListener(evt, resumeVideos));
    }
  };

  const events = ["touchstart", "click", "scroll", "keydown"];
  events.forEach((evt) =>
    document.addEventListener(evt, resumeVideos, { passive: true })
  );
});
