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

  // Detección moderna de iOS (sin usar platform)
  const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) ||
           (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));
  };

  if (toggleBtn) {
    const eventType = isIOS() ? 'touchstart' : 'click';
    
    toggleBtn.addEventListener(eventType, (e) => {
      if (isIOS()) e.preventDefault();
      
      playGearSound();
      triggerHapticFeedback();
    });
  } else {
    console.error("Element with ID 'toggleBtn' not found.");
  }

  function playGearSound() {
    if (isIOS()) {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') {
        audioContext.resume().then(() => {
          gearSound.currentTime = 0;
          gearSound.play().catch(e => console.log("iOS audio error:", e));
        });
      } else {
        gearSound.currentTime = 0;
        gearSound.play().catch(e => console.log("iOS audio error:", e));
      }
    } else {
      gearSound.currentTime = 0;
      gearSound.play().catch(e => console.log("Audio error:", e));
    }
  }

  function triggerHapticFeedback() {
    if (isIOS()) {
      // Opción 1: API de selección táctil (mejor soporte en iOS)
      if (window.Touch && window.Touch.prototype.createTouch) {
        const touch = new Touch({
          identifier: Date.now(),
          target: toggleBtn,
          clientX: 0,
          clientY: 0,
          radiusX: 10,
          radiusY: 10,
          rotationAngle: 0,
          force: 1
        });
        const touchEvent = new TouchEvent('touchstart', {
          touches: [touch],
          bubbles: true
        });
        toggleBtn.dispatchEvent(touchEvent);
      }
      // Opción 2: API de vibración (solo algunos iOS)
      else if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      // Opción 3: Feedback visual
      else {
        toggleBtn.classList.add('haptic-feedback');
        setTimeout(() => {
          toggleBtn.classList.remove('haptic-feedback');
        }, 100);
      }
    } else {
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 20, 30]);
      }
    }
  }
});