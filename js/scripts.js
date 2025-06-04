document.addEventListener('DOMContentLoaded', function() {
    console.log("Файл script.js для 'Тренер-навигатор' загружен, DOM готов!");

    const preloader = document.querySelector('.preloader');
    const content = document.querySelector('.content');

    function hidePreloader() {
        if (preloader && content) {
            preloader.classList.add('preloader--hidden');
            content.classList.remove('content--hidden');
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            });
        }
    }

    setTimeout(hidePreloader, 1500);

    window.addEventListener('load', hidePreloader);


    const filterForm = document.querySelector('.filter-form');
    const experienceFilters = filterForm ? filterForm.querySelectorAll('input[name="experience"]') : [];
    const specializationSelect = filterForm ? filterForm.querySelector('#specialization-select') : null;
    const locationFilter = filterForm ? filterForm.querySelector('#location-select') : null;
    const costMinFilter = filterForm ? filterForm.querySelector('#cost-min') : null;
    const costMaxFilter = filterForm ? filterForm.querySelector('#cost-max') : null;
    const applyFiltersButton = filterForm ? filterForm.querySelector('.filter-form__button') : null;

    function saveFiltersToLocalStorage() {
        if (!filterForm) return;

        const filters = {
            specialization: specializationSelect ? specializationSelect.value : '',
            experience: Array.from(experienceFilters).find(radio => radio.checked)?.value || 'any',
            location: locationFilter ? locationFilter.value : '',
            costMin: costMinFilter ? costMinFilter.value : '',
            costMax: costMaxFilter ? costMaxFilter.value : ''
        };
        localStorage.setItem('trainerFilters', JSON.stringify(filters));
        console.log("Фильтры сохранены в LocalStorage:", filters);
    }

    function loadFiltersFromLocalStorage() {
        if (!filterForm) return;

        const savedFilters = localStorage.getItem('trainerFilters');
        if (savedFilters) {
            const filters = JSON.parse(savedFilters);
            if (specializationSelect) specializationSelect.value = filters.specialization;
            if (locationFilter) locationFilter.value = filters.location;
            if (costMinFilter) costMinFilter.value = filters.costMin;
            if (costMaxFilter) costMaxFilter.value = filters.costMax;

            experienceFilters.forEach(radio => {
                if (radio.value === filters.experience) {
                    radio.checked = true;
                }
            });
            console.log("Фильтры загружены из LocalStorage:", filters);
        }
    }

    loadFiltersFromLocalStorage();

    if (filterForm) {
        filterForm.addEventListener('change', saveFiltersToLocalStorage);
        filterForm.addEventListener('input', saveFiltersToLocalStorage);
    }


    const trainerCardsContainer = document.getElementById('trainer-cards-container');
    const trainerTitlesList = document.getElementById('trainer-titles-list');
    let allTrainerCardsData = [];
    async function loadTrainers() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`);
            }
            allTrainerCardsData = await response.json();
            console.log("Данные о тренерах загружены:", allTrainerCardsData);

            renderTrainerCards(allTrainerCardsData);
            extractAndDisplayTrainerTitles(allTrainerCardsData);
            initializeSwiper();
        } catch (error) {
            console.error("Не удалось загрузить данные о тренерах:", error);
            if (trainerCardsContainer) {
                trainerCardsContainer.innerHTML = '<p>Не удалось загрузить информацию о тренерах. Пожалуйста, попробуйте позже.</p>';
            }
        }
    }

    function renderTrainerCards(trainers) {
        if (!trainerCardsContainer) return;

        trainerCardsContainer.innerHTML = '';
        if (trainers.length === 0) {
            trainerCardsContainer.innerHTML = '<p>Тренеры не найдены по заданным критериям.</p>';
            return;
        }

        trainers.forEach(trainer => {
            const trainerCard = document.createElement('div');
            trainerCard.classList.add('trainer-card', 'swiper-slide');
            trainerCard.setAttribute('data-specialization', trainer.specialization);
            trainerCard.setAttribute('data-location', trainer.location);
            trainerCard.setAttribute('data-cost', trainer.cost);
            trainerCard.setAttribute('data-experience', trainer.experience);

            trainerCard.innerHTML = `
                <figure class="trainer-card__figure">
                    <img src="${trainer.image || 'https://placehold.co/150x150/cccccc/333333?text=Тренер'}" alt="Фото ${trainer.name}" class="trainer-card__image" width="150" height="150">
                </figure>
                <h3 class="trainer-card__name">${trainer.name}</h3>
                <p class="trainer-card__specialization">${trainer.specialization}</p>
                <p class="trainer-card__experience">Опыт: ${trainer.experience}</p>
                <p class="trainer-card__location">Местоположение: ${trainer.location}</p>
                <p class="trainer-card__rating">Рейтинг: ${trainer.rating} <i class="fas fa-star"></i></p>
                <p class="trainer-card__cost">Стоимость: ${trainer.cost} руб./час</p>
                <p class="trainer-card__description">${trainer.description}</p>
                <a href="#${trainer.id}" class="trainer-card__link">Подробнее о тренере</a>
            `;
            trainerCardsContainer.appendChild(trainerCard);
        });
    }

    function extractAndDisplayTrainerTitles(trainers) {
        if (!trainerTitlesList) return;

        trainerTitlesList.innerHTML = '';
        const trainerNames = trainers.map(trainer => trainer.name);

        if (trainerNames.length > 0) {
            trainerNames.forEach(name => {
                const listItem = document.createElement('li');
                listItem.classList.add('trainer-titles-list__item');
                listItem.textContent = name;
                trainerTitlesList.appendChild(listItem);
            });
            console.log("Массив имен тренеров:", trainerNames);
        } else {
            const listItem = document.createElement('li');
            listItem.textContent = "Имена тренеров не найдены.";
            trainerTitlesList.appendChild(listItem);
        }
    }


    const popularArticlesContainer = document.getElementById('articles-container');

    const popularArticlesData = [
        {
            title: "Как выбрать идеального фитнес-тренера?",
            link: "#article1",
            icon: "fas fa-dumbbell",
            description: "Советы по поиску специалиста, который поможет вам достичь ваших целей в фитнесе."
        },
        {
            title: "Йога для начинающих: первые шаги",
            link: "#article2",
            icon: "fas fa-leaf",
            description: "Руководство для тех, кто только начинает свой путь в мире йоги."
        },
        {
            title: "Психология успеха: роль коуча в вашей жизни",
            link: "#article3",
            icon: "fas fa-brain",
            description: "Узнайте, как коучинг может помочь вам раскрыть свой потенциал."
        }
    ];

    function renderPopularArticles() {
        if (!popularArticlesContainer) return;

        popularArticlesContainer.innerHTML = '';

        popularArticlesData.forEach(article => {
            const articleItem = document.createElement('div');
            articleItem.classList.add('article-item');
            articleItem.innerHTML = `
                <h3 class="article-item__title"><a href="${article.link}">${article.title}</a></h3>
                <p class="article-item__description"><i class="${article.icon}"></i> ${article.description}</p>
            `;
            popularArticlesContainer.appendChild(articleItem);
        });
        console.log("Динамический блок статей сформирован.");
    }


    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', function() {
        if (scrollToTopBtn) {
            if (window.pageYOffset > 300) { 
                scrollToTopBtn.style.display = 'block';
            } else {
                scrollToTopBtn.style.display = 'none';
            }
        }
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            console.log("Кнопка 'Наверх' нажата.");
        });
    }

    let mySwiper;

    function initializeSwiper() {
        if (mySwiper) {
            mySwiper.destroy(true, true);
        }

        if (trainerCardsContainer && trainerCardsContainer.children.length > 0) {
            mySwiper = new Swiper('.swiper-container', {
                loop: true, // Бесконечная прокрутка
                slidesPerView: 1, // Показываем по одной карточке по умолчанию
                spaceBetween: 20, // Расстояние между слайдами

                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },

                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },

                scrollbar: {
                    el: '.swiper-scrollbar',
                },

                breakpoints: {
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    // when window width is >= 1024px
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    }
                }
            });
            console.log("Swiper инициализирован.");
        } else {
            console.log("Нет карточек тренеров для инициализации Swiper.");
        }
    }


    const searchButton = document.querySelector('.header__search-button');
    if (searchButton) {
        searchButton.addEventListener('click', function(event) {
            // event.preventDefault(); // Раскомментируйте, если хотите предотвратить стандартную отправку формы для теста
            console.log("Кнопка поиска в шапке нажата!");
        });
    }

    if (applyFiltersButton) {
        applyFiltersButton.addEventListener('click', function(event) {
            event.preventDefault();
            console.log("Кнопка 'Применить фильтры' нажата!");
            const selectedSpecialization = specializationSelect ? specializationSelect.value : '';
            const selectedExperience = Array.from(experienceFilters).find(radio => radio.checked)?.value || 'any';
            const selectedLocation = locationFilter ? locationFilter.value : '';
            const minCost = costMinFilter ? parseFloat(costMinFilter.value) : 0;
            const maxCost = costMaxFilter ? parseFloat(costMaxFilter.value) : Infinity;

            const filteredTrainers = allTrainerCardsData.filter(trainer => {
                const matchesSpecialization = selectedSpecialization === '' || trainer.specialization.includes(selectedSpecialization);
                const matchesLocation = selectedLocation === '' || trainer.location === selectedLocation;
                const matchesCost = trainer.cost >= minCost && trainer.cost <= maxCost;

                let matchesExperience = true;
                if (selectedExperience !== 'any') {
                    const trainerExpYears = parseFloat(trainer.experience.split(' ')[0]);
                    if (selectedExperience === '1-3') {
                        matchesExperience = trainerExpYears >= 1 && trainerExpYears <= 3;
                    } else if (selectedExperience === '3-5') {
                        matchesExperience = trainerExpYears >= 3 && trainerExpYears <= 5;
                    } else if (selectedExperience === '5+') {
                        matchesExperience = trainerExpYears >= 5;
                    }
                }

                return matchesSpecialization && matchesLocation && matchesCost && matchesExperience;
            });
            renderTrainerCards(filteredTrainers);
            initializeSwiper();
        });
    }

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('trainer-card__link')) {
            const href = event.target.getAttribute('href');
            if (href && href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                console.log(`Нажата ссылка "Подробнее о тренере" для: ${targetId}`);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    });


    document.body.addEventListener('mouseover', function(event) {
        const trainerCard = event.target.closest('.trainer-card');
        if (trainerCard) {
            const trainerNameElement = trainerCard.querySelector('.trainer-card__name');
            const trainerName = trainerNameElement ? trainerNameElement.textContent : 'Неизвестный тренер';
            console.log(`Мышь наведена на карточку тренера: ${trainerName}`);
        }
    });
    document.body.addEventListener('mouseout', function(event) {
        const trainerCard = event.target.closest('.trainer-card');
        if (trainerCard) {
            const trainerNameElement = trainerCard.querySelector('.trainer-card__name');
            const trainerName = trainerNameElement ? trainerNameElement.textContent : 'Неизвестный тренер';
            // console.log(`Мышь убрана с карточки тренера: ${trainerName}`); // Раскомментируйте, если нужно
        }
    });


    loadTrainers();
    renderPopularArticles();
});
