document.addEventListener("DOMContentLoaded", () => {
  const HORIZONTAL_VIDEOS = [
    "sinos-trailer.mp4",
    "em-pressao-trailer.mp4",
    "enquanto-espero-trailer.mp4",
    "na-ausencia-trailer.mp4",
    "site-trailer.mp4",
  ];

  const video = document.querySelector(".home-image video, .work-video video");
  if (!video) return;

  const currentSrc = video.getAttribute("src");
  const dir = currentSrc.slice(0, currentSrc.lastIndexOf("/") + 1);
  const pick = HORIZONTAL_VIDEOS[Math.floor(Math.random() * HORIZONTAL_VIDEOS.length)];

  video.setAttribute("src", dir + pick);

  // Some browsers don't reliably resume autoplay just from the src
  // attribute changing — force it, redundantly, at every point the
  // browser might be ready (calling play() again once already
  // playing is a harmless no-op).
  const tryPlay = () => video.play().catch(() => {});
  video.load();
  tryPlay();
  video.addEventListener("loadedmetadata", tryPlay);
  video.addEventListener("canplay", tryPlay);
});
