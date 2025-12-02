/* ===========================
   INICIO: Navegación (nav) mejorada
=========================== */
const navTop = document.querySelector('.nav-top');
const hamburgerBtn = document.querySelector('.nav-hamburger');
const navMenu = document.querySelector('.nav-menu');

// Función para cerrar menú
function closeMenu() {
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
    hamburgerBtn.focus();
  }
}

// Agregar listeners si los elementos existen
if (navTop && navMenu) {
  
  // Cambio de fondo al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      navTop.classList.add('scrolled');
    } else {
      navTop.classList.remove('scrolled');
    }
  });

  // Resetear menú al cambiar tamaño de ventana
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });

  // Manejo de foco para navegación accesible
  navMenu.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && navMenu.classList.contains('active')) {
      const focusableElements = navMenu.querySelectorAll('a, button');
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) { // Tab + Shift
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else { // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });

  // Si existe el botón hamburguesa, agregamos eventos para móvil
  if (hamburgerBtn) {
    
    // Toggle menú hamburguesa móvil con accesibilidad aria-expanded
    hamburgerBtn.addEventListener('click', () => {
      const expanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
      hamburgerBtn.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('active');
    });

    // Cerrar menú si se hace clic fuera cuando está abierto
    document.addEventListener('click', (event) => {
      if (navMenu.classList.contains('active')) {
        if (!navMenu.contains(event.target) && !hamburgerBtn.contains(event.target)) {
          closeMenu();
        }
      }
    });
  }
}
/* ===========================
   FIN: Navegación (nav) mejorada
=========================== */