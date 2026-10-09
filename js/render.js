/* ============================================================
   KITTY HAIR COLOR — Render del catálogo
   Lee de data/productos.js y construye las tarjetas.
   Degradación segura: campo o imagen faltante NO rompe la vista.
   ============================================================ */

"use strict";

/** Devuelve el color de respaldo cuando falta la imagen del producto. */
function colorRespaldo(prod) {
  return /^#[0-9a-f]{6}$/i.test(prod.hex || "") ? prod.hex : "#ffbce2";
}

/** Construye el nodo de una tarjeta a partir de un producto. */
function crearTarjeta(prod) {
  const art = document.createElement("article");
  art.className = "card";
  if (prod.destacado === true) art.classList.add("card--destacada");
  art.dataset.familia = prod.familia || "";
  art.dataset.id = prod.id || "";

  /* --- Marco de imagen con respaldo por color --- */
  const marco = document.createElement("div");
  marco.className = "card__marco";
  marco.style.setProperty("--color-producto", colorRespaldo(prod));

  if (prod.imagen) {
    const img = document.createElement("img");
    img.className = "card__img";
    img.src = prod.imagen;
    img.alt = prod.nombre || "Producto";
    img.loading = "lazy";
    img.decoding = "async";
    /* Si la imagen no existe, se oculta y queda el respaldo de color */
    img.addEventListener("error", () => { img.remove(); marco.classList.add("card__marco--sin-img"); });
    marco.appendChild(img);
  } else {
    marco.classList.add("card__marco--sin-img");
  }

  /* --- Cuerpo --- */
  const cuerpo = document.createElement("div");
  cuerpo.className = "card__cuerpo";

  const nombre = document.createElement("h3");
  nombre.className = "card__nombre";
  nombre.textContent = prod.nombre || "Sin nombre";
  cuerpo.appendChild(nombre);

  const fam = (typeof FAMILIAS !== "undefined" && FAMILIAS)
    ? FAMILIAS.find(f => f.id === prod.familia)
    : null;
  if (fam) {
    const etiqueta = document.createElement("span");
    etiqueta.className = "card__familia";
    etiqueta.textContent = fam.nombre;
    cuerpo.appendChild(etiqueta);
  }

  /* Formatos disponibles: los del producto, o los generales de FORMATOS.
     (DEC-KHC-18: se muestran en cada tarjeta) */
  const disponibles = Array.isArray(prod.formatos) && prod.formatos.length
    ? prod.formatos
    : (typeof FORMATOS !== "undefined" ? FORMATOS : []);
  if (disponibles.length) {
    const cont = document.createElement("ul");
    cont.className = "card__formatos";
    disponibles.forEach(f => {
      const li = document.createElement("li");
      li.textContent = f;
      cont.appendChild(li);
    });
    cuerpo.appendChild(cont);
  }

  /* Descripción: solo si trae contenido */
  if (prod.descripcion && prod.descripcion.trim() !== "") {
    const desc = document.createElement("p");
    desc.className = "card__desc";
    desc.textContent = prod.descripcion;
    cuerpo.appendChild(desc);
  }

  /* Precio: solo si es un número válido (v1 sin precios => no se muestra) */
  if (typeof prod.precio === "number" && isFinite(prod.precio) && prod.precio > 0) {
    const precio = document.createElement("p");
    precio.className = "card__precio";
    precio.textContent = "$" + prod.precio.toLocaleString("es-CL");
    cuerpo.appendChild(precio);
  }

  art.append(marco, cuerpo);
  return art;
}

/** Pinta el catálogo completo (o filtrado) dentro del contenedor. */
function pintarCatalogo(familia) {
  const grilla = document.getElementById("grilla");
  if (!grilla) return;

  const vacio = document.getElementById("catalogo-vacio");
  const lista = (typeof PRODUCTOS !== "undefined" && Array.isArray(PRODUCTOS)) ? PRODUCTOS : [];
  const visibles = familia && familia !== "todos"
    ? lista.filter(p => p.familia === familia)
    : lista;

  grilla.textContent = "";

  /* Estado vacío: se ve bien aunque no haya productos cargados */
  if (visibles.length === 0) {
    if (vacio) vacio.hidden = false;
    return;
  }
  if (vacio) vacio.hidden = true;

  const frag = document.createDocumentFragment();
  visibles.forEach(p => frag.appendChild(crearTarjeta(p)));
  grilla.appendChild(frag);

  /* Revelado escalonado */
  const cards = grilla.querySelectorAll(".card");
  cards.forEach((c, i) => {
    c.style.setProperty("--delay", (i * 55) + "ms");
    c.classList.add("card--entra");
  });
}

/** Crea los botones de filtro a partir de FAMILIAS. */
function pintarFiltros() {
  const cont = document.getElementById("filtros");
  if (!cont || typeof FAMILIAS === "undefined") return;

  const defs = [{ id: "todos", nombre: "Todos" }, ...FAMILIAS];
  defs.forEach((f, i) => {
    const b = document.createElement("button");
    b.className = "chip";
    b.type = "button";
    b.dataset.familia = f.id;
    b.textContent = f.nombre;
    if (i === 0) b.classList.add("chip--activo");
    b.addEventListener("click", () => {
      cont.querySelectorAll(".chip").forEach(c => c.classList.remove("chip--activo"));
      b.classList.add("chip--activo");
      pintarCatalogo(f.id);
    });
    cont.appendChild(b);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  pintarFiltros();
  pintarCatalogo("todos");
});
