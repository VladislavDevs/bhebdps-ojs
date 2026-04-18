document.addEventListener('DOMContentLoaded', () => {
    const sliderItems = Array.from(document.querySelectorAll('.slider__item'));
    const prevButton = document.querySelector('.slider__arrow_prev');
    const nextButton = document.querySelector('.slider__arrow_next');
    const dotsContainer = document.querySelector('.slider__dots');
    let dots = [];

    if (dotsContainer) {
        dots = Array.from(dotsContainer.querySelectorAll('.slider__dot'));
    }

    if (sliderItems.length === 0) {
        console.error('Слайды не найдены! Проверьте HTML-разметку.');
        return;
    }

    let currentIndex = 0;
    const updateSlider = (newIndex) => {
        sliderItems.forEach(item => {
            item.classList.remove('slider__item_active');
        });

        sliderItems[newIndex].classList.add('slider__item_active');

        if (dots.length > 0) {
            dots.forEach(dot => {
                dot.classList.remove('slider__dot_active');
            });
            dots[newIndex].classList.add('slider__dot_active');
        }
        currentIndex = newIndex;
    };

    const nextSlide = () => {
        const newIndex = (currentIndex + 1) % sliderItems.length;
        updateSlider(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
        updateSlider(newIndex);
    };

    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    } else {
        console.warn('Кнопка "Влево" не найдена. Навигация может работать некорректно.');
    }

    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    } else {
        console.warn('Кнопка "Вправо" не найдена. Навигация может работать некорректно.');
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateSlider(index);
            });
        });
    }

    updateSlider(0);
});