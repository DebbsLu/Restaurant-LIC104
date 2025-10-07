 document.addEventListener("DOMContentLoaded", () => {
  // ==================== REFERENCIAS A ELEMENTOS ====================
  const nombreInput = document.getElementById("nombre");
  const emailInput = document.getElementById("email");
  const fechaInput = document.getElementById("fecha");
  const horaInput = document.getElementById("hora");
  const mesas = document.querySelectorAll(".rectanguloD, .rectanguloD2, .rectanguloD2.rotada");
  const botonEnviar = document.querySelector(".botonFormD");

  const notiK = document.querySelector(".notiK");
  const mensajeK = document.getElementById("mensajeK");
  const cerrarNoti = document.getElementById("cerrarNoti");

  // Crear contenedor para botones adicionales
  const accionContainer = document.createElement("div");
  accionContainer.classList.add("accionBotones");
  notiK.insertAdjacentElement("afterend", accionContainer);

  let botonEliminar, botonEditar;

  // ==================== FUNCIONES DE NOTIFICACIÓN ====================
  const mostrarNotificacion = (mensaje, esError = false) => {
    mensajeK.textContent = mensaje;
    mensajeK.style.color = esError ? "red" : "#765437";
    notiK.classList.remove("hide");
    notiK.classList.add("show");
  };

  const ocultarNotificacion = () => {
    notiK.classList.remove("show");
    notiK.classList.add("hide");
  };

  cerrarNoti.addEventListener("click", ocultarNotificacion);

  // ==================== LOCAL STORAGE ====================
  const guardarDatos = () => {
    const reserva = {
      nombre: nombreInput.value.trim(),
      email: emailInput.value.trim(),
      fecha: fechaInput.value,
      hora: horaInput.value,
      mesa: localStorage.getItem("mesaSeleccionada") || null
    };
    localStorage.setItem("reservaRestaurante", JSON.stringify(reserva));
  };

  const borrarDatos = () => {
    localStorage.removeItem("reservaRestaurante");
    localStorage.removeItem("mesaSeleccionada");
  };

  const cargarDatos = () => {
    const data = JSON.parse(localStorage.getItem("reservaRestaurante"));
    if (data) {
      nombreInput.value = data.nombre || "";
      emailInput.value = data.email || "";
      fechaInput.value = data.fecha || "";
      horaInput.value = data.hora || "";

      if (data.mesa) {
        const mesaGuardada = document.querySelector(`[data-mesa="${data.mesa}"]`);
        if (mesaGuardada) {
          seleccionarMesa(mesaGuardada);
        }
      }

      // Mostrar notificación solo si hay datos completos
      if (data.fecha && data.hora && data.mesa) {
        mostrarNotificacion(`Su reserva está para el día ${data.fecha} a las ${data.hora}, mesa ${data.mesa}`);
        mostrarBotonesAccion(data.fecha);
        botonEnviar.style.display = "none";
      }
    }
  };

  // ==================== RESTRICCIÓN DE HORAS (Flatpickr) ====================
  let horaPicker;

  flatpickr(fechaInput, {
    dateFormat: "Y-m-d",
    minDate: "today",
    clickOpens: true, // fuerza la apertura incluso en móviles
  disableMobile: true, // 
    onChange: function(selectedDates) {
      if (!selectedDates.length) {
        horaInput.disabled = true;
        if (horaPicker) horaPicker.clear();
        return;
      }

      const dia = selectedDates[0].getDay();
      horaInput.disabled = false;

      if (horaPicker) horaPicker.destroy();

      let minHora = "17:00";
      let maxHora = "23:00";

      switch (dia) {
        case 0: maxHora = "22:00"; break;
        case 5:
        case 6: maxHora = "01:00"; break;
        default: maxHora = "23:00"; break;
      }

      horaPicker = flatpickr(horaInput, {
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true,
        minTime: minHora,
        maxTime: maxHora,
        defaultHour: 17,
        defaultMinute: 0,
         disableMobile: true // <- agrega esto también
        
      });
    }
  });

  // ==================== SELECCIÓN DE MESAS ====================
  const colorDisponible = "#788775";
  const colorEspera = "#FDD17A";
  const colorOcupada = "#765437";

  const seleccionarMesa = (mesaDiv) => {
    document.querySelectorAll(".circleFondo, .circleFondo2").forEach(c => {
      c.style.backgroundColor = colorDisponible;
      const dentro = c.querySelector(".circleDentroBorde, .circleDentroBorde2");
      if (dentro) dentro.style.backgroundColor = colorDisponible;
    });

    const circle = mesaDiv.querySelector(".circleFondo, .circleFondo2");
    if (circle) {
      circle.style.backgroundColor = colorEspera;
      const dentro = circle.querySelector(".circleDentroBorde, .circleDentroBorde2");
      if (dentro) dentro.style.backgroundColor = colorEspera;
    }

    const mesaTexto = mesaDiv.querySelector("p") ? mesaDiv.querySelector("p").textContent : "Sin nombre";
    localStorage.setItem("mesaSeleccionada", mesaTexto);
  };

  mesas.forEach((mesa) => {
    const textoMesa = mesa.querySelector("p") ? mesa.querySelector("p").textContent : "";
    if (textoMesa) mesa.setAttribute("data-mesa", textoMesa);
    mesa.addEventListener("click", () => seleccionarMesa(mesa));
  });

  // ==================== BOTONES DE ACCIÓN ====================
  const mostrarBotonesAccion = (fechaReserva) => {
    accionContainer.innerHTML = ""; // limpiar

    const hoy = new Date();
    const fechaReservaObj = new Date(fechaReserva);
    const diffDias = Math.ceil((fechaReservaObj - hoy) / (1000*60*60*24));

    // Solo se permite Editar/Eliminar 2 días antes o más
    const habilitado = diffDias >= 2;

    botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "botonFormD";
    botonEliminar.disabled = !habilitado;

    botonEditar = document.createElement("button");
    botonEditar.textContent = "Editar";
    botonEditar.className = "botonFormD";
    botonEditar.disabled = !habilitado;

    accionContainer.appendChild(botonEditar);
    accionContainer.appendChild(botonEliminar);

    // EVENTOS
    botonEliminar.addEventListener("click", () => {
      borrarDatos();
      limpiarFormulario();
      accionContainer.innerHTML = "";
      botonEnviar.style.display = "block";
      mostrarNotificacion("Reserva eliminada correctamente.");


                  // Limpiar cualquier timeout previo para evitar conflictos
    if (window.notificacionTimeout) clearTimeout(window.notificacionTimeout);

    // Ocultar la notificación después de 10 segundos
    window.notificacionTimeout = setTimeout(() => {
        ocultarNotificacion();
        window.notificacionTimeout = null;
    }, 10000); // 50000ms = 10s

    });

    botonEditar.addEventListener("click", () => {

          // Ocultar la notificación
  ocultarNotificacion();

  // Cargar datos al formulario
  const data = JSON.parse(localStorage.getItem("reservaRestaurante"));
  if (data) {
    nombreInput.value = data.nombre || "";
    emailInput.value = data.email || "";
    fechaInput.value = data.fecha || "";
    horaInput.value = data.hora || "";
    horaInput.disabled = false;

    if (data.mesa) {
      const mesaGuardada = document.querySelector(`[data-mesa="${data.mesa}"]`);
      if (mesaGuardada) seleccionarMesa(mesaGuardada);
    }
  }

  accionContainer.innerHTML = "";
  botonEnviar.style.display = "block";
    });
  };

  const limpiarFormulario = () => {
    nombreInput.value = "";
    emailInput.value = "";
    fechaInput.value = "";
    horaInput.value = "";
    horaInput.disabled = true;

    document.querySelectorAll(".circleFondo, .circleFondo2").forEach(c => {
      c.style.backgroundColor = colorDisponible;
      const dentro = c.querySelector(".circleDentroBorde, .circleDentroBorde2");
      if (dentro) dentro.style.backgroundColor = colorDisponible;
    });

    localStorage.removeItem("mesaSeleccionada");
  };

  // ==================== EVENTO BOTÓN ENVIAR ====================
  botonEnviar.addEventListener("click", (e) => {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const email = emailInput.value.trim();
    const fecha = fechaInput.value;
    const hora = horaInput.value;
    const mesa = localStorage.getItem("mesaSeleccionada");

    if (!nombre || !email || !fecha || !hora || !mesa) {
      mostrarNotificacion("No se ha podido enviar la reserva. Complete todos los campos.", true);
      return;
    }

    const data = { nombre, email, fecha, hora, mesa };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
    .then(res => {
      if (!res.ok) throw new Error("Error en la solicitud");
      return res.json();
    })
    .then(() => {
      guardarDatos();
      mostrarNotificacion(`Su reserva está para el día ${fecha} a las ${hora}, mesa ${mesa}`);

      // Cambiar color de mesa a ocupada
      const mesaDiv = document.querySelector(`[data-mesa="${mesa}"]`);
      if (mesaDiv) {
        const circle = mesaDiv.querySelector(".circleFondo, .circleFondo2");
        if (circle) {
          circle.style.backgroundColor = colorOcupada;
          const dentro = circle.querySelector(".circleDentroBorde, .circleDentroBorde2");
          if (dentro) dentro.style.backgroundColor = colorOcupada;
        }
      }

      // Ocultar botón enviar y mostrar botones Editar/Eliminar
      botonEnviar.style.display = "none";
      limpiarFormulario();
      mostrarBotonesAccion(fecha);
    })
    .catch(() => mostrarNotificacion("No se ha podido enviar la reserva.", true));
  });

  // ==================== CARGAR DATOS AL INICIAR ====================
  cargarDatos();
});
