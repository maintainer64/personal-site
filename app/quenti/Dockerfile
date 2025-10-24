# Stage 1: Builder (клонирование, установка зависимостей и сборка)
FROM docker.io/oven/bun:1-slim AS builder

RUN apt-get update && apt-get install -y git

WORKDIR /app

# Клонируем репозиторий (полностью, включая все файлы)
RUN git clone https://github.com/bibi0019/quenti.git .

# Устанавливаем зависимости (bun.lockb теперь доступен после клона)
RUN bun i

# Генерируем Prisma-клиент (миграции схемы запустите отдельно)
RUN bun prisma db:push

# Собираем Next.js production-билд
RUN bun run build

COPY .env /app/.env

# Экспонируем порт
EXPOSE 3000

# Запускаем приложение
CMD ["bun", "start"]