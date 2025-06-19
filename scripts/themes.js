// scripts/theme-switcher.js

const themeButtons = document.querySelectorAll('.header__theme-menu-button');
const pageElement = document.documentElement; // Работаем с <html>, а не с <body>

// Функция смены темы
function changeTheme(theme) {
    // Убираем старые классы тем
    pageElement.classList.remove('theme-light', 'theme-dark', 'theme-auto');
    // Добавляем новый класс
    pageElement.classList.add(`theme-${theme}`);
    // Сохраняем выбор
    localStorage.setItem('theme', theme);
}

// Обработчик кликов
themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        // Находим тему из класса кнопки
        const theme = button.classList.contains('header__theme-menu-button_type_light')
            ? 'light'
            : button.classList.contains('header__theme-menu-button_type_dark')
                ? 'dark'
                : 'auto';

        // Снимаем со всех кнопок активное состояние
        themeButtons.forEach((btn) => {
            btn.classList.remove('header__theme-menu-button_active');
            btn.removeAttribute('disabled');
        });

        // Устанавливаем тему и делаем кнопку активной
        changeTheme(theme);
        button.classList.add('header__theme-menu-button_active');
        button.setAttribute('disabled', true);
    });
});

// Функция инициализации темы при загрузке страницы
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const buttonToActivate = savedTheme
        ? document.querySelector(`.header__theme-menu-button_type_${savedTheme}`)
        : document.querySelector('.header__theme-menu-button_type_auto'); // По умолчанию "авто"

    if (savedTheme) {
        changeTheme(savedTheme);
    }

    themeButtons.forEach((btn) => {
        btn.classList.remove('header__theme-menu-button_active');
        btn.removeAttribute('disabled');
    });

    if (buttonToActivate) {
        buttonToActivate.classList.add('header__theme-menu-button_active');
        buttonToActivate.setAttribute('disabled', true);
    }
}

// Запускаем инициализацию
initTheme();