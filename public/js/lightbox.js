// public/js/lightbox.js

let currentImages = [];
let currentIndex = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

function openLightbox(images, index) {
  currentImages = images;
  currentIndex = index;

  lightboxImg.src = currentImages[currentIndex];

  lightbox.style.display = "flex";
  document.body.style.overflow = "hidden"; // stop background scroll
}

function closeLightbox(e) {
  // If user clicks the dark backdrop (not the image/buttons), close
  if (!e || e.target === lightbox) {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    document.body.style.overflow = "";
  }
}

function nextImage() {
  if (!currentImages.length) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

function prevImage() {
  if (!currentImages.length) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  lightboxImg.src = currentImages[currentIndex];
}

// Attach click handlers to all modal thumbnails
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".modal-gallery").forEach((gallery) => {
    const imgs = Array.from(gallery.querySelectorAll("img"));
    const sources = imgs.map((img) => img.src);

    imgs.forEach((img, index) => {
      img.addEventListener("click", () => openLightbox(sources, index));
    });
  });

  // Close on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      closeLightbox();
    }

    // Optional: arrow key navigation
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    }
  });
});

// Expose functions because your buttons call them inline
window.closeLightbox = closeLightbox;
window.nextImage = nextImage;
window.prevImage = prevImage;
