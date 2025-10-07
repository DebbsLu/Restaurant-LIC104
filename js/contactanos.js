document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contactoK form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
console.log("Submit atrapado!"); // <-- si no aparece, el listener no está funcionando
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        const datos = { nombre, apellido, correo, mensaje, fecha: new Date().toISOString() };

        const notiK = document.querySelector('.notiK');
        const mensajeK = document.getElementById('mensajeK');

        try {
            let mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
            mensajes.push(datos);
            localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));
            form.reset();
            if (mensajeK) mensajeK.textContent = "Se ha enviado correctamente su mensaje...";
        } catch (error) {
            console.error("Error al guardar el mensaje:", error);
            if (mensajeK) mensajeK.textContent = "Contacta a este número 7584-0521 para ver tu problema...";
        }

        // Mostrar notificación con animación
        if (notiK) {
            notiK.classList.remove('hide');
            notiK.classList.add('show');
        }

        // Ocultar automáticamente después de 5 segundos
        setTimeout(() => {
            if (notiK) {
                notiK.classList.remove('show');
                notiK.classList.add('hide');
                // Esperar a que termine la transición antes de ocultar visualmente
                setTimeout(() => notiK.style.display = 'none', 400);
            }
        }, 5000);
    });

    // Botón cerrar
    const closeBtn = document.querySelector('.notiK button');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            const notiK = document.querySelector('.notiK');
            if (notiK) {
                notiK.classList.remove('show');
                notiK.classList.add('hide');
                setTimeout(() => notiK.style.display = 'none', 400);
            }
        });
    }
});
