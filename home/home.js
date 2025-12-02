/* ===========================
   INICIO: Carrusel (home slider)
=========================== */
const slides = document.querySelectorAll('.home-carrusel-slide');
const prevBtn = document.getElementById('home-carrusel-prev');
const nextBtn = document.getElementById('home-carrusel-next');
let currentIndex = 0;

// Mostrar slide según índice dado
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

// Mover al siguiente slide, con ciclo al final
function nextSlide() {
  currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
  showSlide(currentIndex);
}

// Mover al slide anterior, con ciclo al inicio
function prevSlide() {
  currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
  showSlide(currentIndex);
}

// Eventos para flechas
prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoPlay();
});
nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoPlay();
});

// Autoplay cada 3 segundos y resetear contador si se navega manualmente
let autoPlayInterval = setInterval(nextSlide, 3000);
function resetAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = setInterval(nextSlide, 3000);
}
/* ===========================
   FIN: Carrusel (home slider)
=========================== */

/* ===========================
   INICIO: Sección 2 - Flip Cards
=========================== */
const acordeon = document.querySelector('.cards-row');
const cardContainers = acordeon.querySelectorAll(".card-container");

cardContainers.forEach(cardContainer => {
  const card = cardContainer.querySelector(".card");
  cardContainer.addEventListener("click", () => {
    card.classList.toggle("flipped");
    const pressed = cardContainer.getAttribute("aria-pressed") === "true";
    cardContainer.setAttribute("aria-pressed", (!pressed).toString());
  });
  cardContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      card.classList.toggle("flipped");
      const pressed = cardContainer.getAttribute("aria-pressed") === "true";
      cardContainer.setAttribute("aria-pressed", (!pressed).toString());
    }
  });
});
/* ===========================
   FIN: Sección 2 - Flip Cards
=========================== */

/* ===========================
   INICIO: Sección 6 - Carrusel de imágenes
=========================== */

// Selección de elementos
const homeSection6Images = document.querySelectorAll('.home-section6-img');
const homeSection6PrevBtn = document.getElementById('home-section6-prevBtn');
const homeSection6NextBtn = document.getElementById('home-section6-nextBtn');
let homeSection6CurrentIndex = 0;

// Función para mostrar imagen activa según índice y ocultar las demás
function homeSection6ShowImage(index) {
  homeSection6Images.forEach((img, i) => {
    img.classList.toggle('active', i === index);
  });
}

// Comprobar que botones y imágenes existan antes de asignar eventos
if (homeSection6PrevBtn && homeSection6NextBtn && homeSection6Images.length > 0) {
  
  homeSection6PrevBtn.addEventListener('click', () => {
    homeSection6CurrentIndex =
      homeSection6CurrentIndex === 0
        ? homeSection6Images.length - 1
        : homeSection6CurrentIndex - 1;
    homeSection6ShowImage(homeSection6CurrentIndex);
  });

  homeSection6NextBtn.addEventListener('click', () => {
    homeSection6CurrentIndex =
      homeSection6CurrentIndex === homeSection6Images.length - 1
        ? 0
        : homeSection6CurrentIndex + 1;
    homeSection6ShowImage(homeSection6CurrentIndex);
  });

  // Inicializar mostrando la primera imagen
  homeSection6ShowImage(homeSection6CurrentIndex);
} else {
  console.warn('Botones o imágenes para carrusel Sección 6 no encontrados.');
}
/* ===========================
   FIN: Sección 6 - Carrusel de imágenes
=========================== */