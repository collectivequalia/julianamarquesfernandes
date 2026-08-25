document.addEventListener("DOMContentLoaded", () => {
  const VIDEOS = [
    "em-pressao-trailer",
    "enquanto-espero-trailer",
    "na-ausencia-trailer",
    "site-trailer",
    "revoada-trailer",
    "sonata-trailer",
    "home-trailer",
    "work-trailer",
  ];

  const video = document.querySelector(".home-image video");
  if (!video) return;

  const videoDir = video.getAttribute("src").replace(/[^/]*$/, "");
  const posterDir = video.getAttribute("poster").replace(/[^/]*$/, "");
  const pick = VIDEOS[Math.floor(Math.random() * VIDEOS.length)];

  video.setAttribute("src", videoDir + pick + ".mp4");
  video.setAttribute("poster", posterDir + pick + "-poster.jpg");

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
