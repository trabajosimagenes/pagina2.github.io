function toggleMenu() {
    var menu = document.getElementById('dropdownMenu');
    var content = document.getElementById('pageContent');
    var icon = document.querySelector('.menu-icon');

    if (menu.classList.contains('show')) {
        // Cuando el menú se cierra
        menu.classList.remove('show');
        content.classList.remove('slide');
        icon.classList.remove('active');
        icon.style.border = '';  // Restablecer el borde del icono
        icon.style.position = 'absolute';
        icon.style.top = '13.8px';   // Reestablecer top
        icon.style.left = '13px';  // Reestablecer left
    } else {
        // Cuando el menú se abre
        menu.classList.add('show');
        content.classList.add('slide');
        icon.classList.add('active');
        icon.style.border = 'none';  // Desactivar el borde del icono
        icon.style.position = 'fixed';
        icon.style.top = '20px';   // Mantener la misma posición en fixed
        icon.style.left = '20px';  // Mantener la misma posición en fixed
    }
}

// Ocultar el menú si se hace clic fuera de él
document.addEventListener('click', function(event) {
    var menu = document.getElementById('dropdownMenu');
    var content = document.getElementById('pageContent');
    var menuIcon = document.querySelector('.menu-icon');

    if (!menuIcon.contains(event.target) && !menu.contains(event.target)) {
        menu.classList.remove('show');
        content.classList.remove('slide');
        menuIcon.classList.remove('active');
        menuIcon.style.border = '';  // Restablecer el borde del icono
        menuIcon.style.position = 'absolute';
        menuIcon.style.top = '13.8px';   // Reestablecer top
        menuIcon.style.left = '13px';  // Reestablecer left
    }
});

/* nnnnnnnnnnnnnnn*/
document.addEventListener('DOMContentLoaded', function() {
    const searchIconButton = document.getElementById('searchIconButton');
    const searchField = document.getElementById('searchField');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    if (!searchIconButton || !searchField || !searchInput || !searchResults) {
        console.error('Uno o más elementos no se encontraron en el DOM.');
        return;
    }

    searchIconButton.addEventListener('click', function() {
        if (searchField.classList.contains('hidden')) {
            searchField.classList.remove('hidden');
            searchField.classList.add('visible');
            searchInput.focus(); // Opcional: enfoca el campo de búsqueda al abrir
        } else {
            searchField.classList.remove('visible');
            searchField.classList.add('hidden');
            searchResults.innerHTML = ''; // Limpiar resultados al ocultar
        }
    });

    searchInput.addEventListener('input', function() {
        const query = searchInput.value.toLowerCase();
        const exercises = document.querySelectorAll('.exercise');

        searchResults.innerHTML = ''; // Limpiar resultados anteriores

        if (query.trim() === '') {
            searchResults.style.display = 'none'; // Ocultar resultados si el campo está vacío
            return;
        }

        exercises.forEach(exercise => {
            const titleElement = exercise.querySelector('h2');
            if (titleElement) {
                const title = titleElement.textContent; // Mantener el formato original del título
                const titleLower = title.toLowerCase(); // Convertir a minúsculas para la búsqueda
                if (titleLower.includes(query)) {
                    const link = document.createElement('a');
                    link.href = '#' + exercise.id;
                    link.textContent = title; // Mostrar el título con el formato original
                    link.addEventListener('click', function(event) {
                        event.preventDefault();
                        document.getElementById(exercise.id).scrollIntoView({ behavior: 'smooth' });
                        // Cierra el buscador después de hacer clic en un resultado
                        searchField.classList.remove('visible');
                        searchField.classList.add('hidden');
                        searchResults.innerHTML = ''; // Limpiar resultados al ocultar
                    });
                    searchResults.appendChild(link);
                }
            }
        });

        if (searchResults.children.length > 0) {
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none'; // Ocultar resultados si no hay coincidencias
        }
    });
});

/*nnnnnnnnnnnnnn*/

function updateCounter(id) {
    let counterElement = document.getElementById(id);
    if (counterElement) {
        let counter = localStorage.getItem(id);
        if (counter === null) {
            counter = 0;
        }
        counterElement.innerText = counter;
    } else {
        console.error(`Element with ID ${id} not found.`);
    }
}

function incrementCounter(id) {
    let counter = localStorage.getItem(id);
    if (counter === null) {
        counter = 0;
    }
    counter = parseInt(counter) + 1;
    localStorage.setItem(id, counter);
    updateCounter(id);
}

function decrementCounter(id) {
    let counter = localStorage.getItem(id);
    if (counter === null) {
        counter = 0;
    }
    counter = Math.max(parseInt(counter) - 1, 0); // Evita que el contador sea negativo
    localStorage.setItem(id, counter);
    updateCounter(id);
}

function resetCounter(id) {
    localStorage.setItem(id, 0);
    updateCounter(id);
}

document.addEventListener('DOMContentLoaded', function() {
    const exerciseIds = [
        'counter1', 'counter2', 'counter3', 'counter4', 'counter5', 'counter6',
        'counter7', 'counter8', 'counter9', 'counter10', 'counter11', 'counter12',
        'counter13', 'counter14', 'counter15', 'counter16', 'counter17', 'counter18'
    ];
    
    exerciseIds.forEach(id => updateCounter(id));
});

// Temporizador

let countdownInterval, negativeTimerInterval;
let isCountingDown = false;
let isNegativeCounting = false;
let timeLeftInSeconds = 0;
let negativeTimeInSeconds = 0;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const beep = document.getElementById('beep');

function startCountdown() {
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    timeLeftInSeconds = minutes * 60 + seconds;

    if (timeLeftInSeconds > 0) {
        isCountingDown = true;
        updateDisplay(timeLeftInSeconds);
        countdownInterval = setInterval(() => {
            timeLeftInSeconds--;
            updateDisplay(timeLeftInSeconds);

            if (timeLeftInSeconds <= 0) {
                clearInterval(countdownInterval);
                playBeep(); // Reproduce el sonido al llegar a 0
                startNegativeTimer();
            }
        }, 1000);
    }
}

function startNegativeTimer() {
    isNegativeCounting = true;
    negativeTimeInSeconds = 0;
    negativeTimerInterval = setInterval(() => {
        negativeTimeInSeconds--;
        updateDisplay(negativeTimeInSeconds);
    }, 1000);
    // Inicia el sonido en loop
    playBeep();
}

function stopTimers() {
    clearInterval(countdownInterval);
    clearInterval(negativeTimerInterval);
    isCountingDown = false;
    isNegativeCounting = false;
    beep.pause(); // Detener sonido
    beep.currentTime = 0; // Reiniciar el sonido
    updateDisplay(0); // Resetear el display
}

function playBeep() {
    // El sonido se reinicia en cada reproducción
    beep.currentTime = 0;
    // Reproduce el sonido en loop
    beep.play().catch(function(error) {
        console.error("El navegador bloqueó la reproducción automática: ", error);
    });
}

function updateDisplay(time) {
    const isNegative = time < 0;
    const absoluteTime = Math.abs(time);
    const minutes = Math.floor(absoluteTime / 60);
    const seconds = absoluteTime % 60;
    display.textContent = `${isNegative ? '-' : ''}${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

startButton.addEventListener('click', () => {
    if (!isCountingDown && !isNegativeCounting) {
        startCountdown();
    }
});

stopButton.addEventListener('click', stopTimers);

