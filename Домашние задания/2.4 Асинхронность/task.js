// Класс для управления будильниками
class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.intervalId = null;
    }

    // Добавление нового звонка
    addClock(time, callback) {
        if (!time || !callback) {
            throw new Error('Отсутствуют обязательные аргументы');
        }

        // Проверка на существование звонка с таким же временем
        const existingAlarm = this.alarmCollection.find(alarm => alarm.time === time);
        if (existingAlarm) {
            console.warn('Уже присутствует звонок на это же время');
        }

        // Добавление звонка в коллекцию
        this.alarmCollection.push({
            callback,
            time,
            canCall: true
        });
    }

    // Удаление звонков по времени
    removeClock(time) {
        this.alarmCollection = this.alarmCollection.filter(alarm => alarm.time !== time);
    }

    // Получение текущего времени в формате HH:MM
    getCurrentFormattedTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Запуск будильника
    start() {
        if (this.intervalId !== null) {
            return;
        }

        // Функция проверки звонков
        const checkClock = (alarm) => {
            const currentTime = this.getCurrentFormattedTime();
            if (alarm.time === currentTime && alarm.canCall) {
                alarm.canCall = false;
                alarm.callback();
            }
        };

        this.intervalId = setInterval(() => {
            this.alarmCollection.forEach(alarm => checkClock(alarm));
        }, 1000);
    }

    // Остановка будильника
    stop() {
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    // Сброс возможности запуска всех звонков
    resetAllCalls() {
        this.alarmCollection.forEach(alarm => {
            alarm.canCall = true;
        });
    }

    // Удаление всех звонков
    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}