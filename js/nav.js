// Menú hamburguesa y submenús desplegables en móvil

const SVG_MENU = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;

const SVG_CERRAR = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>`;

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("nav-hamburguesa");
  const nav = document.querySelector(".nav-container");

  if (!btn || !nav) return;

  btn.innerHTML = SVG_MENU;

  // ── Hamburguesa

  function cerrarMenu() {
    nav.classList.remove("nav-abierto");
    btn.innerHTML = SVG_MENU;
    btn.setAttribute("aria-label", "Abrir menú");
    btn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    cerrarTodosSubmenus();
  }

  btn.addEventListener("click", () => {
    const abierto = nav.classList.toggle("nav-abierto");
    btn.innerHTML = abierto ? SVG_CERRAR : SVG_MENU;
    btn.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
    btn.setAttribute("aria-expanded", String(abierto));
    document.body.style.overflow = abierto ? "hidden" : "";
    if (!abierto) cerrarTodosSubmenus();
  });

  // Cierra el menú al tocar cualquier enlace
  nav.querySelectorAll("ul a").forEach((link) => {
    link.addEventListener("click", cerrarMenu);
  });

  // ── Submenús

  function cerrarTodosSubmenus() {
    nav.querySelectorAll(".nav-submenu-toggle").forEach((toggle) => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.closest("li").classList.remove("submenu-abierto");
    });
  }

  nav.querySelectorAll(".nav-submenu-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const li = toggle.closest("li");
      const estaAbierto = li.classList.contains("submenu-abierto");

      // Cierra los demás antes de abrir este
      cerrarTodosSubmenus();

      if (!estaAbierto) {
        li.classList.add("submenu-abierto");
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });
});
