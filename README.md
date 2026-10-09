# Kitty Hair Color

Sitio catálogo de tinturas fantasía. Landing estática en HTML, CSS y JavaScript
vanilla: **sin backend, sin build, sin dependencias**. Se abre con doble clic o
se publica en cualquier hosting estático.

---

## Ver el sitio

Abrir `index.html` en el navegador, o levantar un servidor local:

```bash
python3 -m http.server 8899
```

Luego ir a <http://localhost:8899>.

> Nota: `python -m http.server` es de un solo hilo y puede colgarse si se piden
> muchas imágenes a la vez. Para desarrollo con las 20 imágenes cargando en
> paralelo conviene un servidor multihilo.

---

## Estructura

```
kitty-hair-color/
├── index.html                  Estructura y contenido de las secciones
├── favicon.png                 Ícono del sitio
├── data/
│   └── productos.js            TODOS LOS DATOS: productos, formatos, tienda
├── js/
│   ├── render.js               Construye las tarjetas del catálogo
│   └── secciones.js            Pasos, envíos, contacto y redes del footer
├── styles/
│   └── main.css                Sistema de diseño completo
└── assets/
    ├── brand/
    │   ├── logo.png            Logo (corazón rosa, fondo transparente)
    │   └── carta-colores.png   Carta de colores original
    └── productos/              20 corazones recortados, PNG con fondo transparente
```

---

## Cómo cargar un tono nuevo

**Todo se hace en `data/productos.js`.** No hay que tocar HTML, CSS ni ningún otro JS.

### 1. Guardar la imagen

Poner el PNG del producto en `assets/productos/`. El nombre del archivo debe
coincidir con el `id` del producto.

Ejemplo: `assets/productos/rosa-chicle.png`

### 2. Agregar el objeto al array `PRODUCTOS`

```js
{
  id: "rosa-chicle",                          // obligatorio, único
  nombre: "Rosa chicle",                      // obligatorio, lo que se muestra
  familia: "rosas",                           // obligatorio: morados | rosas | azules | verdes | calidos
  hex: "#ff8ec4",                             // obligatorio, color del tono
  imagen: "assets/productos/rosa-chicle.png", // obligatorio
  descripcion: "",                            // opcional, "" = no se muestra
  precio: null,                               // opcional, null = no se muestra
  destacado: false                            // opcional, true = tarjeta más ancha
}
```

Listo. Aparece solo en el catálogo y en los filtros.

### Contrato de campos

| Campo | Tipo | Obligatorio | Comportamiento |
|---|---|---|---|
| `id` | texto | Sí | Clave única. Debe coincidir con el nombre del PNG |
| `nombre` | texto | Sí | Lo que se muestra en la tarjeta |
| `familia` | texto | Sí | Debe existir en `FAMILIAS` |
| `hex` | texto | Sí | Color en formato `#rrggbb` |
| `imagen` | texto | Sí | Ruta al PNG |
| `descripcion` | texto | No | Si está vacío, el bloque no se muestra |
| `precio` | número | No | Si es `null` o `0`, no se muestra |
| `destacado` | booleano | No | `true` hace la tarjeta más ancha |

**Degradación segura:** si falta un campo opcional o la imagen no existe, la
tarjeta no se rompe. Si la imagen falta, se muestra un respaldo con el color
`hex` del producto. Si el `hex` es inválido, cae a rosa por defecto.

---

## Formatos

Los formatos aplican a todos los tonos, por eso se declaran una sola vez:

```js
const FORMATOS = ["250ml", "500ml", "1L"];
```

Si un tono puntual necesitara formatos distintos, se le agrega el campo
`formatos` a **ese** producto y pisa la lista general:

```js
{ id: "x", /* ... */, formatos: ["1L"] }
```

---

## Familias de color (filtros)

```js
const FAMILIAS = [
  { id: "morados", nombre: "Morados" },
  { id: "rosas",   nombre: "Rosas"   },
  { id: "azules",  nombre: "Azules"  },
  { id: "verdes",  nombre: "Verdes"  },
  { id: "calidos", nombre: "Cálidos" },
];
```

El orden de esta lista define el orden de los botones de filtro. Agregar o quitar
familias acá actualiza los filtros automáticamente.

---

## Datos de la tienda

Todo en el objeto `TIENDA` de `data/productos.js`: contacto, envíos, entregas y
los pasos de compra.

```js
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
    { n: "1", titulo: "Elige tu color",       texto: "..." },
    { n: "2", titulo: "Escríbenos al DM",     texto: "..." },
    { n: "3", titulo: "Te pasamos el total",  texto: "..." },
    { n: "4", titulo: "Preparamos tu pedido", texto: "..." }
  ]
};
```

El contacto y las redes del footer se construyen desde `TIENDA.instagram`. Si se
agrega otra red, se muestra sola (ver `pintarRedes()` en `js/secciones.js`).

> En `entregas`, si el `detalle` dice "GRATIS" se resalta en verde automáticamente.

---

## Diseño

Los colores salen del material real de la marca, no son inventados:

| Variable | Valor | Origen |
|---|---|---|
| `--rosa-fondo` | `#ffe6fa` | Fondo de la carta de colores |
| `--rosa-chicle` | `#ffbce2` | Del logo |
| `--acento` | `#db389b` | Tono fucsia medido de un producto |
| `--tinta` | `#4a2b3c` | Texto principal |

Detalles de estilo:

- Hover con **glow y desplazamiento**, nunca `scale`.
- Respeta `prefers-reduced-motion`.
- Responsive verificado de 320px a 1440px.
- Tipografía del sistema: no carga fuentes externas.

---

## Verificar que no se rompió nada

Los tres chequeos rápidos:

```bash
node --check data/productos.js
node --check js/render.js
node --check js/secciones.js
```

Y en el navegador, abrir la consola: no debe haber errores.

---

## Publicar

Es un sitio estático, así que sirve cualquier hosting. Opciones sin costo:

- **GitHub Pages**: Settings → Pages → Deploy from branch → `main` / root.
- **Netlify / Vercel**: arrastrar la carpeta.
