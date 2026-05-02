import type { Resume } from "@/types/content";

export const resumes: Resume[] = [
  {
    id: "r1",
    slug: "leyla-mammadova-pm",
    name: "Leyla Məmmədova",
    title: {
      az: "Product Manager",
      ru: "Product Manager",
    },
    city: "Bakı",
    experienceYears: 6,
    salaryAZN: "4000+ AZN",
    categoryKey: "marketing",
    postedAt: "2026-04-27",
    isVip: true,
    isBoosted: false,
    photoSrc: "/resume-photos/r1.svg",
    summary: {
      az: "B2B SaaS məhsullarında roadmap, A/B testlər və ölçülən KPI ilə komanda idarəçiliyi.",
      ru: "Roadmap в B2B SaaS, A/B-тесты и управление командой по измеримым KPI.",
    },
    portfolio: [
      {
        name: {
          az: "Vendor portal — çatışmazlıqların azaldılması",
          ru: "Vendor portal — сокращение инцидентов",
        },
        description: {
          az: "Onboarding axınını 12 addımdan 6-ya endirdim; NPS +18 punkt (demo rəqəmlər).",
          ru: "Сократил онбординг с 12 до 6 шагов; NPS +18 п.т. (демо-цифры).",
        },
        stack: "Amplitude, Figma, Jira, SQL",
      },
      {
        name: {
          az: "Qiymət siyasəti modulu — A/B",
          ru: "Модуль ценообразования — A/B",
        },
        description: {
          az: "2 variant testi; konversiya +4.2% (simulyasiya).",
          ru: "Два варианта в тесте; конверсия +4.2% (симуляция).",
        },
        stack: "Python notebooks, Stats, Looker",
      },
    ],
  },
  {
    id: "r2",
    slug: "elchin-rustamov-backend",
    name: "Elçin Rüstəmov",
    title: {
      az: "Backend Engineer",
      ru: "Backend Engineer",
    },
    city: "Bakı",
    experienceYears: 5,
    salaryAZN: "3200–4500 AZN",
    categoryKey: "it",
    postedAt: "2026-05-01",
    isVip: true,
    isBoosted: true,
    photoSrc: "/resume-photos/r2.svg",
    summary: {
      az: "Go və PostgreSQL ilə yüksək yüklü API-lər, mikroservislər və observability.",
      ru: "Высоконагруженные API на Go и PostgreSQL, микросервисы и observability.",
    },
    portfolio: [
      {
        name: {
          az: "Ödəniş gateway — idempotent API",
          ru: "Платёжный gateway — идемпотентный API",
        },
        description: {
          az: "Retry təhlükəsizliyi, outbox pattern, p95 latency 120ms-ə qədər (demo).",
          ru: "Безопасные ретраи, outbox pattern, p95 до 120 мс (демо).",
        },
        stack: "Go, PostgreSQL, Redis, OpenTelemetry",
      },
      {
        name: {
          az: "İcazə xidməti (RBAC)",
          ru: "Сервис прав (RBAC)",
        },
        description: {
          az: "Policy cache, audit log, 40+ inteqrasiya nöqtəsi üçün SDK nümunəsi.",
          ru: "Кэш политик, audit log, SDK для 40+ точек интеграции.",
        },
        stack: "Go, gRPC, Postgres, Keycloak",
      },
      {
        name: {
          az: "Batch import worker",
          ru: "Batch import worker",
        },
        description: {
          az: "SQS oxuyan worker, DLQ monitorinqi, Grafana dashboard.",
          ru: "Воркер на SQS, мониторинг DLQ, дашборд Grafana.",
        },
        stack: "Go, AWS SQS, Prometheus, Grafana",
      },
    ],
  },
  {
    id: "r3",
    slug: "aygun-salehova-sales",
    name: "Aygün Salehova",
    title: {
      az: "Regional Sales Lead",
      ru: "Regional Sales Lead",
    },
    city: "Sumqayıt",
    experienceYears: 8,
    salaryAZN: "2500–3200 AZN",
    categoryKey: "sales",
    postedAt: "2026-04-20",
    isVip: false,
    isBoosted: true,
    photoSrc: "/resume-photos/r3.svg",
    summary: {
      az: "Distributor şəbəkələri, B2B müqavilələr və komanda kvotaları üzrə idarəetmə.",
      ru: "Дистрибуция, B2B-контракты и управление квотами команды.",
    },
    portfolio: [
      {
        name: {
          az: "Region bərpası — 14 ay",
          ru: "Восстановление региона — 14 мес.",
        },
        description: {
          az: "3 yeni distributor, ümumi satış +22% (portfolio üçün uydurma nəticə).",
          ru: "3 новых дистрибьютора, суммарные продажи +22% (вымышленный кейс).",
        },
        stack: "Salesforce, Excel, Power BI",
      },
    ],
  },
  {
    id: "r4",
    slug: "tinatin-khalilova-hr",
    name: "Tinatin Xəlilova",
    title: {
      az: "HR Manager",
      ru: "HR Manager",
    },
    city: "Bakı",
    experienceYears: 7,
    salaryAZN: "2200–3000 AZN",
    categoryKey: "hr",
    postedAt: "2026-04-26",
    isVip: false,
    isBoosted: false,
    photoSrc: "/resume-photos/r4.svg",
    summary: {
      az: "İşə qəbul funnel-i, onboarding və HR analitikası (People analytics).",
      ru: "Воронка найма, onboarding и HR-аналитика.",
    },
    portfolio: [
      {
        name: {
          az: "İşə qəbul SLA dashboard",
          ru: "Дашборд SLA найма",
        },
        description: {
          az: "Mərhələ üzrə orta gözləmə 9 gündən 5-ə (demo metrika).",
          ru: "Среднее ожидание по этапам с 9 до 5 дней (демо-метрика).",
        },
        stack: "Google Sheets, Apps Script, Notion",
      },
      {
        name: {
          az: "Onboarding kit — şablon paketi",
          ru: "Онбординг-кит — пакет шаблонов",
        },
        description: {
          az: "30-60-90 planı, IT checklist, buddy proqramı.",
          ru: "План 30-60-90, IT-чеклист, buddy-программа.",
        },
        stack: "Notion, Miro",
      },
    ],
  },
  {
    id: "r5",
    slug: "nigar-huseynova-ux",
    name: "Nigar Hüseynova",
    title: {
      az: "Senior UI/UX Designer",
      ru: "Senior UI/UX Designer",
    },
    city: "Bakı",
    experienceYears: 5,
    salaryAZN: "2800–3800 AZN",
    categoryKey: "marketing",
    postedAt: "2026-04-29",
    isVip: false,
    isBoosted: true,
    photoSrc: "/resume-photos/r5.svg",
    summary: {
      az: "Design system, mobil tətbiq axınları və istifadəçi tədqiqatı (interview + test).",
      ru: "Design system, мобильные сценарии и UX-исследования (интервью + тесты).",
    },
    portfolio: [
      {
        name: {
          az: "Fintech — kart əməliyyatları axını",
          ru: "Fintech — сценарий операций по карте",
        },
        description: {
          az: "8 ekran, komponent kitabxanası, accessibility yoxlaması WCAG 2.1 AA.",
          ru: "8 экранов, библиотека компонентов, проверка WCAG 2.1 AA.",
        },
        stack: "Figma, Variables, Protopie",
      },
      {
        name: {
          az: "B2B dashboard — məlumat sıxlığı",
          ru: "B2B dashboard — плотность данных",
        },
        description: {
          az: "Filtr paneli, saxlanılmış görünüşlər, empty state nümunələri.",
          ru: "Панель фильтров, сохранённые виды, empty states.",
        },
        stack: "Figma, Storybook",
      },
      {
        name: {
          az: "İstifadəçi testi — 12 iştirakçı",
          ru: "Юзабилити-тест — 12 участников",
        },
        description: {
          az: "Tapşırıq ssenariləri, heatmap təhlili (demo hesabat).",
          ru: "Сценарии задач, отчёт с heatmap (демо).",
        },
        stack: "Maze, Figma",
      },
    ],
  },
  {
    id: "r6",
    slug: "rashad-mamedov-finance-analyst",
    name: "Rəşad Məmmədov",
    title: {
      az: "Financial Analyst",
      ru: "Financial Analyst",
    },
    city: "Bakı",
    experienceYears: 4,
    salaryAZN: "2000–2800 AZN",
    categoryKey: "finance",
    postedAt: "2026-04-30",
    isVip: true,
    isBoosted: false,
    photoSrc: "/resume-photos/r6.svg",
    summary: {
      az: "FP&A, büdcə modelləri, ERP çıxışlarının təmizlənməsi və idarəetmə hesabatları.",
      ru: "FP&A, бюджетные модели, очистка выгрузок из ERP и управленческая отчётность.",
    },
    portfolio: [
      {
        name: {
          az: "13 həftəlik axın proqnozu",
          ru: "Прогноз денежного потока на 13 недель",
        },
        description: {
          az: "Məhsul xətti üzrə senzitivlik cədvəli; CFO üçün 1 səhifəlik icmal.",
          ru: "Таблица чувствительности по линейкам; one-pager для CFO.",
        },
        stack: "Excel, Power Query, SQL",
      },
      {
        name: {
          az: "KPI paneli — satış + maliyyə",
          ru: "KPI-панель — продажи + финансы",
        },
        description: {
          az: "Avtomatik yenilənən mənbələr, mərhələ üzrə marja (demo).",
          ru: "Автообновляемые источники, маржа по этапам (демо).",
        },
        stack: "Power BI, SQL Server",
      },
    ],
  },
];
