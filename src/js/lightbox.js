let lightboxInitialized = false;

function initLightbox() {
  if (!lightboxInitialized) {
    baguetteBox.run('.gallery', {
      buttons: false,
      captions: false,
      async: true
    });
    lightboxInitialized = true;
  }
}

// Llamar después de cargar contenido dinámico
initLightbox();