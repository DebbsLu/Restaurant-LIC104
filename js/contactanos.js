document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contactoK form');
    if (!form) return; // Evita errores si el formulario no existe

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;

        // Crear un objeto con los datos
        const datos = {
            nombre,
            apellido,
            correo,
            mensaje,
            fecha: new Date().toISOString()
        };

        // Obtener los mensajes previos (si existen)
        let mensajes = JSON.parse(localStorage.getItem('mensajesContacto')) || [];
        mensajes.push(datos);

        // Guardar en localStorage
        localStorage.setItem('mensajesContacto', JSON.stringify(mensajes));

        // Limpiar el formulario
        form.reset();

        // Mostrar notificación
        const notiK = document.querySelector('.notiK');
        if (notiK) notiK.style.display = 'block';
    });

    // Botón para cerrar la notificación
    const closeBtn = document.querySelector('.notiK button');
    if (closeBtn) {
        closeBtn.addEventListener('click', function () {
            const notiK = document.querySelector('.notiK');
            if (notiK) notiK.style.display = 'none';
        });
    }
});