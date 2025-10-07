document.addEventListener('DOMContentLoaded', function() {
    const contactoBtn = document.querySelector('a[href="#contactos123"]');
    const desarrolladoresBtn = document.querySelector('a[href="#desarrolladores123"]');
    const contactanosBtn = document.querySelector('a[href="#contactanos123"]');
    const desaparecerMenus = Array.from(document.querySelectorAll('.desaparecerMenus'));

    function getSectionContainer(sectionId) {
        return desaparecerMenus.find(div => div.id === sectionId || div.querySelector(`#${sectionId}`));
    }

    function hideAll() {
        desaparecerMenus.forEach(div => div.classList.add('oculto'));
    }

    function showSection(sectionId) {
        const container = getSectionContainer(sectionId);
        // Si ya está visible, la ocultamos
        if (container && !container.classList.contains('oculto')) {
            container.classList.add('oculto');
            return;
        }
        // Si no, ocultamos todas y mostramos la seleccionada
        hideAll();
        if (container) {
            container.classList.remove('oculto');
            setTimeout(() => {
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 400);
        }
    }

    function showAll() {
        desaparecerMenus.forEach(div => div.classList.remove('oculto'));
    }

    function setupResponsive() {
        if (window.innerWidth > 768) {
            showAll();
            // Remove custom click handlers and restore default behavior
            if (contactoBtn) contactoBtn.onclick = null;
            if (desarrolladoresBtn) desarrolladoresBtn.onclick = null;
            if (contactanosBtn) contactanosBtn.onclick = null;
        } else {
            hideAll();

            if (contactoBtn) {
                contactoBtn.onclick = function(e) {
                    e.preventDefault();
                    showSection('contactos123');
                };
            }
            if (desarrolladoresBtn) {
                desarrolladoresBtn.onclick = function(e) {
                    e.preventDefault();
                    showSection('desarrolladores123');
                };
            }
            if (contactanosBtn) {
                contactanosBtn.onclick = function(e) {
                    e.preventDefault();
                    showSection('contactanos123');
                };
            }
        }
    }

    setupResponsive();
    /*window.addEventListener('resize', setupResponsive);*/
    let lastWidth = window.innerWidth;
window.addEventListener('resize', () => {
  // Solo ejecutar setupResponsive si cambia el ancho, no la altura
  if (window.innerWidth !== lastWidth) {
    lastWidth = window.innerWidth;
    setupResponsive();
  }
});

});