# ScratchToLaunch

Frontend for **ScratchToLaunch** — a premium business launch platform for Indian founders.

> From idea to launch. We handle the rest.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion, Lucide icons

This is a customer-facing frontend preview. Data lives in `lib/data` so a backend can replace it later. There is **no live payment processing** and **no real document storage**.

## Scripts

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Key routes

| Path | Purpose |
| --- | --- |
| `/` | Marketing homepage |
| `/start` | Interactive business builder |
| `/services` | Service marketplace |
| `/services/[slug]` | Service detail |
| `/providers/[slug]` | Provider profile |
| `/dashboard` | Customer launch dashboard |
| `/provider` | Provider workspace |
| `/become-provider` | Provider application |
| `/checkout` | Mock checkout |

Prices are placeholders. Government fees are not included unless a listing says so.
