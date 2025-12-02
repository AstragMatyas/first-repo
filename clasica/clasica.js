/* ===========================
   INICIO: SECCION 2
=========================== */
function cambiarImagenes(color){
  const items = document.querySelectorAll('.item');
  items.forEach(item => {
    const img = item.querySelector("img");

    if ((color === "negro" || color === "gris") && !img.dataset[color]) {
      item.classList.add("oculto"); // oculta imagen + texto
    } else {
      item.classList.remove("oculto");
      img.style.opacity = 0;
      setTimeout(() => {
        img.src = img.getAttribute(`data-${color}`);
        img.style.opacity = 1;
      }, 300);
    }
  });
}

/*seccion de modelos - problema de wordpress con la seleccion de etiquetas*/
document.addEventListener("DOMContentLoaded", function () {
  // Para cada grupo de botones con clase .botones
  document.querySelectorAll(".botones").forEach((grupo) => {
    // Activación por delegación (sirve para <button>, <a> o .wp-element-button)
    grupo.addEventListener("click", function (e) {
      const btn = e.target.closest("button, a, .wp-element-button");
      if (!btn || !grupo.contains(btn)) return;

      // Marcar solo el clickeado
      grupo.querySelectorAll(".active").forEach(el => el.classList.remove("active"));
      btn.classList.add("active");

      // Evita que un <a href="#"> salte a la parte superior
      if (btn.tagName === "A" && (!btn.getAttribute("href") || btn.getAttribute("href") === "#")) {
        e.preventDefault();
      }
    });

    // Si no hay ninguno activo al cargar, activar el primero
    if (!grupo.querySelector(".active")) {
      const primero = grupo.querySelector("button, a, .wp-element-button");
      if (primero) primero.classList.add("active");
    }
  });
});
/* ===========================
   FIN: SECCION 2
=========================== */