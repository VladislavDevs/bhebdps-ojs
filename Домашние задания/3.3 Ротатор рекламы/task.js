// Функция для запуска отдельного ротатора
function startRotator(rotator) {
    const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
    if (cases.length === 0) return;

    const defaultSpeed = 1000;
    const defaultColor = 'black';

    let speed = defaultSpeed;
    let textColor = defaultColor;

    if (rotator.dataset.speed) {
        speed = parseInt(rotator.dataset.speed, 10);
        if (isNaN(speed) || speed <= 0) speed = defaultSpeed;
    }

    if (rotator.dataset.color) {
        textColor = rotator.dataset.color;
    }

    let activeIndex = cases.findIndex(c => c.classList.contains('rotator__case_active'));
    if (activeIndex === -1) {
        activeIndex = 0;
        cases[activeIndex].classList.add('rotator__case_active');
    }

    rotator.style.setProperty('--rotator-color', textColor);

    // Функция переключения на следующий элемент
    function rotate() {
        cases[activeIndex].classList.remove('rotator__case_active');
        activeIndex = (activeIndex + 1) % cases.length;
        cases[activeIndex].classList.add('rotator__case_active');
    }

    const timerId = setInterval(rotate, speed);
    return timerId;
}

const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
    startRotator(rotator);
});