/* -------------------- CARRUSEL GENERAL MODULAR -------------------- */

/**
 * Función para inicializar un carrusel
 * @param {Array<string>} btnExploreIds - Array con los ids de botones "explorar" para scroll suave
 * @param {string} containerSelector - Selector del contenedor principal del carrusel
 * @param {string} slideSelector - Selector de cada slide dentro del carrusel
 * @param {string} thumbSelector - Selector para thumbnails o tabs (opcional)
 * @param {string} leftArrowSelector - Selector para botón flecha izquierda dentro de cada slide
 * @param {string} rightArrowSelector - Selector para botón flecha derecha dentro de cada slide
 * @param {string} keyboardContainerSelector - Selector para contenedor donde manejar eventos de teclado (normalmente el container principal)
 */
function initCarousel({
  containerSelector,
  slideSelector,
  thumbSelector = null,
  leftArrowSelector,
  rightArrowSelector,
  keyboardContainerSelector,
}) {
  const carouselContainer = document.querySelector(containerSelector);
  if (!carouselContainer) {
    console.warn(`El contenedor ${containerSelector} no existe`);
    return;
  }

  const slides = carouselContainer.querySelectorAll(slideSelector);
  if (!slides.length) {
    console.warn(`No se encontraron slides con selector ${slideSelector}`);
    return;
  }

  const thumbs = thumbSelector
    ? carouselContainer
        .closest(keyboardContainerSelector)
        ?.querySelectorAll(thumbSelector)
    : [];

  let current = 0;

  // Actualiza accesibilidad (tabindex, aria-hidden) de flechas y slides
  function updateNavigationAccessibility() {
    slides.forEach((slide, index) => {
      const leftArrow = slide.querySelector(leftArrowSelector);
      const rightArrow = slide.querySelector(rightArrowSelector);
      const isActive = index === current;

      if (leftArrow) leftArrow.tabIndex = isActive ? 0 : -1;
      if (rightArrow) rightArrow.tabIndex = isActive ? 0 : -1;

      slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      slide.tabIndex = isActive ? 0 : -1;
    });
  }

  // Muestra slide indicado y actualiza estado y accesibilidad
  function showSlide(index) {
    if (index === current) return;
    slides[current].classList.remove(`${slideSelector.substring(1)}-active`);
    current = index;
    slides[current].classList.add(`${slideSelector.substring(1)}-active`);
    updateNavigationAccessibility();
    updateActiveThumb();
  }

  // Navegación a slide anterior
  function navLeft() {
    const newIndex = current === 0 ? slides.length - 1 : current - 1;
    showSlide(newIndex);
  }

  // Navegación a slide siguiente
  function navRight() {
    const newIndex = current === slides.length - 1 ? 0 : current + 1;
    showSlide(newIndex);
  }

  // Actualiza estado y accesibilidad de thumbnails si están definidos
  function updateActiveThumb() {
    if (!thumbs || thumbs.length === 0) return;
    thumbs.forEach((thumb, idx) => {
      const selected = idx === current;
      thumb.classList.toggle("active", selected);
      thumb.setAttribute("aria-selected", selected ? "true" : "false");
      thumb.tabIndex = selected ? 0 : -1;
    });
  }

  // Evento click en thumbnails para mostrar slide correspondiente
  if (thumbs && thumbs.length > 0) {
    thumbs.forEach((thumb, idx) => {
      thumb.setAttribute("role", "tab");
      thumb.addEventListener("click", () => {
        showSlide(idx);
        thumb.focus();
      });
      thumb.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          showSlide(idx);
          thumb.focus();
        }
      });
    });
  }

  // Asociar eventos de clic a flechas izquierda y derecha de cada slide
  slides.forEach((slide) => {
    const leftArrow = slide.querySelector(leftArrowSelector);
    const rightArrow = slide.querySelector(rightArrowSelector);
    if (leftArrow) leftArrow.addEventListener("click", navLeft);
    if (rightArrow) rightArrow.addEventListener("click", navRight);
  });

  // Evento teclado para navegación por flechas cuando el foco está dentro del contenedor definido
  if (keyboardContainerSelector) {
    const keyboardContainer = document.querySelector(keyboardContainerSelector);
    if (keyboardContainer) {
      keyboardContainer.addEventListener("keydown", (e) => {
        if (document.activeElement.closest(containerSelector)) {
          switch (e.key) {
            case "ArrowLeft":
              e.preventDefault();
              navLeft();
              break;
            case "ArrowRight":
              e.preventDefault();
              navRight();
              break;
            case "Home":
              e.preventDefault();
              showSlide(0);
              if (thumbs && thumbs.length) thumbs[0].focus();
              break;
            case "End":
              e.preventDefault();
              showSlide(slides.length - 1);
              if (thumbs && thumbs.length) thumbs[slides.length - 1].focus();
              break;
          }
        }
      });
    }
  }

  // Inicializar accesibilidad y estado inicial
  updateActiveThumb();
  updateNavigationAccessibility();
}

/**
 * Función para inicializar el carrusel simple con manejo de reproducción de video automática
 */
function initSimpleCarousel(containerSelector, btnExploreIds) {
  const slides = document.querySelectorAll(".piv-sectionCarrusel-slide");
  let current = 0;

  // Obtener los botones explorar por id (pueden no existir)
  const btnExplores = btnExploreIds.map((id) => document.getElementById(id));

  // Actualiza tabindex para mejorar accesibilidad: sólo botones flecha del slide activo tienen tabindex=0
  function updateNavigationAccessibility() {
    slides.forEach((slide, index) => {
      const leftArrow = slide.querySelector(".piv-sectionCarrusel-arrow-left");
      const rightArrow = slide.querySelector(
        ".piv-sectionCarrusel-arrow-right"
      );
      const isActive = index === current;
      if (leftArrow) leftArrow.tabIndex = isActive ? 0 : -1;
      if (rightArrow) rightArrow.tabIndex = isActive ? 0 : -1;
    });
  }

  // Control de reproducción y pausa de videos según el slide activo
  function handleVideoPlayback() {
    slides.forEach((slide, index) => {
      const video = slide.querySelector("video");
      if (video) {
        if (index === current) {
          video.play().catch(() => {
            // En caso de bloqueo de autoplay, se silencia y vuelve a intentar
            video.muted = true;
            video.play().catch(() => {});
          });
        } else {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }

  // Añade listener para evitar que click pause o abra el video fuera del carrusel
  slides.forEach((slide) => {
    const video = slide.querySelector("video");
    if (video) {
      video.addEventListener("click", (e) => {
        e.preventDefault();
        if (video.paused) video.play();
      });
    }
  });

  // Muestra slide y actualiza visibilidad, accesibilidad y videos
  function showSlide(index) {
    slides[current].classList.remove("piv-sectionCarrusel-slide-active");
    current = index;
    slides[current].classList.add("piv-sectionCarrusel-slide-active");
    updateNavigationAccessibility();
    handleVideoPlayback();
  }

  // Navegación circular al slide anterior
  function navLeft() {
    const newIndex = current === 0 ? slides.length - 1 : current - 1;
    showSlide(newIndex);
  }

  // Navegación circular al slide siguiente
  function navRight() {
    const newIndex = current === slides.length - 1 ? 0 : current + 1;
    showSlide(newIndex);
  }

  // Asociar eventos click a flechas izquierda y derecha
  slides.forEach((slide) => {
    const leftArrow = slide.querySelector(".piv-sectionCarrusel-arrow-left");
    const rightArrow = slide.querySelector(".piv-sectionCarrusel-arrow-right");
    if (leftArrow) leftArrow.addEventListener("click", navLeft);
    if (rightArrow) rightArrow.addEventListener("click", navRight);
  });

  // Eventos click para botones explorar con scroll suave y foco
  btnExplores.forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
          targetSection.focus();
        }
      });
    }
  });

  // Navegación por teclado con flechas si el foco está dentro del carrusel
  document.addEventListener("keydown", function (e) {
    if (document.activeElement.closest(containerSelector)) {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navLeft();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navRight();
      }
    }
  });

  // Inicializar accesibilidad y reproducción al cargar la página
  updateNavigationAccessibility();
  handleVideoPlayback();
}

// Inicialización de todos los carruseles de la página, completamente aislados

document.addEventListener("DOMContentLoaded", () => {
  initSimpleCarousel(".piv-sectionCarrusel-carousel", [
    "piv-sectionCarrusel-button-1",
    "piv-sectionCarrusel-button-2",
    "piv-sectionCarrusel-button-3",
    "piv-sectionCarrusel-button-4",
  ]);

  initCarousel({
    containerSelector: "#pivot-sectionLisas-carousel",
    slideSelector: ".pivot-sectionLisas-slide",
    thumbSelector: ".pivot-sectionLisas-Thumb",
    leftArrowSelector: ".pivot-sectionLisas-arrow-left",
    rightArrowSelector: ".pivot-sectionLisas-arrow-right",
    keyboardContainerSelector: ".pivot-sectionLisas-Container",
  });

  initCarousel({
    containerSelector: "#pivot-sectionLisas2-carousel",
    slideSelector: ".pivot-sectionLisas2-slide",
    thumbSelector: ".pivot-sectionLisas2-Thumb",
    leftArrowSelector: ".pivot-sectionLisas2-arrow-left",
    rightArrowSelector: ".pivot-sectionLisas2-arrow-right",
    keyboardContainerSelector: ".pivot-sectionLisas2-Container",
  });

  initCarousel({
    containerSelector: "#pivot-sectionHorizontales-carousel",
    slideSelector: ".pivot-sectionHorizontales-slide",
    thumbSelector: ".pivot-sectionHorizontales-Thumb-extra",
    leftArrowSelector: ".pivot-sectionHorizontales-arrow-left",
    rightArrowSelector: ".pivot-sectionHorizontales-arrow-right",
    keyboardContainerSelector: ".pivot-sectionHorizontales-Container",
  });

  initCarousel({
    containerSelector: "#pivot-sectionWallPanel-carousel",
    slideSelector: ".pivot-sectionWallPanel-slide",
    thumbSelector: ".pivot-sectionWallPanel-Thumb",
    leftArrowSelector: ".pivot-sectionWallPanel-arrow-left",
    rightArrowSelector: ".pivot-sectionWallPanel-arrow-right",
    keyboardContainerSelector: ".pivot-sectionWallPanel-Container",
  });

  initCarousel({
    containerSelector: "#pivot-sectionModNuevo-carousel",
    slideSelector: ".pivot-sectionModNuevo-slide",
    thumbSelector: ".pivot-sectionModNuevo-Thumb",
    leftArrowSelector: ".pivot-sectionModNuevo-arrow-left",
    rightArrowSelector: ".pivot-sectionModNuevo-arrow-right",
    keyboardContainerSelector: ".pivot-sectionModNuevo-Container",
  });
});
