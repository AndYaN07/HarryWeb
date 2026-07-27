// Toggle de tema oscuro/claro — guarda la preferencia en localStorage

function getTema() {
  return localStorage.getItem("hpw-tema") || "oscuro";
}

function aplicarTema() {
  const esClaro = getTema() === "claro";
  document.body.classList.toggle("tema-claro", esClaro);

  const btn = document.getElementById("btn-tema");
  if (btn) {
    btn.textContent = esClaro ? "Oscuro" : "Claro";
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
