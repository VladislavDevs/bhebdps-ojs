// Находим все пункты меню
const menuLinks = document.querySelectorAll('.menu__link');

// Функция, чтобы закрыть все подменю, кроме одного
function closeAllSubmenus(currentSubmenu = null) {
    const allSubmenus = document.querySelectorAll('.menu_sub');
    allSubmenus.forEach(submenu => {
        if (currentSubmenu !== submenu) {
            submenu.classList.remove('menu_active');
        }
    });
}

// Перебираем каждый пункт меню
menuLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        // Ищем родительский элемент li
        const menuItem = link.closest('.menu__item');
        // Ищем дочернее подменю
        const submenu = menuItem.querySelector('.menu_sub');

        // Если подменю существует
        if (submenu) {
            event.preventDefault(); // Запрещаем переход по ссылке
            
            // Закрываем все другие подменю
            closeAllSubmenus(submenu);
            
            // Переключаем класс у текущего подменю
            submenu.classList.toggle('menu_active');
        }
        // Если подменю нет, ссылка работает как обычно
    });
});