// Убедимся, что DOM полностью загружен, прежде чем выполнять скрипт
document.addEventListener('DOMContentLoaded', function() {
    // Выводим сообщение в консоль, чтобы подтвердить, что скрипт загружен и DOM готов
    console.log("Файл script.js для 'Тренер-навигатор' загружен, DOM готов!");

    // Пример: Добавляем обработчик клика для кнопки поиска в шапке
    const searchButton = document.querySelector('.header__search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function(event) {
            // event.preventDefault(); // Раскомментируйте, если хотите предотвратить стандартную отправку формы для теста
            console.log("Кнопка поиска в шапке нажата!");
            // Здесь будет логика для обработки поиска (например, AJAX запрос или фильтрация на клиенте)
        });
    }

    // Пример: Добавляем обработчик клика для кнопки "Применить фильтры"
    const filterButton = document.querySelector('.filter-form__button');
    if (filterButton) {
        filterButton.addEventListener('click', function(event) {
            event.preventDefault(); // Фильтры обычно не отправляют форму на новую страницу
            console.log("Кнопка 'Применить фильтры' нажата!");
            // Здесь будет логика для сбора значений фильтров и обновления списка тренеров
        });
    }

    // Пример: Добавляем обработчик клика для кнопки отправки формы записи
    const bookingButton = document.querySelector('.booking-form__button');
    if (bookingButton) {
        bookingButton.addEventListener('click', function(event) {
            // event.preventDefault(); // Раскомментируйте, если будете обрабатывать отправку только через JS (AJAX)
            console.log("Кнопка отправки формы записи нажата!");
            // Здесь будет логика для валидации формы и ее отправки
        });
    }

    // Пример: Добавляем обработчик клика для кнопки "Записаться на тренировку к Ивану" в профиле тренера
    const trainerProfileBookButton = document.querySelector('.trainer-profile__book-button');
    if (trainerProfileBookButton) {
        trainerProfileBookButton.addEventListener('click', function() {
            console.log("Кнопка 'Записаться на тренировку' в профиле тренера нажата!");
            // Здесь может быть логика для плавной прокрутки к форме записи
            // или открытия модального окна с формой, предварительно заполнив имя тренера.
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
                // Можно также попытаться предварительно выбрать тренера в форме, если это необходимо
                const trainerSelect = document.getElementById('trainer-select');
                if (trainerSelect) {
                    // Предполагаем, что value для Ивана Петрова - "ivan-petrov"
                    // Это значение нужно будет согласовать с реальными value в select
                    // trainerSelect.value = "ivan-petrov";
                }
            }
        });
    }

    // Пример: Плавная прокрутка для навигационных ссылок в шапке
    const headerNavLinks = document.querySelectorAll('.header__navigation-link');
    headerNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            // Убедимся, что это внутренняя ссылка
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    console.log(`Плавная прокрутка к секции: ${targetId}`);
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

     // Пример: Плавная прокрутка для навигационных ссылок в подвале
    const footerNavLinks = document.querySelectorAll('.footer__navigation-link');
    footerNavLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    console.log(`Плавная прокрутка из подвала к секции: ${targetId}`);
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });


    // Вы можете добавить здесь другие базовые обработчики или функции для проверки.
    // Например, для кнопок сортировки, ссылок "Подробнее о тренере" и т.д.

    // Пример для кнопок сортировки
    const sortButtons = document.querySelectorAll('.sort-options__button');
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log(`Нажата кнопка сортировки: ${this.textContent}`);
            // Логика сортировки будет добавлена позже
        });
    });

    // Пример для ссылок "Подробнее о тренере"
    const trainerDetailLinks = document.querySelectorAll('.trainer-card__link');
    trainerDetailLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                 event.preventDefault(); // Предотвращаем стандартный переход по якорю для демонстрации
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                console.log(`Нажата ссылка "Подробнее о тренере" для: ${targetId}`);
                if (targetElement) {
                     targetElement.scrollIntoView({ behavior: 'smooth' });
                }
                // Логика для отображения деталей тренера (например, плавная прокрутка или модальное окно)
            }
        });
    });


}); // Конец обработчика DOMContentLoaded