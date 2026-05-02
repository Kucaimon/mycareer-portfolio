# mycareer.az — portfolio (demo)

## Ссылки

| Что | URL |
|-----|-----|
| **Репозиторий (код на GitHub)** | [github.com/Kucaimon/mycareer-portfolio](https://github.com/Kucaimon/mycareer-portfolio) |
| **Локальный просмотр** | после `npm run dev` → [http://localhost:3000](http://localhost:3000) (откроется `/az`) |
| **Онлайн-демо** | задайте в Netlify после деплоя и добавьте сюда вида `https://…netlify.app` (см. `netlify.toml`) |

Чтобы на странице репозитория GitHub сверху отображалась кнопка сайта: **Settings** репозитория не нужна — в блоке **About** (справа на главной репо) нажмите шестерёнку и в поле **Website** вставьте URL Netlify, когда он будет.

---

Учебный проект по мотивам ТЗ доски вакансий для Азербайджана: **AZ / RU**, product-style UI, статические мок-данные (без бэкенда и парсинга).

## Запуск

Сервер **должен быть запущен** в терминале — иначе в браузере будет `ERR_CONNECTION_REFUSED`.

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) — редирект на `/az`.

Скрипт `dev` использует **webpack** (а не Turbopack): так надёжнее с динамическим `[locale]` на некоторых машинах. Если в логах видите `EMFILE: too many open files`, увеличьте лимит, например: `ulimit -n 10240`.

Сборка:

```bash
npm run build && npm start
```

Опционально скопируйте `.env.example` в `.env.local` и задайте `NEXT_PUBLIC_SITE_URL` для канонических ссылок и «Поделиться».

## Что внутри

- Главная: hero, слоты баннеров (плейсхолдеры), статистика за неделю, VIP / последние вакансии и CV, блок статей.
- `/az/jobs`, `/ru/jobs` — список с фильтром (поиск, категория, диапазон дат, чекбокс «неделя»). Сортировка: **VIP → поднятые → дата**.
- Карточка вакансии: SEO URL `/[locale]/jobs/[slug]`, лайк (localStorage), шаринг, блок карты с **выключателем** (без тяжёлого SDK).
- Резюме: аналогично для `/resumes` и `/resumes/[slug]`.
- `robots.txt`, `sitemap.xml`.

Стек: **Next.js 16** (App Router), **Tailwind CSS v4**, TypeScript.

## Важно для портфолио

Это демонстрация интерфейса и структуры, не коммерческий продукт. Данные вымышленные.
