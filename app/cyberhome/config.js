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
            id: 1,
            name: "Metabase",
            description: "BI и аналитика платформа",
            url: "https://metabase.maintainer.keenetic.link/openid",
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
            url: "https://nocodb.maintainer.keenetic.link/openid",
            icon: "📋",
            imageUrl: "https://storage.googleapis.com/glide-prod.appspot.com/uploads-v2/dpCqAHybrhFEO3H8bONG/pub/Y9UgDGzIqAeRhItUyftN/channels4_profile.jpg",
            category: "database",
            tags: ["database", "spreadsheet"],
            backgroundColor: "#509EE3"
        },
        {
            id: 3,
            name: "Plane",
            description: "Управление проектами",
            url: "https://plane.maintainer.keenetic.link/openid",
            icon: "✈️",
            imageUrl: "https://plane.so/brand-logos/logo-with-wordmark.svg",
            category: "productivity",
            tags: ["project", "management"],
            backgroundColor: "#FD7E14"
        },
        {
            id: 4,
            name: "Telegram Bot",
            description: "Бот для уведомлений",
            url: "https://t.me/cyberhome_maintainer64_bot",
            icon: "🤖",
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/512px-Telegram_2019_Logo.svg.png",
            category: "communication",
            tags: ["bot", "telegram", "notifications"],
            backgroundColor: "#0088CC"
        },
        {
            id: 5,
            name: "HACS portal",
            description: "Home Assistant Community Store",
            url: "https://cyberhome.maintainer.keenetic.link",
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
        {id: "productivity", name: "Продуктивность", icon: "⚡"},
        {id: "communication", name: "Коммуникации", icon: "💬"},
        {id: "iot", name: "Умный дом", icon: "🏠"},
        {id: "network", name: "Сеть", icon: "🌐"},
        {id: "documentation", name: "Документация", icon: "📚"}
    ]
};