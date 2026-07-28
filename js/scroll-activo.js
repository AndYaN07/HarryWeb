// Resalta el enlace del nav que corresponde a la sección visible

document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-container > ul > li > a");
  if (!links.length) return;

  // Construye la lista de elementos a observar desde los hrefs del nav
  const targets = Array.from(links)
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);

  // Guarda qué secciones están actualmente en la mitad superior de la pantalla
  const visibles = new Set();

  function actualizarActivo() {
    // De todas las visibles, activa la que está más arriba en el DOM
    const activo = targets.find((t) => visibles.has(t));
    links.forEach((a) => a.classList.remove("nav-activo"));
    if (!activo) return;
    const link = document.querySelector(
      `.nav-container a[href="#${activo.id}"]`
    );
    if (link) link.classList.add("nav-activo");
  }

  // rootMargin '0px 0px -50% 0px' → zona activa = mitad superior del viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibles.add(entry.target);
        } else {
          visibles.delete(entry.target);
        }
      });
      actualizarActivo();
    },
    { rootMargin: "0px 0px -50% 0px", threshold: 0 }
  );

  targets.forEach((el) => observer.observe(el));
});
