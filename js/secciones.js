/* ============================================================
   KITTY HAIR COLOR — Secciones de contenido
   Construye "Cómo comprar", "Envíos y entregas", el botón de
   contacto (Instagram) y las redes del footer, todo leyendo de
   TIENDA en data/productos.js.
   ============================================================ */

"use strict";

/** Crea un elemento con clase y texto. */
function el(tag, clase, texto) {
  const n = document.createElement(tag);
  if (clase) n.className = clase;
  if (texto != null) n.textContent = texto;
  return n;
}

/* ---------- PASOS DE COMPRA ---------- */
function pintarPasos() {
  const cont = document.getElementById("pasos-compra");
  if (!cont || typeof TIENDA === "undefined") return;

  const pasos = Array.isArray(TIENDA.pasosCompra) ? TIENDA.pasosCompra : [];
  cont.textContent = "";

  pasos.forEach(p => {
    const li = el("li", "paso");

    const num = el("span", "paso__num", p.n);
    num.setAttribute("aria-hidden", "true");

    const cuerpo = el("div", "paso__cuerpo");
    cuerpo.appendChild(el("h3", "paso__titulo", p.titulo));
    if (p.texto) cuerpo.appendChild(el("p", "paso__texto", p.texto));

    li.append(num, cuerpo);
    cont.appendChild(li);
  });
}

/* ---------- ENVÍOS Y ENTREGAS ---------- */
function pintarEnvios() {
  if (typeof TIENDA === "undefined") return;

  const listaEnvios = document.getElementById("lista-envios");
  if (listaEnvios) {
    listaEnvios.textContent = "";
    (TIENDA.envios || []).forEach(e => {
      const li = el("li", "envio");
      li.appendChild(el("span", "envio__nombre", e.nombre));
      if (e.detalle) li.appendChild(el("span", "envio__detalle", e.detalle));
      listaEnvios.appendChild(li);
    });
  }

  const listaEntregas = document.getElementById("lista-entregas");
  if (listaEntregas) {
    listaEntregas.textContent = "";
    (TIENDA.entregas || []).forEach(e => {
      const li = el("li", "envio");

      const cab = el("div", "envio__cabecera");
      cab.appendChild(el("span", "envio__nombre", e.nombre));
      if (e.detalle) {
        // "GRATIS" se resalta; el resto va como detalle normal
        const esGratis = /gratis/i.test(e.detalle);
        cab.appendChild(el("span", esGratis ? "envio__gratis" : "envio__detalle", e.detalle));
      }
      li.appendChild(cab);

      if (e.nota) li.appendChild(el("span", "envio__nota", e.nota));
      listaEntregas.appendChild(li);
    });
  }
}

/* ---------- CONTACTO (canal: Instagram) ---------- */
function pintarContacto() {
  const cajaBoton = document.getElementById("boton-contacto");
  if (!cajaBoton || typeof TIENDA === "undefined") return;

  const ig = TIENDA.instagram;
  if (!ig || !ig.url) {
    cajaBoton.textContent = "";
    return;
  }

  const a = el("a", "btn btn--primario btn--contacto", "Escríbenos por Instagram");
  a.href = ig.url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  a.setAttribute("aria-label", "Instagram de Kitty Hair Color");

  a.appendChild(iconoInstagram());

  cajaBoton.textContent = "";
  cajaBoton.appendChild(a);
}

document.addEventListener("DOMContentLoaded", () => {
  pintarPasos();
  pintarEnvios();
  pintarContacto();
  pintarRedes();
});

/* ---------- REDES DEL FOOTER ---------- */
function pintarRedes() {
  const cont = document.getElementById("pie-redes");
  if (!cont || typeof TIENDA === "undefined") return;
  cont.textContent = "";

  const ig = TIENDA.instagram;
  if (ig && ig.url) {
    const a = el("a", "pie__red");
    a.href = ig.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.setAttribute("aria-label", "Instagram de Kitty Hair Color");
    a.appendChild(iconoInstagram());
    a.appendChild(document.createTextNode("@" + (ig.usuario || "instagram")));
    cont.appendChild(a);
  }
}

/** Icono de Instagram en SVG (sin dependencias externas). */
function iconoInstagram() {
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "19");
  svg.setAttribute("height", "19");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  const rect = document.createElementNS(NS, "rect");
  rect.setAttribute("x", "2"); rect.setAttribute("y", "2");
  rect.setAttribute("width", "20"); rect.setAttribute("height", "20");
  rect.setAttribute("rx", "5");

  const circ = document.createElementNS(NS, "circle");
  circ.setAttribute("cx", "12"); circ.setAttribute("cy", "12"); circ.setAttribute("r", "4");

  const punto = document.createElementNS(NS, "circle");
  punto.setAttribute("cx", "17.5"); punto.setAttribute("cy", "6.5");
  punto.setAttribute("r", "1.2"); punto.setAttribute("fill", "currentColor");
  punto.setAttribute("stroke", "none");

  svg.append(rect, circ, punto);
  return svg;
}
