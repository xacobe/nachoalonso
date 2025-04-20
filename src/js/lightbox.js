let lightboxInitialized = false;

function initLightbox() {
  if (!lightboxInitialized) {
    baguetteBox.run('.gallery');
    lightboxInitialized = true;
  }
}

// Llamar después de cargar contenido dinámico
initLightbox();

