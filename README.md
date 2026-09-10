# Tarot Mini App (Cloudflare Pages)

Telegram Mini App — случайный расклад Таро с оплатой через Telegram Stars.

## Деплой на Cloudflare Pages

1. Зайди на https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git
2. Выбери репозиторий `tarot-mini-app`
3. Настройки сборки:
   - Framework preset: None
   - Build command: (оставь пустым)
   - Build output directory: `/`
4. После первого деплоя зайди в Settings → Environment variables
5. Добавь:
   - Variable name: `BOT_TOKEN`
   - Value: твой токен бота
   - Environment: Production
6. Сделай Redeploy

## Привязка к боту

В @BotFather → Bot Settings → Menu Button → укажи URL вида:
`https://твой-проект.pages.dev`
