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


// Slider up
document.querySelector('.slide--move-up').addEventListener('click', function() {
  document.querySelector('.slide--content').classList.toggle('slid-up');
});



//  That sound
document.addEventListener('DOMContentLoaded', function() {
  const gearSound = document.getElementById('gearSound');
  const toggleBtn = document.getElementById('toggleBtn');

  // 1. Configuración inicial del audio
  function setupAudio() {
    // Esto es esencial para iOS
    gearSound.setAttribute('playsinline', '');
    gearSound.setAttribute('webkit-playsinline', '');
    gearSound.preload = 'auto';
    
    // Precargar el sonido en iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      gearSound.load();
    }
  }

  // 2. Función mejorada para reproducir sonido
  function playGearSound() {
    // Reiniciar el audio si ya se estaba reproduciendo
    gearSound.currentTime = 0;
    
    // Solución especial para iOS
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
      // Crear contexto de audio (requerido en iOS)
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Algunos iOS requieren esto para habilitar el audio
      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          gearSound.play().catch(e => console.log("Error en iOS:", e));
        });
      } else {
        gearSound.play().catch(e => console.log("Error en iOS:", e));
      }
    } 
    // Para otros dispositivos
    else {
      gearSound.play().catch(e => console.log("Error de audio:", e));
    }
  }

  // 3. Configurar el audio al cargar
  setupAudio();

  // 4. Manejador de eventos para el botón
  if (toggleBtn) {
    // Usamos 'click' para desktop y 'touchstart' para móviles
    toggleBtn.addEventListener('click', playGearSound);
    toggleBtn.addEventListener('touchstart', playGearSound);
  }
});