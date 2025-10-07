document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        duration: 1200,          // Duración de la animación
           easing: 'ease-in-out', // Efecto de easing
        once: true,               // Solo anima la primera vez
        mirror: false             // No anima al hacer scroll hacia arriba
    });
});
