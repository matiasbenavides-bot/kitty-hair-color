/* ============================================================
   KITTY HAIR COLOR — Fuente de datos del catálogo
   ------------------------------------------------------------
   PARA CARGAR UN PRODUCTO: copiar un objeto y cambiar valores.
   No hay que tocar HTML, CSS ni JS.

   CONTRATO (DEC-KHC-03):
     id          string  OBLIGATORIO  clave única (= nombre del PNG sin extensión)
     nombre      string  OBLIGATORIO  texto mostrado en la tarjeta
     familia     string  OBLIGATORIO  morados | rosas | azules | verdes | calidos
     hex         string  OBLIGATORIO  color real del tono, formato "#rrggbb"
     imagen      string  OBLIGATORIO  ruta al PNG recortado
     descripcion string  OPCIONAL     "" = el bloque no se muestra
     precio      number  OPCIONAL     null = NO se muestra (v1 sin precios)
     destacado   boolean OPCIONAL     true = tarjeta más grande
   ============================================================ */

const PRODUCTOS = [

  /* ---------- MORADOS ---------- */
  {
    id: "morado",
    nombre: "Morado",
    familia: "morados",
    hex: "#8140a1",
    imagen: "assets/productos/morado.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "purpura",
    nombre: "Púrpura",
    familia: "morados",
    hex: "#963389",
    imagen: "assets/productos/purpura.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "magenta",
    nombre: "Magenta",
    familia: "morados",
    hex: "#a01a7c",
    imagen: "assets/productos/magenta.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "fucsia",
    nombre: "Fucsia",
    familia: "morados",
    hex: "#db389b",
    imagen: "assets/productos/fucsia.png",
    descripcion: "",
    precio: null,
    destacado: false
  },

  /* ---------- ROSAS ---------- */
  {
    id: "rosa-pastel",
    nombre: "Rosa pastel",
    familia: "rosas",
    hex: "#f191b2",
    imagen: "assets/productos/rosa-pastel.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "lila",
    nombre: "Lila",
    familia: "morados",
    hex: "#b14dab",
    imagen: "assets/productos/lila.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "lavanda",
    nombre: "Lavanda",
    familia: "morados",
    hex: "#7968c4",
    imagen: "assets/productos/lavanda.png",
    descripcion: "",
    precio: null,
    destacado: false
  },

  /* ---------- AZULES ---------- */
  {
    id: "azul",
    nombre: "Azul",
    familia: "azules",
    hex: "#1736ad",
    imagen: "assets/productos/azul.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "azul-verde",
    nombre: "Azul verde",
    familia: "azules",
    hex: "#0d4056",
    imagen: "assets/productos/azul-verde.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "turquesa",
    nombre: "Turquesa",
    familia: "azules",
    hex: "#0fbfd1",
    imagen: "assets/productos/turquesa.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "celeste",
    nombre: "Celeste",
    familia: "azules",
    hex: "#6ab1d9",
    imagen: "assets/productos/celeste.png",
    descripcion: "",
    precio: null,
    destacado: false
  },

  /* ---------- VERDES ---------- */
  {
    id: "esmeralda",
    nombre: "Esmeralda",
    familia: "verdes",
    hex: "#2f917d",
    imagen: "assets/productos/esmeralda.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "menta",
    nombre: "Menta",
    familia: "verdes",
    hex: "#348f7d",
    imagen: "assets/productos/menta.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "verde-oscuro",
    nombre: "Verde oscuro",
    familia: "verdes",
    hex: "#0d7343",
    imagen: "assets/productos/verde-oscuro.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "verde-claro",
    nombre: "Verde claro",
    familia: "verdes",
    hex: "#3aa23d",
    imagen: "assets/productos/verde-claro.png",
    descripcion: "",
    precio: null,
    destacado: false
  },

  /* ---------- CÁLIDOS ---------- */
  {
    id: "amarillo-neon",
    nombre: "Amarillo neón",
    familia: "calidos",
    hex: "#dae564",
    imagen: "assets/productos/amarillo-neon.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "amarillo",
    nombre: "Amarillo",
    familia: "calidos",
    hex: "#d4bb09",
    imagen: "assets/productos/amarillo.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "rojo",
    nombre: "Rojo",
    familia: "calidos",
    hex: "#b62228",
    imagen: "assets/productos/rojo.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "naranja",
    nombre: "Naranja",
    familia: "calidos",
    hex: "#db9c68",
    imagen: "assets/productos/naranja.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
  {
    id: "salmon",
    nombre: "Salmón",
    familia: "calidos",
    hex: "#f5997e",
    imagen: "assets/productos/salmon.png",
    descripcion: "",
    precio: null,
    destacado: false
  },
];

/* Familias disponibles para los filtros. El orden define el orden de los botones. */
const FAMILIAS = [
  { id: "morados", nombre: "Morados" },
  { id: "rosas",   nombre: "Rosas"   },
  { id: "azules",  nombre: "Azules"  },
  { id: "verdes",  nombre: "Verdes"  },
  { id: "calidos", nombre: "Cálidos" },
];

/* ------------------------------------------------------------
   FORMATOS DISPONIBLES (DEC-KHC-18 / 19)
   Aplican a TODOS los tonos, por eso se declaran una sola vez.
   Si algún tono necesitara formatos distintos, se le agrega
   el campo "formatos" a ESE producto y pisa esta lista.
   ------------------------------------------------------------ */
const FORMATOS = ["250ml", "500ml", "1L"];

/* ------------------------------------------------------------
   DATOS DE LA TIENDA
   El canal de contacto es INSTAGRAM (los pedidos se toman por DM).
   ------------------------------------------------------------ */
const TIENDA = {
  nombre: "Kitty Hair Color",
  descriptor: "Tinturas fantasía",
  instagram: {
    usuario: "kittyhaircolor",
    url: "https://www.instagram.com/kittyhaircolor/"
  },
  envios: [
    { nombre: "Starken",      detalle: "Envío a todo Chile" },
    { nombre: "Blue Express", detalle: "Envío a todo Chile" }
  ],
  entregas: [
    { nombre: "Metro Vicuña Mackenna", detalle: "GRATIS", nota: "Entrega presencial" },
    { nombre: "Otros puntos",          detalle: "Con recarga adicional", nota: "Coordinamos por Instagram" }
  ],
  pasosCompra: [
    { n: "1", titulo: "Elige tu color",         texto: "Mira la carta de colores y quédate con el tono que más te guste." },
    { n: "2", titulo: "Escríbenos al DM",       texto: "Envíanos el color, el formato (250ml / 500ml / 1L) y cómo quieres recibirlo." },
    { n: "3", titulo: "Te pasamos el total",    texto: "Te enviamos el monto junto con los datos de pago." },
    { n: "4", titulo: "Preparamos tu pedido",   texto: "Lo dejamos listo y te lo enviamos." }
  ]
};
