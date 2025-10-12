class ServiceDashboard {
    constructor(config) {
        this.config = config;
        this.currentCategory = 'all';
        this.init();
    }

    init() {
        this.renderHeader();
        this.renderServices();
        this.setupEventListeners();
        this.applyTheme();
    }

    applyTheme() {
        const theme = this.config.page.theme;
        document.body.style.backgroundColor = theme.backgroundColor;
        document.title = this.config.page.title;
    }

    renderHeader() {
        const headerContainer = document.getElementById('header-container');

        headerContainer.innerHTML = `
            <div class="text-center fade-in">
                <h1 class="text-4xl font-bold text-gray-800 mb-4">
                    ${this.config.page.header}
                </h1>
                <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    ${this.config.page.description}
                </p>
                
                <!-- Фильтры по категориям -->
                <div class="flex flex-wrap justify-center gap-2 mb-8">
                    ${this.config.categories.map(category => `
                        <button 
                            class="category-filter px-4 py-2 rounded-full transition-all duration-200 ${
            this.currentCategory === category.id
                ? 'bg-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
        }"
                            data-category="${category.id}"
                        >
                            <span class="mr-2">${category.icon}</span>
                            ${category.name}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    renderServices() {
        const servicesContainer = document.getElementById('services-container');
        const filteredServices = this.currentCategory === 'all'
            ? this.config.services
            : this.config.services.filter(service => service.category === this.currentCategory);

        servicesContainer.innerHTML = filteredServices.map((service, index) => `
            <div class="fade-in card-hover bg-white rounded-xl shadow-md overflow-hidden border border-gray-100" 
                 style="animation-delay: ${index * 0.1}s">
                <div class="p-6">
                    <!-- Заголовок сервиса -->
                    <div class="flex items-center mb-4">
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl mr-4"
                             style="background-color: ${service.backgroundColor}">
                            ${service.imageUrl
            ? `<img src="${service.imageUrl}" alt="${service.name}" class="w-8 h-8 object-contain">`
            : service.icon
        }
                        </div>
                        <div>
                            <h3 class="text-lg font-semibold text-gray-800">${service.name}</h3>
                            <p class="text-sm text-gray-500">${service.description}</p>
                        </div>
                    </div>

                    <!-- Теги -->
                    <div class="flex flex-wrap gap-1 mb-4">
                        ${service.tags.map(tag => `
                            <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                ${tag}
                            </span>
                        `).join('')}
                    </div>

                    <!-- Кнопка перехода -->
                    <a href="${service.url}" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       class="block w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-md">
                        <i class="fas fa-external-link-alt mr-2"></i>
                        Перейти к сервису
                    </a>
                </div>
            </div>
        `).join('');

        // Добавляем анимацию появления
        this.animateCards();
    }

    animateCards() {
        const cards = document.querySelectorAll('.fade-in');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });

        setTimeout(() => {
            cards.forEach(card => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }, 100);
    }

    setupEventListeners() {
        // Обработчики для фильтров категорий
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('category-filter')) {
                const category = e.target.getAttribute('data-category');
                this.setCategory(category);
            }
        });

        // Анимация при наведении на карточки
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.card-hover');
            if (card) {
                card.style.transform = 'translateY(-5px)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            const card = e.target.closest('.card-hover');
            if (card) {
                card.style.transform = 'translateY(0)';
            }
        });
    }

    setCategory(category) {
        this.currentCategory = category;

        // Обновляем активную кнопку
        document.querySelectorAll('.category-filter').forEach(btn => {
            const btnCategory = btn.getAttribute('data-category');
            if (btnCategory === category) {
                btn.classList.add('bg-blue-500', 'text-white', 'shadow-lg');
                btn.classList.remove('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            } else {
                btn.classList.remove('bg-blue-500', 'text-white', 'shadow-lg');
                btn.classList.add('bg-white', 'text-gray-700', 'hover:bg-gray-100');
            }
        });

        // Перерисовываем сервисы
        this.renderServices();
    }
}

// Инициализация приложения когда DOM загружен
document.addEventListener('DOMContentLoaded', () => {
    new ServiceDashboard(dashboardConfig);
});

// Дополнительные утилиты
const DashboardUtils = {
    // Поиск по сервисам
    searchServices(query) {
        return dashboardConfig.services.filter(service =>
            service.name.toLowerCase().includes(query.toLowerCase()) ||
            service.description.toLowerCase().includes(query.toLowerCase()) ||
            service.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
    },

    // Получить сервисы по категории
    getServicesByCategory(category) {
        return category === 'all'
            ? dashboardConfig.services
            : dashboardConfig.services.filter(service => service.category === category);
    },

    // Добавить новый сервис
    addService(serviceData) {
        const newService = {
            id: Math.max(...dashboardConfig.services.map(s => s.id)) + 1,
            ...serviceData
        };
        dashboardConfig.services.push(newService);
        return newService;
    }
};