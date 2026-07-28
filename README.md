# ⚡El Rincón Mágico de un Desarrollador Potterhead

Portfolio personal temático basado en el universo de **Harry Potter**. Nació como práctica de HTML y CSS y ha evolucionado hasta incluir JavaScript vanilla, consumo de una API REST y varias funcionalidades interactivas.

---

## 🧙 Características

### Quiz — ¿A qué casa perteneces?
- 8 preguntas con 4 opciones cada una
- El orden de las preguntas se mezcla aleatoriamente en cada partida (algoritmo Fisher-Yates)
- Calcula la casa ganadora por puntos y muestra el resultado con su descripción y colores

### Buscador de hechizos
- Dataset local de 30 hechizos con nombre, incantación, categoría y descripción en español
- Filtro en tiempo real mientras se escribe
- Se optó por datos locales en español en lugar de la API (que solo devuelve inglés)

### Explorador de personajes
- Carga todos los personajes disponibles en la [PotterDB API](https://api.potterdb.com) paginando automáticamente (400+ personajes)
- Buscador por nombre en tiempo real
- Filtro por casa (Gryffindor, Slytherin, Ravenclaw, Hufflepuff)
- Búsqueda y filtro funcionan combinados
- Estado inicial limpio: no se muestran tarjetas hasta que el usuario interactúa

### Modal de detalle de personaje
- Clic en cualquier tarjeta abre un modal con foto, casa, especie, género, patronus, ancestría, actor/actriz y fecha de nacimiento
- Se cierra con el botón, clic fuera del modal o tecla Escape
- Navegable con teclado (Enter / Espacio en la tarjeta)

### Modo claro / oscuro
- Botón en el nav alterna entre el tema oscuro (por defecto) y un tema claro tipo pergamino
- Implementado con variables CSS (`body.tema-claro` sobreescribe `:root`)
- Preferencia guardada en `localStorage` y recuperada al recargar

---

## 🛠️ Tecnologías

| Tecnología | Uso |
| :--- | :--- |
| **HTML5** | Estructura semántica, accesibilidad (skip link, aria-label, roles) |
| **CSS3** | Variables custom, Flexbox, diseño responsive, animaciones |
| **JavaScript ES6+** | DOM, eventos, fetch, async/await, localStorage |
| **PotterDB API** | Fuente de datos de personajes (`https://api.potterdb.com/v1`) |
| **Google Fonts** | Cinzel Decorative, EB Garamond, IM Fell English SC, entre otras |
| **Git & GitHub** | Control de versiones |

Sin frameworks, sin librerías externas, sin herramientas de build.

---

## Uso

Abre `index.html` directamente en el navegador. No requiere servidor ni instalación.

---

## Créditos

Datos de personajes obtenidos de [PotterDB](https://potterdb.com) — API pública y gratuita.

Este proyecto es un homenaje de fans y no está afiliado ni respaldado por J.K. Rowling, Warner Bros. ni ninguna de sus subsidiarias.

---

## 👨‍💻 Autor

**Anderson Guanche**
- [GitHub](https://github.com/AndYaN07/AndYaN07)
- [LinkedIn](https://www.linkedin.com/in/anderson-guanche-ramos)
