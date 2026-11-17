# Be rich storefront

Website for **Be rich / Be Rich Community** (Болортуяа Баяраа): the Be rich personal-finance notebook, the
10-notebook bundle, pear paste and a selfie stand. It replaces the Zochil shop at berich.mn (shop 32150).

Next.js 16 (App Router) + Tailwind CSS 4. Static catalog in `src/data/catalog.json`; orders go to erxes 3.0.

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint && npm run typecheck && npm run build
npm run test:order -- http://localhost:3000   # order API checks (add --send for one real erxes order)
npm run sync:erxes   # refresh prices from erxes (needs ERXES_API_URL + ERXES_APP_TOKEN)
```

| Path | What |
| --- | --- |
| `/` | Home: hero collage, notebook tour (7 sections), shop, money lab (savings calculator + 30-day habit tracker), club, journal |
| `/p/<slug>` | Product: photo, price, stock, features, notebook tour on notebook pages, bundle savings |
| `/journal`, `/journal/<id>` | The shop's blog posts |
| `/info` | Delivery, payment, eBarimt, FAQ, contact |
| `/cart` | Cart + checkout (QPay / bank, eBarimt person or company, Ulaanbaatar delivery) |
| `POST /api/orders` | Validates on the server (prices, stock, fee) and sends the order to erxes |

Business rules live in `src/content/business.ts`. Old Zochil URLs (`/products/...`, `/posts/...`, `/about`, `/faq`,
`/shopping-cart`) redirect to the new pages. erxes setup and open questions: `docs/erxes/MANUAL-STEPS.md`.

The savings calculator is an example (rate chosen by the visitor, 10% by default) and says so on the page; it is not
financial advice. The habit tracker stores ticks only in the visitor's browser.

Environment variables: see `.env.example` (never commit values).
