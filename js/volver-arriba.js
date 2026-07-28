// Muestra el botón "volver arriba" al bajar 300px y sube al hacer clic

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-volver-arriba");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => btn.classList.toggle("visible", window.scrollY > 300),
    { passive: true }
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
