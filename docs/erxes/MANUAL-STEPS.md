# Be rich: erxes manual steps

Owner of every step below: **Terbish**, with Be rich (Болортуяа Баяраа) for credentials and decisions.

These steps happen inside the erxes 3.0 admin, not in code. The website reads the results through the
environment variables in `.env.example`. Never commit their values.

| Task | Status | What to do in erxes (admin path) |
| --- | --- | --- |
| [1.1] Import products, categories, prices | website done · manual import in erxes | Section 1.1 |
| [1.2] Payment setup (QPay) | website done · manual, blocked on QPay merchant credentials | Section 1.2 |
| [1.3] eBarimt setup | website done · manual, blocked on PosAPI registration + TIN | Section 1.3 |
| [1.4] Delivery zones, fees, order statuses | website done · manual in erxes | Section 1.4 |
| [1.5] Test order from cart to receipt | validation verified · real order blocked on erxes env vars + 1.2 + 1.3 | Section 1.5 |

There is no erxes instance for Be rich yet ("erxes 3.0: NOT SET"). Create it first, then add the env vars under
**Vercel → berich-web → Settings → Environment Variables**.

---

## 1.1 Import products, categories and prices

Source: berich.mn (Zochil shop 32150), scraped 2026-11-17: 4 products, the home banner, the logo, 3 blog posts and
1 FAQ. The Facebook page (facebook.com/berichclubbolortuya) gives no content without a login; Instagram
(be.rich.boloroo) and the Skool community (skool.com/berichcommunity) are linked as they appear on Zochil.

Zochil has **no categories** for this shop. The website groups the products in 3:

| Code | Name | Products |
| --- | --- | --- |
| `BR-notebook` | Санхүүгийн дэвтэр | Be rich дэвтэр, Be rich дэвтрийн багц (10 ш) |
| `BR-wellness` | Эрүүл мэнд | Лийрийн охь |
| `BR-gear` | Контент хэрэгсэл | Сельфи хөл · жижиг |

| Code | Product | Price | Old price | Stock (Zochil) | Zochil code |
| --- | --- | --- | --- | --- | --- |
| `BR-903069` | Be rich дэвтэр | 39,600₮ | 44,000₮ | 486 | 12-1296-01 |
| `BR-996966` | Be rich дэвтрийн багц (10 ш) | 352,000₮ | 440,000₮ | 98 | — |
| `BR-789881` | Лийрийн охь | 34,000₮ | — | 10 | 12-1296-05 |
| `BR-785004` | Сельфи хөл · жижиг | 49,000₮ | 69,000₮ | 10 | 12-1296-04 |

Files:

- `docs/erxes/berich-categories.csv`: the parent `BR` and the 3 categories.
- `docs/erxes/berich-products.csv`: 4 rows, code `BR-<zochilId>`, with price, old price, stock, pack size,
  subtitle, description and photo paths, plus the Zochil product code.

Steps:

1. **Products & services → Categories**: import `berich-categories.csv`, or create the 3 by hand under «Be rich».
2. **Settings → Import & Export → Import → Products**: upload `berich-products.csv`. Map `code → Code`,
   `name → Name`, `categoryCode → Category code`, `unitPrice → Unit price`, `type → Type`, `uom → UOM`,
   `description → Description`. Keep the codes: the website and `npm run sync:erxes` match on them.
3. The bundle is 10 notebooks: optionally set it up as a **bundle / set product** of 10 × `BR-903069` so stock
   moves together (Zochil tracks them separately: 486 and 98).
4. **Inventories → Remainders**: enter the stock. Until erxes stock is wired to the site, update `stock` in
   `src/data/catalog.json`.
5. Upload the photos (`public/images/*.webp`) on the products.
6. Run `npm run sync:erxes` once with a Client Portal token to confirm the codes match.

Name tidy-ups on the website: the Zochil code is dropped from the name («Be rich дэвтэр (12-1296-01)» → «Be rich
дэвтэр», «Лийрийн охь (12-1296-05)» → «Лийрийн охь») and «Сельфи хөл-ЖИЖИГ (12-1296-04)» → «Сельфи хөл · жижиг».
The codes are kept in the `zochilCode` column.

## 1.2 Payment setup (QPay)

Zochil: `has_qpay: false`, no payment methods set, rule «Төлбөр буцаагдахгүй» (no refunds).

1. Get Be rich's QPay merchant credentials: `client_id`, `client_secret`, `invoice_code`. Owner: Terbish / Be rich.
2. **Settings → Payments → Add → QPay**: enter them. **Settings → Payments → (QPay) → Test**: a 100₮ invoice.
3. **Settings → Payments → Add → Bank transfer**: the account staff send to customers.
4. **Sales → Pipelines → «Вэбсайт» → Settings → Payments**: select QPay and bank transfer.

Website (done): checkout offers **QPay** and **Дансаар**, validated on the server and written in the order message
(`Төлбөр: …`). The «Төлбөр буцаагдахгүй» rule is shown on /info and in the checkout.

## 1.3 eBarimt setup

Zochil has no eBarimt setting for this shop (`regno: null`).

1. Collect from Be rich: TIN (person or company?), district code, VAT status, product classification codes
   (printed matter for the notebooks, food for the pear paste, electronics accessories for the selfie stand).
2. Register for **PosAPI 3.0** (ebarimt.mn → Business → PosAPI) and install the PosAPI service.
3. **Settings → eBarimt → Add**: PosAPI URL, TIN, district code, VAT switches; assign it to the website pipeline.

Website (done): checkout asks «Хувь хүн» or «Байгууллага»; a company needs a 7-digit registry number, validated on
the server.
