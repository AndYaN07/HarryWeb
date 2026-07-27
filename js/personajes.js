// ── CONFIGURACIÓN

// Primera página — el bucle de carga continúa con links.next hasta el final
const API_PERSONAJES = "https://api.potterdb.com/v1/characters?page[size]=100";

// Array con los personajes cargados de la API (ya filtrados)
let personajesData = [];

// Estado de los filtros activos
let filtroCasa = "todos";
let textoBusqueda = "";

// Colores de cada casa para placeholders y badges
const COLORES_CASA = {
  Gryffindor: "#b83a3a",
  Slytherin: "#3a8b68",
  Ravenclaw: "#5a78c4",
  Hufflepuff: "#c9a836",
};

// ── TRADUCCIONES
// Los nombres propios son iguales en español. Solo se traducen campos descriptivos.

const TRADUCCIONES = {
  genero: {
    Male: "Masculino",
    Female: "Femenino",
  },
  especie: {
    Human: "Humano",
    Giant: "Gigante",
    "Half-Giant": "Semi-gigante",
    Ghost: "Fantasma",
    Werewolf: "Hombre lobo",
    Centaur: "Centauro",
    Goblin: "Goblin",
    Elf: "Elfo",
    Animagus: "Animago",
    Metamorphmagus: "Metamorfomago",
    "Part-Human": "Parte humano",
    Squib: "Squib",
  },
  patronus: {
    Stag: "Ciervo",
    Doe: "Corza",
    Otter: "Nutria",
    Hare: "Liebre",
    "Jack Russell terrier": "Terrier Jack Russell",
    Phoenix: "Fénix",
    Cat: "Gato",
    Horse: "Caballo",
    Wolf: "Lobo",
    Boar: "Jabalí",
    Fox: "Zorro",
    Swan: "Cisne",
    Lynx: "Lince",
    Goat: "Cabra",
    Salmon: "Salmón",
    Rabbit: "Conejo",
    Bear: "Oso",
    Mouse: "Ratón",
    Dolphin: "Delfín",
    Dragon: "Dragón",
    Peacock: "Pavo real",
    Weasel: "Comadreja",
  },
  ancestria: {
    "Pure-blood": "Sangre Pura",
    "Half-blood": "Sangre Mestiza",
    "Muggle-born": "Nacido Muggle",
    Muggle: "Muggle",
    Squib: "Squib",
    "Part-Giant": "Parte gigante",
    Unknown: "Desconocida",
    "Half-Giant": "Semi-gigante",
  },
};

// Devuelve la traducción al español o el valor original si no está en el mapa
function traducir(campo, valor) {
  if (!valor) return null;
  return TRADUCCIONES[campo]?.[valor] || valor;
}

// ── CARGA Y FILTROS

async function cargarPersonajes() {
  const grid = document.getElementById("personajes-grid");
  grid.innerHTML = '<p class="personajes-estado">Cargando personajes...</p>';

  try {
    let url = API_PERSONAJES;
    let todos = [];

    // La API pagina los resultados — recorrer todas las páginas hasta que no haya "next"
    while (url) {
      const respuesta = await fetch(url);
      if (!respuesta.ok) throw new Error("Error en la API");
      const datos = await respuesta.json();
      todos = todos.concat(datos.data || []);
      url = datos.links?.next || null;

      grid.innerHTML = `<p class="personajes-estado">Cargando... (${todos.length})</p>`;
    }

    // Descartar personajes sin imagen NI casa (entradas vacías sin información útil)
    personajesData = todos.filter((p) => {
      const a = p.attributes || {};
      return a.image || a.house;
    });

    mostrarEstadoInicial();
  } catch (error) {
    grid.innerHTML =
      '<p class="personajes-estado personajes-error">No se pudieron cargar los personajes. Comprueba tu conexión.</p>';
  }
}

// Mensaje inicial cuando no hay ningún filtro activo
function mostrarEstadoInicial() {
  const contador = document.getElementById("personajes-contador");
  const grid = document.getElementById("personajes-grid");
  contador.textContent = "";
  grid.innerHTML =
    '<p class="personajes-estado">Filtra por casa o escribe un nombre para explorar personajes.</p>';
}

// Aplica casa + búsqueda de texto y renderiza el resultado
function aplicarFiltros() {
  if (filtroCasa === "todos" && !textoBusqueda) {
    mostrarEstadoInicial();
    return;
  }

  let resultado = personajesData;

  if (filtroCasa !== "todos") {
    resultado = resultado.filter(
      (p) => (p.attributes?.house || "") === filtroCasa,
    );
  }

  if (textoBusqueda) {
    resultado = resultado.filter((p) =>
      (p.attributes?.name || "").toLowerCase().includes(textoBusqueda),
    );
  }

  renderPersonajes(resultado);
}

// ── TARJETAS

function crearTarjeta(personaje) {
  const a = personaje.attributes || {};
  const color = COLORES_CASA[a.house] || "var(--color-gold)";

  const imagenHTML = a.image
    ? `<img src="${a.image}" alt="${a.name}" loading="lazy" width="100" height="100" />`
    : `<div class="personaje-placeholder" style="background-color: ${color}">${(a.name || "?").charAt(0)}</div>`;

  const houseHTML = a.house
    ? `<span class="personaje-casa" style="color: ${color}">${a.house}</span>`
    : "";

  return `
    <article class="personaje-card-api" data-id="${personaje.id}"
      role="button" tabindex="0" aria-label="Ver detalles de ${a.name || "Personaje"}">
      ${imagenHTML}
      <h3>${a.name || "Desconocido"}</h3>
      ${houseHTML}
    </article>
  `;
}

function renderPersonajes(personajes) {
  const grid = document.getElementById("personajes-grid");
  const contador = document.getElementById("personajes-contador");

  if (personajes.length === 0) {
    contador.textContent = "";
    grid.innerHTML =
      '<p class="personajes-estado">No se encontró ningún personaje con ese criterio.</p>';
    return;
  }

  contador.textContent = `${personajes.length} personaje${personajes.length !== 1 ? "s" : ""}`;
  grid.innerHTML = personajes.map(crearTarjeta).join("");
}

// ── MODAL DE DETALLE

function abrirModal(id) {
  const personaje = personajesData.find((p) => p.id === id);
  if (!personaje) return;

  const a = personaje.attributes || {};
  const color = COLORES_CASA[a.house] || "var(--color-gold)";

  // Imagen o placeholder
  document.getElementById("modal-imagen-wrap").innerHTML = a.image
    ? `<img src="${a.image}" alt="${a.name}" />`
    : `<div class="modal-placeholder" style="background-color: ${color}">${(a.name || "?").charAt(0)}</div>`;

  // Nombre
  document.getElementById("modal-nombre").textContent = a.name || "Desconocido";

  // Badge de casa
  const badge = document.getElementById("modal-casa-badge");
  if (a.house) {
    badge.textContent = a.house;
    badge.style.color = color;
    badge.style.display = "";
  } else {
    badge.style.display = "none";
  }

  // Datos adicionales en lista de definición (solo los que tienen valor)
  const campos = [
    { etiqueta: "Especie", valor: traducir("especie", a.species) },
    { etiqueta: "Género", valor: traducir("genero", a.gender) },
    { etiqueta: "Patronus", valor: traducir("patronus", a.patronus) },
    { etiqueta: "Ancestría", valor: traducir("ancestria", a.ancestry) },
    { etiqueta: "Actor/Actriz", valor: a.actor },
    { etiqueta: "Nacido/a", valor: a.born },
  ];

  const filasHTML = campos
    .filter((c) => c.valor)
    .map(
      (c) =>
        `<div class="modal-fila"><dt>${c.etiqueta}</dt><dd>${c.valor}</dd></div>`,
    )
    .join("");

  document.getElementById("modal-datos").innerHTML =
    filasHTML ||
    '<div class="modal-fila"><dt>—</dt><dd>Sin información adicional disponible.</dd></div>';

  document.getElementById("modal-overlay").removeAttribute("hidden");
  document.getElementById("modal-cerrar").focus();
}

function cerrarModal() {
  document.getElementById("modal-overlay").setAttribute("hidden", "");
}

// ── EVENTOS

// Buscador de personajes: filtro en tiempo real
document
  .getElementById("buscador-personajes")
  .addEventListener("input", (e) => {
    textoBusqueda = e.target.value.toLowerCase().trim();
    aplicarFiltros();
  });

// Botones de filtro por casa (delegación de eventos)
document.getElementById("filtros-casa").addEventListener("click", (e) => {
  const btn = e.target.closest(".filtro-btn");
  if (!btn) return;

  filtroCasa = btn.dataset.casa;
  document.querySelectorAll(".filtro-btn").forEach((b) => {
    b.classList.toggle("activo", b.dataset.casa === filtroCasa);
  });

  aplicarFiltros();
});

// Clic en tarjeta → abrir modal (delegación de eventos en el grid)
document.getElementById("personajes-grid").addEventListener("click", (e) => {
  const card = e.target.closest(".personaje-card-api");
  if (card) abrirModal(card.dataset.id);
});

// Teclado en tarjeta: Enter o Espacio abre el modal (accesibilidad)
document.getElementById("personajes-grid").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    const card = e.target.closest(".personaje-card-api");
    if (card) {
      e.preventDefault();
      abrirModal(card.dataset.id);
    }
  }
});

// Cerrar modal con el botón ✕
document.getElementById("modal-cerrar").addEventListener("click", cerrarModal);

// Cerrar modal al hacer clic fuera del contenido (en el overlay)
document.getElementById("modal-overlay").addEventListener("click", (e) => {
  if (e.target === document.getElementById("modal-overlay")) cerrarModal();
});

// Cerrar modal con la tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarModal();
});

// ── INICIO

cargarPersonajes();
