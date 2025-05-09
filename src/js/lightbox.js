let lightboxInitialized = false;

function initLightbox() {
  if (!lightboxInitialized) {
    baguetteBox.run('.gallery', {
      buttons: false,
      captions: true,
      bodyClass: "lightbox--open",
      async: true,
      closeX: '<svg width="20" height="20"><g stroke="rgb(160,160,160)" stroke-width="4"><line x1="5" y1="5" x2="20" y2="20"></line><line x1="5" y1="20" x2="20" y2="5"></line></g></svg>'
    });
    lightboxInitialized = true;
  }
}

// Llamar después de cargar contenido dinámico
initLightbox();