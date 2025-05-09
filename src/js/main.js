// Rotación aleatoria de imágenes en un grid
document.addEventListener('DOMContentLoaded', function() {
    const gridItems = document.querySelectorAll('.grid-item');
    
    gridItems.forEach(item => {
      const links = item.querySelectorAll('a');
      if (links.length < 2) return; // No animar si solo hay una imagen
      
      // Activar una imagen aleatoria al inicio
      const randomStartIndex = Math.floor(Math.random() * links.length);
      links.forEach(link => link.classList.remove('active'));
      links[randomStartIndex].classList.add('active');
      
      // Iniciar rotación aleatoria para este item
      startRandomRotation(item);
    });
    
    function startRandomRotation(item) {
      const links = item.querySelectorAll('a');
      const linkCount = links.length;
      let currentIndex = Array.from(links).findIndex(link => link.classList.contains('active'));
      
      // Intervalo aleatorio entre 2 y 8 segundos
      const getRandomInterval = () => Math.random() * 6000 + 2000;
      
      function rotateImage() {
        // Ocultar imagen actual
        links[currentIndex].classList.remove('active');
        
        // Seleccionar nueva imagen (asegurando que no sea la misma)
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * linkCount);
        } while (newIndex === currentIndex && linkCount > 1);
        
        currentIndex = newIndex;
        
        // Mostrar nueva imagen
        links[currentIndex].classList.add('active');
        
        // Programar próximo cambio con nuevo intervalo aleatorio
        setTimeout(rotateImage, getRandomInterval());
      }
      
      // Iniciar rotación después de un retraso inicial aleatorio
      setTimeout(rotateImage, getRandomInterval());
    }
  });



  
  document.addEventListener('DOMContentLoaded', () => {
    const btn       = document.querySelector('.slide--move-up');
    const content   = document.querySelector('.slide--content');
  
    // Función única de play, con reintento y un solo ctx
  
    // Listener que hace toggle + sonido en la misma interacción
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        content.classList.toggle('slid-up');

      });
    }
  });
  