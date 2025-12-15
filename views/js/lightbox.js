let gallery = [];
let currentIndex = 0;

/**
 * Click delegation
 * This catches ALL thumbnail clicks,
 * even if they appear later.
 */
document.addEventListener("click", (e) => {
  const img = e.target.closest(".modal-gallery img");
  if (!img) return;

  gallery = Array.from(document.querySelectorAll(".modal-gallery img"));
  currentIndex = gallery.indexOf(img);

  openLightbox(currentIndex);
});

function openLightbox(index) {
  currentIndex = index;

  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "flex";

  updateLightbox();
}

function closeLightbox(e) {
  if (!e || e.target.id === "lightbox") {
    document.getElementById("lightbox").style.display = "none";
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % gallery.length;
  updateLightbox();
}

function prevImage() {
  currentIndex =
    (currentIndex - 1 + gallery.length) % gallery.length;
  updateLightbox();
}

function updateLightbox() {
  document.getElementById("lightbox-img").src =
    gallery[currentIndex].src;
}
