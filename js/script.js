// variable que trae lo que tiene el localstorage, si no tiene nada, tra 0
let currentStyle = parseInt(localStorage.getItem('selectedStyle')) || 0;
// array de estilos
const styles = ['estilos', 'estilos-peliculas', 'estilos-urbano', 'sin-estilos'];


function cambiarEstilo() {
    const themeLink = document.getElementById('theme');
    //Define el dato en la variable del tema, si no tiene, da error en la consola
    if (!themeLink) {
        console.error("No se encontró el elemento con ID 'theme'. Asegúrate de que existe en el HTML.");
        return;
    }

    // Incrementa el índice del estilo actual
    currentStyle = (currentStyle + 1) % styles.length; 
    // Reinicia al primero automáticamente si supera los estilos disponibles

    // cambia el estilo de la pagina
    themeLink.setAttribute('href', `./css/${styles[currentStyle]}.css`);

    // guarda el estilo actual en localstorage
    localStorage.setItem('selectedStyle', currentStyle);
    // muestra en consola el estilo actual
    console.log("Estilo actual:", styles[currentStyle]); 
}

// Aplica el estilo guardado al cargar la página
window.addEventListener('load', () => {
    const themeLink = document.getElementById('theme');

    if (!themeLink) {
        console.error("No se encontró el elemento con ID 'theme' durante la carga inicial.");
        return;
    }

    // Aplica el estilo desde localStorage
    themeLink.setAttribute('href', `./css/${styles[currentStyle]}.css`);
    console.log("Estilo aplicado al cargar:", styles[currentStyle]);
});


// Función para validar y mostrar lo completado del formulario
function mostrarElementosCompletados() {
    const inputs = document.querySelectorAll('input, select, textarea');
    const completados = [];
    const faltantes = [];

    inputs.forEach(input => {
        // Validar campos requeridos vacíos
        if (input.hasAttribute('required')) {
            if ((input.type === 'checkbox' || input.type === 'radio') && !input.checked) {
                if (!document.querySelector(`input[name="${input.name}"]:checked`)) {
                    faltantes.push(input.id || input.name || 'Campo desconocido');
                }
            } else if (input.value.trim() === '') {
                faltantes.push(input.id || input.name || 'Campo desconocido');
            }
        }

        // Capturar los campos completados
        if ((input.type === 'text' || input.type === 'email' || input.tagName === 'TEXTAREA') && input.value.trim() !== '') {
            completados.push(`${input.id}: ${input.value}`);
        }

        if (input.tagName === 'SELECT' && input.value !== '') {
            completados.push(`${input.id}: ${input.options[input.selectedIndex].text}`);
        }

        if (input.type === 'radio' && input.checked) {
            completados.push(`${input.name}: ${input.value}`);
        }

        if (input.type === 'checkbox' && input.checked) {
            completados.push(`${input.nextSibling.textContent.trim()}`);
        }
    });

    // Si hay campos faltantes, mostrar advertencia
    if (faltantes.length > 0) {
        alert(`Por favor, completa los siguientes campos obligatorios:\n${faltantes.join('\n')}`);
        return;
    }

    // Mostrar los campos completados
    if (completados.length > 0) {
        console.log('Inicio de afiliación:', completados.join('\n'));
        alert(`Inicio de afiliación:\n${completados.join('\n')}`);
    } else {
        alert('No hay datos completados.');
    }
}


// Función para limpiar el formulario
function limpiarFormulario() {
    const inputs = document.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        if (input.type === 'text' || input.type === 'email' || input.tagName === 'TEXTAREA') {
            input.value = '';
        }
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.checked = false;
        }

        if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
        }
    });

    alert('El formulario ha sido limpiado.');
}