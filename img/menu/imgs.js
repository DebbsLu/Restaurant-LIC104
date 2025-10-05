document.addEventListener("DOMContentLoaded", () => {
  fetch("img/menu/Imagenesmenu.json")
    .then(res => res.json())
    .then(datos => {
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
