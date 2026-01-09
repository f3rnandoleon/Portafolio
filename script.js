const secciones = document.querySelectorAll("section");
const enlacesNav = document.querySelectorAll(".enlace-nav");

function actualizarNavegacion() {
  let seccionActual = "";

  secciones.forEach(seccion => {
    const topSeccion = seccion.offsetTop - 150;
    if (window.scrollY >= topSeccion) {
      seccionActual = seccion.getAttribute("id");
    }
  });

  enlacesNav.forEach(enlace => {
    enlace.classList.remove("activo");
    if (enlace.getAttribute("href") === `#${seccionActual}`) {
      enlace.classList.add("activo");
    }
  });
}

window.addEventListener("scroll", actualizarNavegacion);
actualizarNavegacion();

const observadorRevelar = new IntersectionObserver(
  entradas => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("activo");
      } else {
        entrada.target.classList.remove("activo");
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll(".revelar").forEach(elemento => {
  observadorRevelar.observe(elemento);
});

const textoTyping = document.getElementById("texto-typing");
const iconoTyping = document.getElementById("icono-typing");

const roles = [
  { texto: "INGENIERO DE SISTEMAS", icono: "fa-solid fa-gears" },
  { texto: "DESARROLLADOR FULL STACK", icono: "fa-solid fa-code" },
  { texto: "DESARROLLADOR WEB", icono: "fa-solid fa-globe" },
  { texto: "ANALISTA DE SISTEMAS", icono: "fa-solid fa-chart-line" }
];

let indiceRol = 0;
let indiceCaracter = 0;
let borrando = false;

function efectoTyping() {
  const rolActual = roles[indiceRol];

  iconoTyping.className = rolActual.icono;

  if (!borrando) {
    textoTyping.textContent = rolActual.texto.substring(0, indiceCaracter + 1);
    indiceCaracter++;

    if (indiceCaracter === rolActual.texto.length) {
      setTimeout(() => borrando = true, 1400);
    }
  } else {
    textoTyping.textContent = rolActual.texto.substring(0, indiceCaracter - 1);
    indiceCaracter--;

    if (indiceCaracter === 0) {
      borrando = false;
      indiceRol = (indiceRol + 1) % roles.length;
    }
  }

  setTimeout(efectoTyping, borrando ? 60 : 90);
}

efectoTyping();
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("activo");
});

document.querySelectorAll(".nav-links .enlace-nav").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("activo");
  });
});

const form = document.querySelector(".contacto-formulario");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const status = document.createElement("p");
    status.style.marginTop = "12px";
    status.style.fontSize = "0.9rem";

    const data = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        status.textContent = "Mensaje enviado correctamente ";
        status.style.color = "#16a34a";
        form.reset();
      } else {
        status.textContent = "Error al enviar el mensaje ";
        status.style.color = "#dc2626";
      }
    } catch (error) {
      status.textContent = "Error de conexión ";
      status.style.color = "#dc2626";
    }

    form.appendChild(status);

    setTimeout(() => status.remove(), 4000);
  });
}
