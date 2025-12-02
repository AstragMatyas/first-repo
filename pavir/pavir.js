document.addEventListener("DOMContentLoaded", () => {
  // Selecciona acordeones con la clase común general
  const acordeones = document.querySelectorAll(
    "section.pavir-section-acordeon"
  );

  acordeones.forEach((acordeon) => {
    const toggleButton = acordeon.querySelector(".pavir-section-button");
    const acordeonContent = acordeon.querySelector(".pavir-section-content");
    const closeButton = acordeon.querySelector(".pavir-section-close-button");

    // Estado inicial cerrado
    acordeon.classList.add("cerrado");
    if (acordeonContent) acordeonContent.hidden = true;
    if (toggleButton) {
      toggleButton.setAttribute("aria-expanded", "false");
      toggleButton.textContent = "CARACTERISTICAS | MODELOS";
    }

    if (toggleButton && acordeonContent) {
      toggleButton.addEventListener("click", () => {
        const isExpanded =
          toggleButton.getAttribute("aria-expanded") === "true";
        acordeonContent.hidden = isExpanded;
        toggleButton.setAttribute("aria-expanded", String(!isExpanded));
        toggleButton.textContent = isExpanded
          ? "CARACTERISTICAS | MODELOS"
          : "Ocultar contenido";
        acordeon.classList.toggle("abierto", !isExpanded);
        acordeon.classList.toggle("cerrado", isExpanded);
      });
    }

    if (closeButton && toggleButton && acordeonContent) {
      closeButton.addEventListener("click", () => {
        acordeonContent.hidden = true;
        toggleButton.setAttribute("aria-expanded", "false");
        toggleButton.textContent = "CARACTERISTICAS | MODELOS";
        acordeon.classList.remove("abierto");
        acordeon.classList.add("cerrado");
      });
    }

    // Configurar tarjetas flip con la nueva clase común
    const cardContainers = acordeon.querySelectorAll(".pavir-card-container");
    cardContainers.forEach((cardContainer) => {
      const card = cardContainer.querySelector(".pavir-card");
      if (!card) return;
      const toggleFlip = () => {
        card.classList.toggle("flipped");
        const pressed = cardContainer.getAttribute("aria-pressed") === "true";
        cardContainer.setAttribute("aria-pressed", String(!pressed));
      };
      cardContainer.addEventListener("click", toggleFlip);
      cardContainer.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleFlip();
        }
      });
    });
  });

  // Datos productos (completa aquí con tus arrays de productos)
  const productos_pavir = [
    {
      nombre: "47 LISA",
      descripcion: "Sin manijón",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/47lisa-ba-sm-scaled.webp",
      imagen_gg: "",
    },
    {
      nombre: "47 LISA",
      descripcion: "Con manijón",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/47lisa-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/47lisa-gg-scaled.webp",
    },
    {
      nombre: "49 LISA ",
      descripcion: "Sin manijón",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/49lisa-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/49lisa-gg-scaled.webp",
    },
    {
      nombre: "50 VERONA FALTA",
      descripcion: "",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/47lisa-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/47lisa-gg-scaled.webp",
    },
    {
      nombre: "56 IMPERIA",
      descripcion: "",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/56imperia-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/56imperia-gg-scaled.webp",
    },
    {
      nombre: "56 IMPERIA MULTIPUNTO",
      descripcion: "",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/56imperia-ba-scaled.webp",
      imagen_gg: "",
    },
    {
      nombre: "69 FLORENCIA 1/2 REJA",
      descripcion: "Vidrio incluido",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/69florencia1-2reja-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/69florencia1-2reja-gg-scaled.webp",
    },
    {
      nombre: "71 FUTURA",
      descripcion: "",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/71futura-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/71futura-gg-1-scaled.webp",
    },
    {
      nombre: "76 LIGURIA",
      descripcion: "",
      imagen_ba: "",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/76liguria-scaled.webp",
    },
    {
      nombre: "78 GENOVA",
      descripcion: "",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/78genova-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/78genova-gg-scaled.webp",
    },
    {
      nombre: "78 GENOVA MULTIPUNTO",
      descripcion: "",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/78genova-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/78genova-gg-scaled.webp",
    },
    {
      nombre: "79 TRENTINA",
      descripcion: "",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/79trentina-scaled.webp",
      imagen_gg: "",
    },
    {
      nombre: "50 LATERAL VERONA",
      descripcion: "Vidrio Stipolite",
      imagen_ba: "",
      imagen_gg: "",
    },
    {
      nombre: "91 LATERAL CON VIDRIO ",
      descripcion: "Vidrio Fijo Stipolite - imagen con buena calidad",
      imagen_ba: "",
      imagen_gg: "",
    },
  ];

  const productos_residenciales = [
    {
      nombre: "49 LISA",
      descripcion: "Ciega",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-ciega-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-ciega-gg-scaled.webp",
      imagen_caoba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-ciega-caoba-scaled.webp",
      imagen_roble:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-ciega-roble-scaled.webp",
    },
    {
      nombre: "49 LISA",
      descripcion: "Postigo Fijo",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-postigo-fijo-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-postigo-fijo-gg-scaled.webp",
      imagen_caoba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-postigo-fijo-caoba-scaled.webp",
      imagen_roble:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-postigo-fijo-roble-scaled.webp",
    },
    {
      nombre: "50 VERONA",
      descripcion: "Ciega",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/verona-ciega-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/verona-ciega-gg-scaled.webp",
      imagen_caoba: "",
      imagen_roble:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/verona-ciega-roble-scaled.webp",
    },
    {
      nombre: "50 VERONA",
      descripcion: "Postigo Fijo",
      imagen_ba: "",
      imagen_gg: "",
      imagen_caoba: "",
      imagen_roble:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/verona-postigo-fijo-roble-scaled.webp",
    },
    {
      nombre: "50 VERONA",
      descripcion: "Postigo de Abrir ",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/verona-postigo-abrir-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/verona-postigo-abrir-gg-scaled.webp",
      imagen_caoba: "",
      imagen_roble: "",
    },
    {
      nombre: "56 IMPERIA",
      descripcion: "Ciega",
      imagen_ba: "",
      imagen_gg: "",
      imagen_caoba: "",
      imagen_roble: "",
    },
    {
      nombre: "56 IMPERIA",
      descripcion: "Ciega",
      imagen_ba: "",
      imagen_gg: "",
      imagen_caoba: "",
      imagen_roble:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/imperia-ciega-roble-scaled.webp",
    },
    {
      nombre: "56 IMPERIA",
      descripcion: "Postigo Fijo",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/imperia-postigo-fijo-roble-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/imperia-postigo-fijo-roble-scaled.webp",
      imagen_caoba: "",
      imagen_roble:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/imperia-postigo-fijo-roble-scaled.webp",
    },
    {
      nombre: "56 IMPERIA",
      descripcion: "Postigo de Abrir",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/56imperia-postigo-abrir-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/56imperia-postigo-abrir-gg-scaled.webp",
      imagen_caoba: "",
      imagen_roble: "",
    },
    {
      nombre: "71 FUTURA",
      descripcion: "Ciega",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/71futura-ciega-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/71futura-ciega-gg-scaled.webp",
      imagen_caoba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/futura-ciega-caoba-scaled.webp",
      imagen_roble:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/futura-ciega-roble-scaled.webp",
    },
    {
      nombre: "71 FUTURA",
      descripcion: "Postigo Fijo",
      imagen_ba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/71futura-postigo-fijo-ba-scaled.webp",
      imagen_gg:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/71futura-postigo-fijo-gg-scaled.webp",
      imagen_caoba:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/futura-postigo-fijo-caoba-scaled.webp",
      imagen_roble:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/futura-postigo-fijo-roble-scaled.webp",
    },
  ];

  const productos_similAcero = [
    {
      nombre: "71 Futura",
      descripcion: "Fresno",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/futura-fresno-scaled.webp",
    },
    {
      nombre: "71 Futura",
      descripcion: "Caoba",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/futura-caoba-scaled.webp",
    },
    {
      nombre: "71 Futura",
      descripcion: "Muzgo",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/futura-muzgo-scaled.webp",
    },
    {
      nombre: "71 Futura",
      descripcion: "Roble",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/futura-roble-scaled.webp",
    },
    {
      nombre: "56 IMPERIA",
      descripcion: "Roble",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/imperia-roble-scaled.webp",
    },
    {
      nombre: "56 IMPERIA",
      descripcion: "Fresno",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/imperia-fresno-scaled.webp",
    },
    {
      nombre: "49 LISA",
      descripcion: "Roble",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-roble-scaled.webp",
    },
    {
      nombre: "49 LISA",
      descripcion: "Caoba",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-caoba-scaled.webp",
    },
    {
      nombre: "49 LISA",
      descripcion: "Entablonada",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-entablonada-scaled.webp",
    },
    {
      nombre: "49 LISA",
      descripcion: "Fresno",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-fresno-scaled.webp",
    },
    {
      nombre: "49 LISA",
      descripcion: "Texturada",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-texturada-scaled.webp",
    },
    {
      nombre: "49 LISA",
      descripcion: "Texturada decorativa",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/lisa-texturada-decorativa-scaled.webp",
    },
    {
      nombre: "50 VERONA",
      descripcion: "Fresno",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/verona-fresno-scaled.webp",
    },
    {
      nombre: "50 VERONA",
      descripcion: "Roble",
      imagen:
        "https://am-subdominio.pavir.com.ar/wp/wp-content/uploads/2025/09/verona-roble-scaled.webp",
    },
  ];

  // Referencias a grids con los IDs usados en el nuevo HTML
  const gridPavir =
    document.getElementById("pavir-grid-modelos") ||
    document.querySelector(".pavir-grid.modelos");
  const gridResidencial =
    document.getElementById("pavir-grid-residenciales") ||
    document.querySelector(".pavir-grid.residenciales");
  const gridAceroSimil =
    document.getElementById("pavir-grid-acerosimil") ||
    document.querySelector(".pavir-grid.acerosimil");

  // Función para limpiar clases "active" en botones hermanos
  function limpiarActivos(container) {
    if (!container) return;
    container
      .querySelectorAll("button.active")
      .forEach((btn) => btn.classList.remove("active"));
  }

  // Función para mostrar imágenes en el grid indicado
  function mostrarImagenes(tipoColor, arrayProductos, gridSeccion) {
    if (!gridSeccion) {
      console.warn("Grid no encontrado para mostrar imágenes");
      return;
    }
    gridSeccion.innerHTML = "";
    arrayProductos.forEach((producto) => {
      const imagen = producto[tipoColor];
      if (imagen) {
        const div = document.createElement("div");
        div.classList.add("pavir-item");
        div.innerHTML = `
          <img src="${imagen}" alt="${producto.nombre}">
          <h4>${producto.nombre}</h4>
          <p>${producto.descripcion || ""}</p>
        `;
        gridSeccion.appendChild(div);
      }
    });
  }

  // Función especial para acero simil
  function mostrarImagenesAceroSimil(arrayProductos, gridSeccion) {
    if (!gridSeccion) {
      console.warn("Grid Acero Simil no encontrado.");
      return;
    }
    gridSeccion.innerHTML = "";
    arrayProductos.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("pavir-item");
      div.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <h4>${producto.nombre}</h4>
        <p>${producto.descripcion || ""}</p>
      `;
      gridSeccion.appendChild(div);
    });
  }

  // Mostrar imágenes iniciales para Pavir y Residencial
  mostrarImagenes("imagen_ba", productos_pavir, gridPavir);
  mostrarImagenes("imagen_ba", productos_residenciales, gridResidencial);

  // Manejo de botones dentro de contenedores con clase común pavir-botones
  document.querySelectorAll(".pavir-botones").forEach((contenedor) => {
    contenedor.querySelectorAll("button").forEach((boton) => {
      boton.addEventListener("click", (e) => {
        limpiarActivos(contenedor);
        e.target.classList.add("active");
        console.log("Botón clickeado:", e.target.id);
        switch (e.target.id) {
          case "pavir-btnBlancoAntartida-modelos":
            mostrarImagenes("imagen_ba", productos_pavir, gridPavir);
            break;
          case "pavir-btnGrisGrafito-modelos":
            mostrarImagenes("imagen_gg", productos_pavir, gridPavir);
            break;
          case "pavir-btnBlancoAntartida-residenciales":
            mostrarImagenes(
              "imagen_ba",
              productos_residenciales,
              gridResidencial
            );
            break;
          case "pavir-btnGrisGrafito-residenciales":
            mostrarImagenes(
              "imagen_gg",
              productos_residenciales,
              gridResidencial
            );
            break;
          case "pavir-btnCaoba-residenciales":
            mostrarImagenes(
              "imagen_caoba",
              productos_residenciales,
              gridResidencial
            );
            break;
          case "pavir-btnRoble-residenciales":
            mostrarImagenes(
              "imagen_roble",
              productos_residenciales,
              gridResidencial
            );
            break;
        }
      });
    });
  });

  // Listener específico para botón Acero Simil
  const botonAceroSimil = document.getElementById(
    "pavir-section3-toggle-button"
  );
  if (botonAceroSimil) {
    botonAceroSimil.addEventListener("click", () => {
      console.log("Botón Acero Simil clickeado");
      mostrarImagenesAceroSimil(productos_similAcero, gridAceroSimil);
    });
  } else {
    console.warn("Botón Acero Simil no encontrado");
  }
});

/* ===========================
   INICIO: CARRUSEL HERO
=========================== */
const cards = document.querySelectorAll(".pavir-carruselPrincipal-card");
const hero = document.getElementById("pavir-carruselPrincipal-hero");
const info = document.getElementById("pavir-carruselPrincipal-info");

const titleToIdMap = {
  "BLANCO ANTÁRTIDA": "pavir-section1-acordeon",
  "GRIS GRAFITO": "pavir-section1-acordeon",
  RESIDENCIALES: "pavir-section2-acordeon",
  "ACERO SÍMIL": "pavir-section3-acordeon",
  // Agregar todos los títulos con sus ids destino
};

// Función para asignar el contenido al info y configurar el botón
function actualizarInfoYBoton(title, text, bg) {
  hero.style.backgroundImage = `url('${bg}')`;

  info.innerHTML = `
    <h2>${title}</h2>
    <p>${text}</p>
    <button id="pavir-carruselPrincipal-verLinea">Ver línea</button>
  `;

  const btn = document.getElementById("pavir-carruselPrincipal-verLinea");
  btn.addEventListener("click", () => {
    const idDestino = titleToIdMap[title];
    if (idDestino) {
      const elementoDestino = document.getElementById(idDestino);
      if (elementoDestino) {
        elementoDestino.scrollIntoView({ behavior: "smooth" });
      } else {
        alert("Sección destino no encontrada.");
      }
    } else {
      alert("No hay destino asignado para este título.");
    }
  });
}

// Evento click en cada card para actualizar info y fondo
cards.forEach((card) => {
  card.addEventListener("click", () => {
    const bg = card.dataset.bg;
    const title = card.dataset.title;
    const text = card.dataset.text;
    actualizarInfoYBoton(title, text, bg);
  });
});

// Preseleccionar la card "BLANCO ANTÁRTIDA" al cargar el DOM para evitar error inicial
document.addEventListener("DOMContentLoaded", () => {
  const cardInicial = Array.from(cards).find(
    (c) => c.dataset.title === "BLANCO ANTÁRTIDA"
  );
  if (cardInicial) {
    actualizarInfoYBoton(
      cardInicial.dataset.title,
      cardInicial.dataset.text,
      cardInicial.dataset.bg
    );
  }
});
/* ===========================
   FIN: CARRUSEL HERO
=========================== */
