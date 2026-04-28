// Конфигурация дашборда
const dashboardConfig = {
    // Настройки страницы
    page: {
        title: "Service Links Dashboard",
        header: "Мои сервисы",
        description: "Быстрый доступ ко всем важным инструментам",
        theme: {
            primaryColor: "#3B82F6",
            backgroundColor: "#F9FAFB",
            cardBackground: "#FFFFFF"
        }
    },

    // Список сервисов
    services: [
        {
            id: 8,
            name: "N8N",
            description: "Автоматизация процессо",
            url: "https://n8n.maintainer.keenetic.link:8443",
            icon: "📋",
            imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1k00R713k7ZYo_9QzEO7PIgUR8Ij3iguP_w&s",
            category: "database",
            tags: ["database", "process"],
            backgroundColor: "#ffffff"
        },
        {
            id: 1,
            name: "Metabase",
            description: "BI и аналитика платформа",
            url: "https://metabase.maintainer.keenetic.link:8443/openid",
            icon: "📊",
            imageUrl: null,
            category: "analytics",
            tags: ["BI", "analytics", "reports"],
            backgroundColor: "#509EE3"
        },
        {
            id: 2,
            name: "Nocodb",
            description: "База данных как электронная таблица",
            url: "https://nocodb.maintainer.keenetic.link:8443/openid",
            icon: "📋",
            imageUrl: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/dpCqAHybrhFEO3H8bONG/pub/Y9UgDGzIqAeRhItUyftN/channels4_profile.jpg",
            category: "database",
            tags: ["database", "spreadsheet"],
            backgroundColor: "#509EE3"
        },
        {
            id: 5,
            name: "HACS portal",
            description: "Home Assistant Community Store",
            url: "https://cyberhome.maintainer.keenetic.link:8443",
            icon: "🏠",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/New_Home_Assistant_logo.svg",
            category: "iot",
            tags: ["home automation", "iot"],
            backgroundColor: "#41BDF5"
        },
        {
            id: 6,
            name: "Keenetic Router",
            description: "Панель управления роутером",
            url: "http://192.168.148.1:280",
            icon: "🌐",
            imageUrl: "https://play-lh.googleusercontent.com/jEi4z8Qf6ftp88m7OL5kdS3dI3C4BMzrF_wFIy71T--c6pH31x9fof8qS8kYY4ApcThR",
            category: "network",
            tags: ["router", "network"],
            backgroundColor: "#41BDF5"
        },
        {
            id: 7,
            name: "Notion process",
            description: "Документация процессов",
            url: "https://www.notion.so/gaben/3291bc40f76d47759de4f9cfd22edce2",
            icon: "📝",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
            category: "documentation",
            tags: ["docs", "process"],
            backgroundColor: "#000000"
        }
    ],

    // Категории для фильтрации (опционально)
    categories: [
        {id: "all", name: "Все сервисы", icon: "🔮"},
        {id: "analytics", name: "Аналитика", icon: "📊"},
        {id: "database", name: "Базы данных", icon: "🗄️"},
        {id: "communication", name: "Коммуникации", icon: "💬"},
        {id: "iot", name: "Умный дом", icon: "🏠"},
        {id: "network", name: "Сеть", icon: "🌐"},
        {id: "documentation", name: "Документация", icon: "📚"}
    ]
};