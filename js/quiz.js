// ── DATOS

// 8 preguntas del quiz. Cada opción suma 1 punto a su casa.
const PREGUNTAS = [
  {
    texto: "¿Qué valoras más en la vida?",
    opciones: [
      { texto: "La valentía ante lo desconocido", casa: "gryffindor" },
      { texto: "La ambición y alcanzar la grandeza", casa: "slytherin" },
      { texto: "El conocimiento y la sabiduría", casa: "ravenclaw" },
      { texto: "La lealtad y el trabajo constante", casa: "hufflepuff" },
    ],
  },
  {
    texto: "¿Cómo afrontas un problema difícil?",
    opciones: [
      {
        texto: "Me lanzo de cabeza sin pensarlo demasiado",
        casa: "gryffindor",
      },
      { texto: "Busco la estrategia que me dé ventaja", casa: "slytherin" },
      {
        texto: "Investigo todas las opciones antes de actuar",
        casa: "ravenclaw",
      },
      { texto: "Pido ayuda a las personas de confianza", casa: "hufflepuff" },
    ],
  },
  {
    texto: "¿Qué animal te representa mejor?",
    opciones: [
      { texto: "Un león: majestuoso y valiente", casa: "gryffindor" },
      { texto: "Una serpiente: astuta y calculadora", casa: "slytherin" },
      { texto: "Un águila: inteligente y libre", casa: "ravenclaw" },
      { texto: "Un tejón: trabajador y tenaz", casa: "hufflepuff" },
    ],
  },
  {
    texto: "¿Cuál sería tu asignatura favorita en Hogwarts?",
    opciones: [
      { texto: "Defensa contra las Artes Oscuras", casa: "gryffindor" },
      { texto: "Pociones: secretos y precisión", casa: "slytherin" },
      { texto: "Runas Antiguas o Aritmancia", casa: "ravenclaw" },
      { texto: "Herbología: paciente y constante", casa: "hufflepuff" },
    ],
  },
  {
    texto: "Si encontraras una varita mágica, ¿qué harías primero?",
    opciones: [
      { texto: "Proteger a alguien en peligro", casa: "gryffindor" },
      { texto: "Probar si puedo dominarla mejor que nadie", casa: "slytherin" },
      { texto: "Estudiar cómo funciona su núcleo", casa: "ravenclaw" },
      { texto: "Ayudar a un amigo con algo que necesita", casa: "hufflepuff" },
    ],
  },
  {
    texto: "¿Qué frase describe mejor tu forma de trabajar?",
    opciones: [
      { texto: "«Primero actúo, luego pienso»", casa: "gryffindor" },
      { texto: "«El fin justifica los medios»", casa: "slytherin" },
      { texto: "«Siempre hay algo más que aprender»", casa: "ravenclaw" },
      { texto: "«Paso a paso, sin atajos»", casa: "hufflepuff" },
    ],
  },
  {
    texto: "¿Qué verías en el Espejo de Oesed?",
    opciones: [
      {
        texto: "A mí mismo como el héroe que salva el día",
        casa: "gryffindor",
      },
      { texto: "A mí mismo con poder y reconocimiento", casa: "slytherin" },
      {
        texto: "Rodeado de libros y grandes descubrimientos",
        casa: "ravenclaw",
      },
      { texto: "Rodeado de mis seres queridos y en paz", casa: "hufflepuff" },
    ],
  },
  {
    texto: "¿Cuál es tu mayor temor?",
    opciones: [
      { texto: "La cobardía y rendirme ante el peligro", casa: "gryffindor" },
      { texto: "El fracaso y la mediocridad", casa: "slytherin" },
      { texto: "La ignorancia y dejar de crecer", casa: "ravenclaw" },
      { texto: "Decepcionar a quienes confían en mí", casa: "hufflepuff" },
    ],
  },
];

// Descripción y color de cada casa para mostrar en el resultado
const CASAS = {
  gryffindor: {
    nombre: "Gryffindor",
    color: "#b83a3a",
    descripcion:
      "Eres valiente, audaz y decidido. Perteneces a la casa del coraje: la de quienes se atreven a enfrentarse a lo desconocido. Tu determinación es tu mayor fortaleza.",
  },
  slytherin: {
    nombre: "Slytherin",
    color: "#3a8b68",
    descripcion:
      "Eres ambicioso, astuto y estratégico. Perteneces a la casa de la astucia, donde la grandeza se alcanza con ingenio y visión. Tu capacidad para ver más allá te distingue.",
  },
  ravenclaw: {
    nombre: "Ravenclaw",
    color: "#5a78c4",
    descripcion:
      "Eres inteligente, creativo y curioso. Perteneces a la casa del saber, donde el conocimiento es la mayor fortaleza. Tu mente brillante es tu mejor aliada.",
  },
  hufflepuff: {
    nombre: "Hufflepuff",
    color: "#c9a836",
    descripcion:
      "Eres leal, trabajador y honesto. Perteneces a la casa del esfuerzo, donde la constancia construye cosas duraderas. Tu perseverancia y dedicación son tu mayor virtud.",
  },
};

// ── UTILIDADES

// Devuelve una copia del array en orden aleatorio (Fisher-Yates)
// Usamr una copia para no modificar el array original de preguntas
function mezclar(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// ── ESTADO

// Guardar aquí en qué pregunta esta el usuario y cuántos puntos lleva cada casa
const estado = {
  preguntaActual: 0,
  puntos: {
    gryffindor: 0,
    slytherin: 0,
    ravenclaw: 0,
    hufflepuff: 0,
  },
};

// ── FUNCIONES

// Muestra la pregunta actual y sus opciones en el contenedor del quiz
function renderPregunta() {
  const contenedor = document.getElementById("quiz-container");
  const pregunta = preguntasActuales[estado.preguntaActual];
  const numeroPregunta = estado.preguntaActual + 1;

  // Construir el HTML de la pregunta con sus botones de opción
  contenedor.innerHTML = `
    <p class="quiz-progreso">Pregunta ${numeroPregunta} de ${preguntasActuales.length}</p>
    <p class="quiz-pregunta">${pregunta.texto}</p>
    <div class="quiz-opciones">
      ${pregunta.opciones
        .map(
          (opcion) => `
        <button class="quiz-opcion" data-casa="${opcion.casa}">
          ${opcion.texto}
        </button>
      `,
        )
        .join("")}
    </div>
  `;

  // Añadir el listener de clic a cada botón de opción
  contenedor.querySelectorAll(".quiz-opcion").forEach((btn) => {
    btn.addEventListener("click", () => elegirOpcion(btn.dataset.casa));
  });
}

// Se ejecuta cuando el usuario elige una opción
function elegirOpcion(casa) {
  // Sumar el punto a la casa elegida
  estado.puntos[casa]++;
  estado.preguntaActual++;

  // Si quedan preguntas, mostrar la siguiente; si no, el resultado
  if (estado.preguntaActual < preguntasActuales.length) {
    renderPregunta();
  } else {
    mostrarResultado();
  }
}

// Calcula la casa ganadora y muestra el resultado
function mostrarResultado() {
  const contenedor = document.getElementById("quiz-container");

  // Ordenar las casas por puntos (de mayor a menor) y coger la primera
  const casaGanadora = Object.entries(estado.puntos).sort(
    ([, a], [, b]) => b - a,
  )[0][0];

  const casa = CASAS[casaGanadora];

  contenedor.innerHTML = `
    <div class="quiz-resultado" style="border-color: ${casa.color};">
      <p class="quiz-resultado-titulo" style="color: ${casa.color};">
        Tu casa es: ${casa.nombre}
      </p>
      <p class="quiz-resultado-descripcion">${casa.descripcion}</p>
      <button class="quiz-reiniciar" id="btn-reiniciar">Volver a intentarlo</button>
    </div>
  `;

  document
    .getElementById("btn-reiniciar")
    .addEventListener("click", reiniciarQuiz);
}

// Reinicia el quiz volviendo al estado inicial y mezclando las preguntas de nuevo
function reiniciarQuiz() {
  estado.preguntaActual = 0;
  estado.puntos = { gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 };
  preguntasActuales = mezclar(PREGUNTAS);
  renderPregunta();
}

// ── INICIO

// Mezclar las preguntas y arrancar el quiz al cargar la página
let preguntasActuales = mezclar(PREGUNTAS);
renderPregunta();
