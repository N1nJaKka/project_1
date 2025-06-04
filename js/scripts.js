document.addEventListener('DOMContentLoaded', function() {
    console.log("Файл script.js для 'Тренер-навигатор' загружен, DOM готов!");

    const filterForm = document.querySelector('.filter-form');
    const trainerCardsContainer = document.getElementById('trainers'); // Контейнер, где находятся все карточки
    let allTrainerCards = []; // Будет содержать все карточки тренеров для фильтрации
    if (trainerCardsContainer) {
        allTrainerCards = Array.from(trainerCardsContainer.querySelectorAll('.trainer-card'));
    }

    const experienceFilters = filterForm ? filterForm.querySelectorAll('input[name="experience"]') : [];
    const locationFilter = filterForm ? filterForm.querySelector('#location-select') : null;
    const costMinFilter = filterForm ? filterForm.querySelector('#cost-min') : null;
    const costMaxFilter = filterForm ? filterForm.querySelector('#cost-max') : null;
    const applyFiltersButton = filterForm ? filterForm.querySelector('.filter-form__button') : null;


    const searchButton = document.querySelector('.header__search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function(event) {
            // event.preventDefault(); // Раскомментируйте, если хотите предотвратить стандартную отправку формы для теста
            console.log("Кнопка поиска в шапке нажата!");
        });
    }

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', function(event) {
            event.preventDefault(); // Фильтры обычно не отправляют форму на новую страницу
            console.log("Кнопка 'Применить фильтры' нажата!");
            let selectedExperience = '';
            experienceFilters.forEach(radio => {
                if (radio.checked) {
                    selectedExperience = radio.value;
                }
            });
            const selectedLocation = locationFilter ? locationFilter.value : '';
            const minCost = costMinFilter ? parseInt(costMinFilter.value, 10) : null;
            const maxCost = costMaxFilter ? parseInt(costMaxFilter.value, 10) : null;

            console.log("Выбранный опыт:", selectedExperience);
            console.log("Выбранное местоположение:", selectedLocation);
            console.log("Мин. стоимость:", minCost);
            console.log("Макс. стоимость:", maxCost);

        });
    }

    const bookingButton = document.querySelector('.booking-form__button');
    if (bookingButton) {
        bookingButton.addEventListener('click', function(event) {
            // event.preventDefault(); // Раскомментируйте, если будете обрабатывать отправку только через JS (AJAX)
            console.log("Кнопка отправки формы записи нажата!");
        });
    }

    const trainerProfileBookButtons = document.querySelectorAll('.trainer-profile__book-button');
    trainerProfileBookButtons.forEach(button => {
        button.addEventListener('click', function() {
            const trainerName = this.dataset.trainerName || this.textContent.replace('Записаться на тренировку к ', '').replace('Записаться на занятие к ', '');
            console.log(`Кнопка 'Записаться на тренировку' в профиле тренера '${trainerName}' нажата!`);
            const bookingSection = document.getElementById('booking');
            if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: 'smooth' });
                const trainerSelect = document.getElementById('trainer-select');
                if (trainerSelect) {
                    if (trainerName.includes('Иван Петров') && trainerSelect.querySelector('option[value="ivan-petrov"]')) {
                        trainerSelect.value = "ivan-petrov";
                    } else if (trainerName.includes('Елена Смирнова') && trainerSelect.querySelector('option[value="elena-smirnova"]')) {
                        trainerSelect.value = "elena-smirnova";
                    }
                }
            }
        });
    });


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


    const sortButtons = document.querySelectorAll('.sort-options__button');
    sortButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log(`Нажата кнопка сортировки: ${this.textContent}`);
        });
    });

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

    const trainerCardsForMouseover = document.querySelectorAll('.trainer-card');
    trainerCardsForMouseover.forEach(card => {
        card.addEventListener('mouseover', function() {
            const trainerNameElement = card.querySelector('.trainer-card__name');
            const trainerName = trainerNameElement ? trainerNameElement.textContent : 'Неизвестный тренер';
            console.log(`Мышь наведена на карточку тренера: ${trainerName}`);
        });
        card.addEventListener('mouseout', function() {
            const trainerNameElement = card.querySelector('.trainer-card__name');
            const trainerName = trainerNameElement ? trainerNameElement.textContent : 'Неизвестный тренер';
            // console.log(`Мышь убрана с карточки тренера: ${trainerName}`); // Раскомментируйте, если нужно
        });
    });


}); 