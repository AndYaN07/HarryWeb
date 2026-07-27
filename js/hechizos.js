// ── DATOS
// Dataset local de hechizos en castellano. No usamos la API porque devuelve
// todo en inglés y no permite búsquedas en español.

const HECHIZOS = [
  {
    nombre: "Expelliarmus",
    incantacion: "Expelliarmus",
    categoria: "Encantamiento",
    descripcion:
      "Hechizo desarmador. Expulsa la varita u objeto del oponente. El hechizo favorito de Harry Potter.",
  },
  {
    nombre: "Lumos",
    incantacion: "Lumos",
    categoria: "Encantamiento",
    descripcion:
      "Produce luz en la punta de la varita. Muy útil para iluminar lugares oscuros o pasadizos.",
  },
  {
    nombre: "Nox",
    incantacion: "Nox",
    categoria: "Encantamiento",
    descripcion: "Apaga la luz producida por Lumos.",
  },
  {
    nombre: "Wingardium Leviosa",
    incantacion: "Wingardium Leviosa",
    categoria: "Encantamiento",
    descripcion:
      "Levita y hace flotar objetos en el aire. El primer hechizo que se enseña en Hogwarts.",
  },
  {
    nombre: "Alohomora",
    incantacion: "Alohomora",
    categoria: "Encantamiento",
    descripcion:
      "Abre cerraduras y desbloquea puertas. Puede usarse para entrar en lugares cerrados.",
  },
  {
    nombre: "Accio",
    incantacion: "Accio",
    categoria: "Encantamiento de Convocación",
    descripcion:
      "Convoca un objeto hacia el lanzador desde cualquier distancia.",
  },
  {
    nombre: "Expecto Patronum",
    incantacion: "Expecto Patronum",
    categoria: "Encantamiento",
    descripcion:
      "Invoca un Patronus, una fuerza protectora con forma de animal. Protege contra los Dementores. El Patronus de Harry es un ciervo.",
  },
  {
    nombre: "Stupefy",
    incantacion: "Stupefy",
    categoria: "Hechizo",
    descripcion:
      "Hechizo aturdidor. Deja inconsciente al oponente temporalmente. Produce un destello de luz roja.",
  },
  {
    nombre: "Protego",
    incantacion: "Protego",
    categoria: "Encantamiento Protector",
    descripcion:
      "Crea un escudo invisible que desvía hechizos y encantamientos de vuelta al atacante.",
  },
  {
    nombre: "Avada Kedavra",
    incantacion: "Avada Kedavra",
    categoria: "Maldición Imperdonable",
    descripcion:
      "La maldición asesina. Una de las tres maldiciones imperdonables. Produce la muerte instantánea y no tiene contraencantamiento.",
  },
  {
    nombre: "Crucio",
    incantacion: "Crucio",
    categoria: "Maldición Imperdonable",
    descripcion:
      "La maldición torturadora. Provoca un dolor insoportable en la víctima. Una de las tres maldiciones imperdonables.",
  },
  {
    nombre: "Imperio",
    incantacion: "Imperio",
    categoria: "Maldición Imperdonable",
    descripcion:
      "La maldición del control. Pone a la víctima bajo el dominio total del lanzador. Una de las tres maldiciones imperdonables.",
  },
  {
    nombre: "Riddikulus",
    incantacion: "Riddikulus",
    categoria: "Encantamiento",
    descripcion:
      "Usado contra los Boggart. Transforma el objeto aterrador en algo cómico y ridículo, eliminando el miedo.",
  },
  {
    nombre: "Sectumsempra",
    incantacion: "Sectumsempra",
    categoria: "Maléfico",
    descripcion:
      "Produce cortes profundos en el objetivo como si fuera una espada invisible. Inventado por Severus Snape, el Príncipe Mestizo.",
  },
  {
    nombre: "Legilimens",
    incantacion: "Legilimens",
    categoria: "Encantamiento",
    descripcion:
      "Permite al lanzador penetrar en la mente de otra persona y acceder a sus recuerdos y pensamientos.",
  },
  {
    nombre: "Levicorpus",
    incantacion: "Levicorpus",
    categoria: "Hechizo",
    descripcion:
      "Cuelga a la víctima boca abajo por el tobillo en el aire. También inventado por el Príncipe Mestizo.",
  },
  {
    nombre: "Reparo",
    incantacion: "Reparo",
    categoria: "Encantamiento",
    descripcion:
      "Repara objetos dañados o rotos instantáneamente. Hermione lo usa con frecuencia a lo largo de la saga.",
  },
  {
    nombre: "Obliviate",
    incantacion: "Obliviate",
    categoria: "Encantamiento",
    descripcion:
      "Borra o modifica los recuerdos de una persona. Hermione lo usó en sus padres para protegerlos.",
  },
  {
    nombre: "Finite Incantatem",
    incantacion: "Finite Incantatem",
    categoria: "Contraencantamiento",
    descripcion: "Cancela y neutraliza los efectos de otros hechizos en curso.",
  },
  {
    nombre: "Engorgio",
    incantacion: "Engorgio",
    categoria: "Encantamiento",
    descripcion: "Aumenta el tamaño del objeto o ser al que va dirigido.",
  },
  {
    nombre: "Reducio",
    incantacion: "Reducio",
    categoria: "Encantamiento",
    descripcion:
      "Reduce el tamaño del objeto o ser al que va dirigido. Contrarrestar de Engorgio.",
  },
  {
    nombre: "Incendio",
    incantacion: "Incendio",
    categoria: "Hechizo",
    descripcion:
      "Produce fuego y llamas desde la varita. Puede usarse para encender hogueras o atacar.",
  },
  {
    nombre: "Aguamenti",
    incantacion: "Aguamenti",
    categoria: "Hechizo",
    descripcion:
      "Produce un chorro de agua limpia desde la punta de la varita.",
  },
  {
    nombre: "Diffindo",
    incantacion: "Diffindo",
    categoria: "Hechizo",
    descripcion: "Corta o rasga objetos y telas con precisión usando magia.",
  },
  {
    nombre: "Sonorus",
    incantacion: "Sonorus",
    categoria: "Encantamiento",
    descripcion:
      "Amplifica la voz del lanzador para que pueda ser escuchada a gran distancia.",
  },
  {
    nombre: "Quietus",
    incantacion: "Quietus",
    categoria: "Encantamiento",
    descripcion:
      "Contrarrestar de Sonorus. Devuelve la voz a su volumen normal.",
  },
  {
    nombre: "Muffliato",
    incantacion: "Muffliato",
    categoria: "Encantamiento",
    descripcion:
      "Llena los oídos de quienes están cerca con un zumbido para que no escuchen la conversación. Inventado por Snape.",
  },
  {
    nombre: "Aparecium",
    incantacion: "Aparecium",
    categoria: "Encantamiento Revelador",
    descripcion:
      "Hace visible la escritura invisible o los mensajes ocultos en un pergamino.",
  },
  {
    nombre: "Petrificus Totalus",
    incantacion: "Petrificus Totalus",
    categoria: "Hechizo",
    descripcion:
      "Petrifica completamente el cuerpo de la víctima, inmovilizándola de pies a cabeza.",
  },
  {
    nombre: "Lumos Maxima",
    incantacion: "Lumos Maxima",
    categoria: "Encantamiento",
    descripcion:
      "Versión amplificada de Lumos. Produce una luz muy brillante que ilumina grandes espacios.",
  },
];

// ── FUNCIONES

// Construye y muestra las tarjetas en el grid
function renderHechizos(hechizos) {
  const grid = document.getElementById("hechizos-grid");
  const contador = document.getElementById("hechizos-contador");

  if (hechizos.length === 0) {
    contador.textContent = "";
    grid.innerHTML =
      '<p class="hechizos-estado">No se encontró ningún hechizo con ese término.</p>';
    return;
  }

  // Actualizar el contador de resultados
  const num = hechizos.length;
  contador.textContent = `${num} hechizo${num !== 1 ? "s" : ""} encontrado${num !== 1 ? "s" : ""}`;

  grid.innerHTML = hechizos
    .map(
      (h) => `
    <article class="hechizo-card">
      <h3>${h.nombre}</h3>
      <p class="hechizo-incantacion">✦ ${h.incantacion}</p>
      <p class="hechizo-categoria">${h.categoria}</p>
      <p class="hechizo-efecto">${h.descripcion}</p>
    </article>
  `,
    )
    .join("");
}

// Filtra el array HECHIZOS por nombre, incantación o descripción en castellano
function buscarHechizos(texto) {
  const grid = document.getElementById("hechizos-grid");
  const contador = document.getElementById("hechizos-contador");
  const termino = texto.toLowerCase().trim();

  // Sin texto: mostrar el estado inicial
  if (!termino) {
    contador.textContent = "";
    grid.innerHTML =
      '<p class="hechizos-estado">Escribe el nombre de un hechizo para buscarlo.</p>';
    return;
  }

  // Buscar en nombre, incantación y descripción (todo en castellano)
  const filtrados = HECHIZOS.filter((h) => {
    return (
      h.nombre.toLowerCase().includes(termino) ||
      h.incantacion.toLowerCase().includes(termino) ||
      h.descripcion.toLowerCase().includes(termino) ||
      h.categoria.toLowerCase().includes(termino)
    );
  });

  renderHechizos(filtrados);
}

// ── EVENTOS

document.getElementById("buscador-hechizos").addEventListener("input", (e) => {
  buscarHechizos(e.target.value);
});

// ── INICIO

// Estado inicial: invitar a buscar
document.getElementById("hechizos-grid").innerHTML =
  '<p class="hechizos-estado">Escribe el nombre de un hechizo para buscarlo.</p>';
