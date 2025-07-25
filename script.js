(function () {
  let totalFlowers = 1; // Empezamos con 1 (el girasol inicial del HTML)
  const maxFlowers = 19;

  const growGarden = (event) => {
    // Verificar si ya llegamos al límite
    if (totalFlowers >= maxFlowers) {
      console.log('¡Máximo de girasoles alcanzado!');
      return;
    }

    // Obtener las coordenadas del clic
    const clickX = event.clientX;
    const clickY = event.clientY;

    // Convertir a porcentajes de la ventana
    const leftPercent = (clickX / window.innerWidth) * 100;
    const topPercent = (clickY / window.innerHeight) * 100;

    function getRandomArbitrary(min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    }

    // Crear un solo girasol en la posición del clic
    let flwr = document.createElement('div');
    let dim = getRandomArbitrary(30, 80);

    flwr.classList.add('sunflwr');
    flwr.innerHTML = `<div class="sunflwr__center"></div>
                        <div class="sunflwr__pedal--1"></div>
                        <div class="sunflwr__pedal--2"></div>
                        <div class="sunflwr__pedal--3"></div>
                        <div class="sunflwr__pedal--4"></div>
                        <div class="sunflwr__pedal--5"></div>
                        <div class="sunflwr__pedal--6"></div>
                        <div class="sunflwr__pedal--7"></div>
                        <div class="sunflwr__pedal--8"></div>
                        <div class="sunflwr__pedal--9"></div>
                        <div class="sunflwr__pedal--10"></div>
                        <div class="sunflwr__pedal--11"></div>
                        <div class="sunflwr__pedal--12"></div>`;

    // Posicionar el girasol donde se hizo clic
    // Ajustar para que el centro del girasol esté en el punto de clic
    flwr.style.position = 'absolute';
    flwr.style.left = `${leftPercent}vw`;
    flwr.style.top = `${topPercent}vh`;
    flwr.style.transform = 'translate(-50%, -50%)'; // Centrar en el punto de clic
    flwr.style.height = `${dim}vmin`;
    flwr.style.width = `${dim}vmin`;
    flwr.style.zIndex = 100 - dim;
    flwr.style.filter = `saturate(${getRandomArbitrary(70, 100)}%) brightness(${getRandomArbitrary(80, 150)}%)`;

    document.querySelector('body').appendChild(flwr);

    totalFlowers++;
    console.log(`Girasoles totales: ${totalFlowers}/${maxFlowers}`);
    
    // Actualizar el contador visual
    updateFlowerCounter();
    
    // Verificar si llegamos al máximo después de agregar el girasol
    if (totalFlowers >= maxFlowers) {
      showFinalScreen();
    }
  }
  
  // Función para actualizar el contador visual
  const updateFlowerCounter = () => {
    const counter = document.getElementById('flowerCounter');
    if (counter) {
      counter.textContent = `${totalFlowers}/${maxFlowers}`;
      
      // Animación de actualización
      counter.style.transform = 'scale(1.2)';
      counter.style.color = '#f2fe00';
      
      setTimeout(() => {
        counter.style.transform = 'scale(1)';
        counter.style.color = 'white';
      }, 200);
    }
  }
  
  // Función para mostrar la pantalla final
  const showFinalScreen = () => {
    setTimeout(() => {
      // Mostrar pantalla negra
      const finalScreen = document.getElementById('finalScreen');
      finalScreen.style.display = 'flex';
      finalScreen.style.opacity = '0';
      
      // Fade in de la pantalla negra
      setTimeout(() => {
        finalScreen.style.opacity = '1';
      }, 100);
      
      // Mostrar imagen después de 1.5 segundos
      setTimeout(() => {
        const finalImage = document.getElementById('finalImage');
        finalImage.style.opacity = '1';
        finalImage.style.transform = 'scale(1)';
      }, 1500);
      
      // Mostrar texto después de la imagen y empezar scroll
      setTimeout(() => {
        const finalText = document.getElementById('finalText');
        finalText.style.opacity = '1';
        finalText.style.transform = 'translateY(0)';
        
        // Iniciar el scroll automático lento
        startSlowScroll();
      }, 2500);
      
    }, 5000); // 5 segundos antes de mostrar la pantalla final
  }
  
  // Función para el scroll lento automático
  const startSlowScroll = () => {
    const scrollingText = document.getElementById('scrollingText');
    const finalText = document.getElementById('finalText');
    
    if (scrollingText && finalText) {
      // Configurar el contenedor para scroll
      finalText.style.height = '60vh';
      finalText.style.overflowY = 'hidden';
      
      // Calcular la altura total del contenido
      const totalHeight = scrollingText.scrollHeight;
      const containerHeight = finalText.clientHeight;
      const scrollDistance = totalHeight - containerHeight;
      
      if (scrollDistance > 0) {
        // Duración del scroll (30 segundos para scroll completo)
        const scrollDuration = 30000;
        const scrollStep = scrollDistance / (scrollDuration / 50); // 50ms intervals
        
        let currentScroll = 0;
        
        const scrollInterval = setInterval(() => {
          currentScroll += scrollStep;
          
          if (currentScroll >= scrollDistance) {
            currentScroll = scrollDistance;
            clearInterval(scrollInterval);
            
            // Opcional: reiniciar el scroll después de una pausa
            setTimeout(() => {
              finalText.scrollTop = 0;
              startSlowScroll();
            }, 3000);
          }
          
          finalText.scrollTop = currentScroll;
        }, 50);
      }
    }
  }

  // Función para inicializar los eventos (se ejecuta al cargar y recargar)
  const initializeEvents = () => {
    document.body.addEventListener('click', growGarden);
    
    // Manejar el audio de fondo
    const audio = document.getElementById('backgroundMusic');
    if (audio) {
      // Intentar reproducir automáticamente
      audio.play().catch(() => {
        console.log('Autoplay bloqueado. La música se reproducirá al hacer clic.');
        // Si el autoplay está bloqueado, reproducir en el primer clic
        document.body.addEventListener('click', () => {
          audio.play();
        }, { once: true });
      });
    }
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEvents);
  } else {
    initializeEvents();
  }
})();