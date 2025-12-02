// ===============================
// Funciones para scroll suave a secciones
// ===============================

// Desplaza suavemente a la sección PVC
function scrollToPVC() {
    const pvcSection = document.getElementById('aberturas-section2-mainimage-title');
    if (pvcSection) {
        pvcSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Desplaza suavemente a la sección Aluminio
function scrollToAluminio() {
    const aluSection = document.getElementById('aberturas-section5-aluminio-main-title');
    if (aluSection) {
        aluSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// ===============================
// Función para activar scroll con teclado por accesibilidad
// ===============================
function handleKeyNavigation(event, callback) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        callback();
    }
}

// ===============================
// Asignación de eventos a botones scroll
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const btnPVC = document.getElementById('aberturas-section1-scroll-buttonLeft');
    if (btnPVC) {
        btnPVC.addEventListener('click', scrollToPVC);
        btnPVC.addEventListener('keydown', function (e) { handleKeyNavigation(e, scrollToPVC); });
    }
    const btnAlu = document.getElementById('aberturas-section1-scroll-buttonRight');
    if (btnAlu) {
        btnAlu.addEventListener('click', scrollToAluminio);
        btnAlu.addEventListener('keydown', function (e) { handleKeyNavigation(e, scrollToAluminio); });
    }
});