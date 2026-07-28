// Toggle de tema oscuro/claro — guarda la preferencia en localStorage

const SVG_SOL = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

const SVG_LUNA = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

function getTema() {
  return localStorage.getItem("hpw-tema") || "oscuro";
}

function aplicarTema() {
  const esClaro = getTema() === "claro";
  document.body.classList.toggle("tema-claro", esClaro);

  const btn = document.getElementById("btn-tema");
  if (btn) {
    btn.innerHTML = esClaro ? SVG_SOL : SVG_LUNA;
    btn.setAttribute(
      "aria-label",
      esClaro ? "Activar modo oscuro" : "Activar modo claro"
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-tema")?.addEventListener("click", () => {
    localStorage.setItem(
      "hpw-tema",
      getTema() === "oscuro" ? "claro" : "oscuro"
    );
    aplicarTema();
  });

  // Aplicar el tema guardado en localStorage al cargar la página
  aplicarTema();
});
