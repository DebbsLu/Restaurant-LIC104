document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 1200,          // Duración de la animación
           easing: 'ease-in-out', // Efecto de easing
        once: false,               // Solo anima la primera vez
        mirror: false             // No anima al hacer scroll hacia arriba
    });
});


// Al cargar
anime({
  targets: '.botonK',
  translateY: [10, 0], // sube 10px y vuelve
  easing: 'easeOutQuad',
  duration: 1000
});

// Al pasar el mouse (hover)
const boton = document.querySelector('.botonK');
boton.addEventListener('mouseenter', () => {
  anime({
    targets: boton,
    translateY: -5,   // se levanta 5px
    duration: 300,
    easing: 'easeOutQuad'
  });
});
boton.addEventListener('mouseleave', () => {
  anime({
    targets: boton,
    translateY: 0,    // vuelve a su posición normal
    duration: 300,
    easing: 'easeOutQuad'
  });
});

// Función para animar elementos con Anime.js
function animarElemento(element, delay = 0) {
  anime({
    targets: element,
    opacity: [0, 1],
    translateY: [30, 0],
    delay: delay,
    duration: 800,
    easing: 'easeOutQuad'
  });
}

// Observer para animaciones al entrar en viewport
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const elemento = entry.target;
      animarElemento(elemento, elemento.dataset.delay || 0);
      observer.unobserve(elemento); // animar solo una vez
    }
  });
}, {
  threshold: 0.2 // 20% visible
});

// Animar bebidas ya existentes en HTML
document.querySelectorAll("#menu-bebidas .col-4").forEach((col, index) => {
  col.style.opacity = 0;
  col.style.transform = 'translateY(30px)';
  col.dataset.delay = index * 150;
  observer.observe(col);
});

// Seleccionamos todas las tarjetas
const tarjetas = document.querySelectorAll('.tarjeta');

tarjetas.forEach((tarjeta, index) => {
  anime({
    targets: tarjeta,
    translateY: [
      { value: -5, duration: 1000 },  // sube 10px
      { value: 0, duration: 1000 }     // baja de nuevo
    ],
    easing: 'easeInOutSine',  // movimiento suave
    loop: true,               // repetir infinitamente
    delay: index * 150        // pequeño retraso entre tarjetas para efecto escalonado
  });
});

/*texto span*/
const spans = document.querySelectorAll('.rec span');

// Hover para escritorio
spans.forEach(span => {
  span.addEventListener('mouseenter', () => {
    span.classList.add('hovered');
  });
  span.addEventListener('mouseleave', () => {
    span.classList.remove('hovered');
  });
});

// Animación al aparecer en pantalla (móvil)
const spanObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('hovered');
    } else {
      entry.target.classList.remove('hovered');
    }
  });
}, { threshold: 0.5 }); // aparece cuando 50% del elemento es visible

spans.forEach(span => spanObserver.observe(span));


/*texto titulo brillitos desa */

// Animación del texto "Desarrolladores" letra por letra
const texto = document.getElementById('texto-desarrolladores');
if(texto){
  // Separar cada letra en un span
  const letras = texto.textContent.split('');
  texto.textContent = '';
  letras.forEach(letra => {
    const span = document.createElement('span');
    span.textContent = letra;
    span.style.display = 'inline-block';
    span.style.transition = 'transform 0.3s ease'; // transición hover
    span.style.verticalAlign = 'middle';  // <-- esto mantiene todas las letras alineadas
    texto.appendChild(span);
  });

  const spansTexto = texto.querySelectorAll('span');

  // Hover para escritorio
  spansTexto.forEach(span => {
    span.addEventListener('mouseenter', () => {
      anime({
        targets: span,
        translateY: -10,
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
    span.addEventListener('mouseleave', () => {
      anime({
        targets: span,
        translateY: 0,
        duration: 300,
        easing: 'easeOutQuad'
      });
    });
  });

  // Animación al aparecer en pantalla (scroll)
  const textoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        anime({
          targets: entry.target.querySelectorAll('span'),
          translateY: [-20, 0],
          opacity: [0, 1],
          delay: anime.stagger(50),
          duration: 600,
          easing: 'easeOutQuad'
        });
        textoObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  textoObserver.observe(texto);
}


