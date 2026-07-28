// Reemplaza las imágenes locales de los personajes estáticos con las de la HP API

const BUSQUEDA = {
  harry:      "Harry Potter",
  ron:        "Ron Weasley",
  hermione:   "Hermione Granger",
  dumbledore: "Albus Dumbledore",
  snape:      "Severus Snape",
  tom:        "Voldemort",
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    if (!res.ok) return;
    const todos = await res.json();

    for (const [id, nombre] of Object.entries(BUSQUEDA)) {
      const match = todos.find(
        (p) => p.name.toLowerCase().includes(nombre.toLowerCase()) && p.image
      );
      if (!match) continue;

      const img = document.querySelector(`#${id} img`);
      if (img) {
        img.src = match.image;
        img.alt = match.name;
      }
    }
  } catch {
    // Si falla la API se quedan las imágenes locales sin error visible
  }
});
