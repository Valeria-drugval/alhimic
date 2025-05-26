
🏥 Система учёта пациентов психиатрической лечебницы

[![GitHub License](https://img.shields.io/github/license/Valeria-drugval/alhimic)](https://github.com/Valeria-drugval/alhimic/blob/main/LICENSE)

Веб-приложение для автоматизации учета пациентов и истории их лечения.  
GitHub: [github.com/Valeria-drugval/alhimic](https://github.com/Valeria-drugval/alhimic)



 🚀 Особенности

- Микросервисы на Go: Изолированные сервисы для пациентов, ML-аналитики и API-шлюза.
- Адаптивный интерфейс: React-приложение с поддержкой мобильных устройств.
- Безопасность: Хеширование паролей (Argon2id), CORS-политики.
- Совместимость с M1: Docker-образы для Apple Silicon.
- Автоматические миграции: PostgreSQL с предустановленными схемами данных.



📂 Структура проекта

alhimic/
├── customer-service/    # Сервис пациентов (Go + PostgreSQL)
├── ml-service/          # ML-модели (кластеризация)
├── gateway/             # API-шлюз (Go)
├── frontend/            # Интерфейс (React + Tailwind CSS)
└── docker-compose.yml   # Конфигурация Docker




⚙️ Установка

 Требования:
- Docker Desktop (для macOS M1/M2)
- Node.js 20.x+ (опционально для разработки фронтенда)

bash
1. Клонируйте репозиторий
git clone https://github.com/Valeria-drugval/alhimic.git
cd alhimic

2. Запустите проект
docker compose up --build

Интерфейс: http://localhost:3000
API: http://localhost:8080




🛠️ Использование

Возможности интерфейса:
- 📝 Добавление пациентов** через форму.
- 🔍 Поиск по имени или диагнозу.
- 📅 История лечения** с добавлением записей.

API Endpoints:
| Метод | Путь                     | Описание                |
|-------|--------------------------|-------------------------|
| GET   | `/patients`              | Список пациентов        |
| POST  | `/patients`              | Добавить пациента       |
| GET   | `/patients/{id}/history` | История лечения         |
| POST  | `/patients/{id}/history` | Новая запись в историю  |



🔧 Настройка окружения

Для разработки фронтенда:
bash
cd frontend
npm install    # Установите зависимости
npm run dev    # Запустите локальный сервер (http://localhost:5173)


Переменные окружения (`.env`):
ini
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=patients



📄 Лицензия

Проект распространяется под лицензией [MIT](https://github.com/Valeria-drugval/alhimic/blob/main/LICENSE).



✉️ Контакты

Автор: **Валерия Дрыгваль**  
- GitHub: [Valeria-drugval](https://github.com/Valeria-drugval)  
- Email: vdrygval@mail.ru



P.S интерфейс психушки пока что не работает но мы эффективно это фиксим✨
