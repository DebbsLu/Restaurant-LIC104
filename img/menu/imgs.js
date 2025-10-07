document.addEventListener("DOMContentLoaded", () => {
  fetch("img/menu/Imagenesmenu.json")
    .then(res => res.json())
    .then(datos => {

console.log("✅ JSON cargado:", datos);
      console.log("Platos:", datos.platos);
      console.log("Bebidas:", datos.bebidas);

      // Mostrar platos
      mostrarSeccion("menu-platos", datos.platos);
      // Mostrar bebidas
    })
    .catch(err => console.error("Error al cargar el JSON:", err));
});

// Función para crear los elementos
function mostrarSeccion(idContenedor, elementos) {
  const contenedor = document.getElementById(idContenedor);
  contenedor.innerHTML = ""; // Limpia por si hay algo

  elementos.forEach(item => {
    const col = document.createElement("div");
    col.classList.add("col-4", "text-center");

    const img = document.createElement("img");
    img.src = item.imagen;
    img.alt = item.nombre;
    img.classList.add("img-fluid");

    const nombre = document.createElement("h3");
    const descripcion = document.createElement("p")
    const precio = document.createElement("h3")
    descripcion.textContent = item.descripcion;
    nombre.textContent = item.nombre;
    precio.textContent = item.precio;

    col.appendChild(img);
    col.appendChild(nombre);
    col.appendChild(descripcion);
    col.appendChild(precio);
    contenedor.appendChild(col);
  });
}

// Código para el carrusel con el json
document.addEventListener("DOMContentLoaded", () => {
  fetch("img/menu/Imagenesmenu.json")
    .then(res => res.json())
    .then(datos => {
      const platos = datos.platos;
      const contenedor = document.getElementById("carousel-inner");

      

      platos.forEach((plato, index) => {
        const item = document.createElement("div");
        item.classList.add("carousel-item");
        if (index === 0) item.classList.add("active"); // primer elemento activo

        item.innerHTML = `
          <h3>${plato.nombre}</h3>
          <img src="${plato.imagen}" class="d-block w-100" alt="${plato.nombre}">
          <p>${plato.descripcion}</p>
          <h3>${plato.precio}</h3>
        `;

        contenedor.appendChild(item);
      });
    })
    .catch(err => console.error("Error cargando los platos:", err));
});