// ===== 1. SELECCIONAR ELEMENTOS DEL DOM =====
// Busca en el documento el primer elemento con la clase 'hamburger' (ícono de tres líneas) y lo guarda en la constante 'hamburger'.
const hamburger = document.querySelector('.hamburger');
// Busca en el documento el primer elemento con la clase 'nav-menu' (el menú de navegación) y lo guarda en la constante 'navMenu'.
const navMenu = document.querySelector('.nav-menu');

// ===== 2. EVENTO: AL HACER CLIC EN EL ÍCONO DE HAMBURGUESA =====
// Agrega un 'escuchador de eventos' (listener) al ícono de hamburguesa.
// Cuando el usuario haga clic, se ejecutará la función flecha (arrow function).
hamburger.addEventListener('click', () => {
    // Alterna (toggle) la clase 'active' en el elemento 'hamburger'.
    // Si la clase no existe, la añade; si existe, la elimina.
    // Esto normalmente se usa para animar el cambio de las tres líneas a una 'X'.
    hamburger.classList.toggle('active');
    // Alterna la clase 'active' en el menú de navegación.
    // Generalmente, esta clase en CSS hace que el menú se muestre/oculte (ej: left: 0 vs left: -100%).
    navMenu.classList.toggle('active');
});

// ===== 3. CERRAR MENÚ AUTOMÁTICAMENTE AL HACER CLIC EN UN ENLACE =====
// Selecciona TODOS los elementos con la clase 'nav-link' (los enlaces del menú).
// Por cada uno de ellos, agrega un escuchador de eventos para el clic.
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    // Elimina la clase 'active' del ícono de hamburguesa (lo vuelve a su estado normal de tres líneas).
    hamburger.classList.remove('active');
    // Elimina la clase 'active' del menú, lo que lo oculta (en móviles).
    navMenu.classList.remove('active');
}));

// ===== 4. COMENTARIO ACLARATORIO =====
// El desplazamiento suave (scroll suave) ya está implementado en el CSS gracias a 'scroll-behavior: smooth'.
// Por lo tanto, no se necesita código JavaScript adicional para esa funcionalidad.

// ===== 5. (OPCIONAL) DESTACAR EL ENLACE ACTIVO SEGÚN LA SECCIÓN VISIBLE =====
// Escucha el evento 'scroll' de toda la ventana (cuando el usuario se desplaza por la página).
window.addEventListener('scroll', () => {
    // Selecciona todas las secciones del documento (etiquetas <section>).
    const sections = document.querySelectorAll('section');
    // Selecciona todos los enlaces de navegación ('.nav-link').
    const navLinks = document.querySelectorAll('.nav-link');
    // Variable que almacenará el 'id' de la sección que actualmente está visible en la pantalla.
    let current = '';

    // Recorre cada sección para determinar cuál está siendo visualizada por el usuario.
    sections.forEach(section => {
        // Obtiene la distancia desde el borde superior de la página hasta el inicio de la sección (offsetTop),
        // y le resta 100 píxeles. Esto permite que el enlace se active un poco antes de que la sección llegue a la parte superior.
        const sectionTop = section.offsetTop - 100;
        // Obtiene la altura de la sección (clientHeight).
        const sectionHeight = section.clientHeight;
        // pageYOffset es la cantidad de píxeles que se ha desplazado verticalmente la página.
        // Si el scroll actual está entre 'sectionTop' y 'sectionTop + sectionHeight', significa que el usuario está viendo esa sección.
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            // Guarda el 'id' de la sección actual (por ejemplo: 'inicio', 'portafolio', etc.).
            current = section.getAttribute('id');
        }
    });

    // Recorre todos los enlaces de navegación.
    navLinks.forEach(link => {
        // Elimina la clase 'active' de todos los enlaces (por si alguno la tenía de antes).
        link.classList.remove('active');
        // El atributo 'href' del enlace contiene algo como '#inicio'. Lo comparamos con `#${current}`.
        // Si coinciden, significa que este enlace corresponde a la sección actualmente visible.
        if (link.getAttribute('href') === `#${current}`) {
            // Le añade la clase 'active' a ese enlace (para que se resalte visualmente, ej. con otro color o subrayado).
            link.classList.add('active');
        }
    });
});
