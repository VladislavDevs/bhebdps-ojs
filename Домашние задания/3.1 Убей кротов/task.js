let deadSpan = document.getElementById('dead');
let missedSpan = document.getElementById('missed');

// Функция для получения лунки по её индексу (id: hole1, hole2, ... hole9)
function getHole(index) {
    return document.getElementById(`hole${index}`);
}

// Функция для сброса игры
function resetGame() {
    deadSpan.textContent = 0;
    missedSpan.textContent = 0;
}

// Навешиваем обработчики на все лунки
for (let i = 1; i <= 9; i++) {
    let hole = getHole(i);
    hole.onclick = function() {

        // Если в лунке есть крот
        if (hole.classList.contains('hole_has-mole')) {
            let dead = parseInt(deadSpan.textContent);
            deadSpan.textContent = dead + 1;

            // Проверка победы
            if (dead + 1 === 10) {
                alert('Победа! Вы убили 10 кротов.');
                resetGame();
            }
        } else {
            let missed = parseInt(missedSpan.textContent);
            missedSpan.textContent = missed + 1;
            
            // Проверка поражения
            if (missed + 1 === 5) {
                alert('Поражение! Вы промахнулись 5 раз.');
                resetGame();
            }
        }
    }
}