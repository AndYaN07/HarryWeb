// Abre un modal con el resumen de Wikipedia al pulsar "Leer más" en cada casa

const WIKI_SLUGS = {
  gryffindor: "Gryffindor",
  slytherin:  "Slytherin",
  ravenclaw:  "Ravenclaw",
  hufflepuff: "Hufflepuff",
};

async function fetchWiki(slug) {
  const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al cargar el artículo");
  return res.json();
}

function renderWiki(data) {
  const img = data.thumbnail
    ? `<img src="${data.thumbnail.source}" alt="${data.title}" />`
    : "";
  const enlace = data.content_urls?.desktop?.page
    ? `<a class="wiki-enlace" href="${data.content_urls.desktop.page}" target="_blank" rel="noopener noreferrer">Ver artículo completo en Wikipedia →</a>`
    : "";
  return `
    <h3 id="wiki-titulo">${data.title}</h3>
    ${img}
    <p>${data.extract}</p>
    ${enlace}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const modal    = document.getElementById("modal-wiki");
  const cuerpo   = document.getElementById("wiki-cuerpo");
  const btnCerrar = document.getElementById("modal-wiki-cerrar");

  if (!modal || !cuerpo || !btnCerrar) return;

  function abrirModal(html) {
    cuerpo.innerHTML = html;
    modal.removeAttribute("hidden");
    document.body.style.overflow = "hidden";
    btnCerrar.focus();
  }

  function cerrarModal() {
    modal.setAttribute("hidden", "");
    document.body.style.overflow = "";
  }

  btnCerrar.addEventListener("click", cerrarModal);

  // Cierra al hacer clic en el fondo
  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrarModal();
  });

  // Cierra con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) cerrarModal();
  });

  document.querySelectorAll(".btn-wiki-casa").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const slug = WIKI_SLUGS[btn.dataset.casa];
      if (!slug) return;

      abrirModal("<p class='wiki-cargando'>Cargando...</p>");

      try {
        const data = await fetchWiki(slug);
        abrirModal(renderWiki(data));
      } catch {
        abrirModal("<p class='wiki-error'>No se pudo cargar la información. Comprueba tu conexión e inténtalo de nuevo.</p>");
      }
    });
  });
});
