# Alam’s International — website

Marketing website for **Alam’s International**, a leather tannery and
leather-goods manufacturer in Kanpur, India.

**Live:** https://alamsinternational.com/

A single-page site built with plain HTML, CSS and JavaScript. There is no
framework and no package install; the only build command removes the README
from the deploy. Fonts, imagery and the catalogue PDF are all self-hosted, so
the site has no runtime dependencies and loads quickly on a slow connection.

---

## What’s on the page

- Sticky navigation with a full-screen mobile menu
- Hero, key figures, and a factory / process section
- Filterable product gallery — 47 styles across six categories — with a
  quick-view dialog and a “request a quote” button that prefills the form
- Embedded 14-page PDF catalogue, with open-in-new-tab and download
- Made-to-order section, reasons-to-buy cards and an FAQ accordion
- Enquiry form with an optional file attachment, delivered by email
- Contact details, an embedded map and a floating WhatsApp button
- `LocalBusiness` structured data, Open Graph tags, `sitemap.xml` and
  `robots.txt`

## Stack

| | |
| --- | --- |
| Markup | HTML5 — `index.html` plus a small `thank-you.html` |
| Styling | Hand-written CSS with custom properties, no framework |
| Script | Vanilla JavaScript, no dependencies |
| Fonts | Self-hosted Inter + Playfair Display (SIL OFL 1.1) |
| Images | WebP, with responsive `srcset` where it matters |
| Catalogue | 14-page A4 PDF, ~824 KB |
| Hosting | Netlify — static, no server-side code |
| Enquiries | FormSubmit → `alamsinternational3828@gmail.com` |

## Run it locally

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open <http://127.0.0.1:4173/>.

A local server is needed rather than opening `index.html` directly, so the
PDF, fonts and web manifest resolve correctly.

## Project structure

```text
index.html                    The whole page
thank-you.html                Confirmation shown after a form submission with a file
404.html                      Not-found page, served by Netlify for missing URLs
site.webmanifest              PWA / browser metadata
robots.txt, sitemap.xml       Search-engine metadata
netlify.toml                  Cache and security headers
assets/css/styles.css         All styling and responsive rules
assets/js/main.js             Product data, gallery, dialogs, menu, form
assets/catalogue/             The optimised catalogue PDF
assets/fonts/                 Self-hosted Inter + Playfair Display (+ OFL.txt)
assets/img/products/          47 product images, one WebP per style
assets/img/                   Factory photos, eagle mark, favicons, OG image
```

## Deploying

The repo root is the publish directory. Upload these, preserving the
structure:

```text
index.html  thank-you.html  404.html  site.webmanifest  robots.txt  sitemap.xml  assets/
```

Any static host works: Netlify, Vercel, Cloudflare Pages, GitHub Pages or
cPanel. Serve over HTTPS.

`netlify.toml` sets cache headers — fonts are immutable for a year, images
and the catalogue PDF for a week, and HTML/CSS/JS always revalidate so
content edits go live immediately — plus baseline security headers.

Netlify has no `.netlifyignore` and publishes everything in the publish
directory, so `netlify.toml` uses a one-line build command — `rm -f README.md`
— to delete the README from the deploy before it is uploaded.

For the domain, `index.html` already contains the canonical URL, the Open
Graph tags and the JSON-LD `url` for `https://alamsinternational.com/`, and
`robots.txt` / `sitemap.xml` point at the same host. If the site is ever
served on `www.` instead, update those and set the other host to redirect.

## Editing the site

### Products and categories

Product data and copy live in the `CATEGORIES` object in `assets/js/main.js`.
Each product is a `[CODE, Name]` pair, and the gallery is rendered from that
object. Images follow one rule:

```text
assets/img/products/<lowercase code>.webp
```

So `BAG-04` uses `assets/img/products/bag-04.webp`. To add a product, add the
pair to its category in `main.js` and add the matching WebP. A whole new
category also needs a tab in `index.html` and an option in the form’s
category select.

The six tabs appear in catalogue order: Belts, Bags, Safety Shoes, Wallets,
Leather Hides, Dog Collars. Bags is selected by default.

### Catalogue PDF

The published catalogue is `assets/catalogue/alam-international-catalogue.pdf`
— 14 A4 pages, about 824 KB. To replace it:

1. Export the new PDF.
2. Optimise it, e.g. with Ghostscript:
   ```bash
   gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook \
      -dNOPAUSE -dQUIET -dBATCH \
      -sOutputFile=assets/catalogue/alam-international-catalogue.pdf input.pdf
   ```
3. Update the page count and file size in the catalogue section and the
   mobile catalogue view in `index.html`.
4. Replace `assets/img/catalogue/cover.webp` and `cover-sm.webp` if the
   cover changes. Render the cover from a **browser** screenshot of the
   PDF’s first page rather than from `pdftoppm` — poppler clips the bottom
   of the “INTERNATIONAL” wordmark, while Chrome renders it correctly.
5. Test scrolling, download and the open-in-new-tab link on desktop and
   mobile.

### Photos

Factory photos are WebP files in `assets/img/`. The larger ones have
800 px and 1200 px variants — check the `srcset` references in
`index.html` before removing one.

### Brand mark

The header, mobile menu, footer and thank-you page share one lockup:

```html
<span class="brand-lockup">
  <span class="brand-eagle" aria-hidden="true"></span>
  <span class="brand-name">Alam’s</span>
  <span class="brand-sub">International</span>
</span>
```

The eagle is `assets/img/eagle-navy.png`, used as a CSS mask so it inherits
`currentColor` — navy on light backgrounds, cream on dark ones via
`.brand-lockup--light`. The wordmark is live text, so it stays sharp at any
size and never clips. If a clean vector logo is ever supplied, swap the
lockup for an `<img>` and drop the `.brand-lockup` rules.

### Social profiles

Instagram, Facebook and LinkedIn are linked from the footer, the contact
section, the mobile menu and the JSON-LD `sameAs` array. To change one,
search `index.html` for `instagram.com`, `facebook.com` and `linkedin.com`
and update every occurrence.

### The quote form

The form posts through [FormSubmit](https://formsubmit.co/). If the
recipient address changes, update **both** the form’s `action` and
`data-ajax` attributes in `index.html`, plus the mailto and contact links
on the page.

- **No attachment** — submitted by JavaScript to the AJAX endpoint; the
  visitor sees an inline success message.
- **With attachment** — submitted as a normal multipart post, then
  redirected to `thank-you.html`. The AJAX endpoint does not accept files.
- **No JavaScript** — the form still posts normally, and the visitor sees
  FormSubmit’s own confirmation page.
- Files are limited to 10 MB, in the browser and by the form service.
- A hidden honeypot field (`_honey`) filters bots. CAPTCHA is off to keep
  the form short; enable FormSubmit’s reCAPTCHA option if spam becomes a
  problem.

FormSubmit needs one-time activation: submit the form once from the live
site, open the confirmation email that arrives at the recipient address, and
click the link in it. Until that is done, submissions are accepted but not
delivered.

## Notes

- `404.html` is served for any missing URL, at whatever depth it was requested,
  so every asset and link in it starts at the site root (`/assets/…`, `/`).
  Keep those paths absolute if you edit it — relative ones break under `/a/b/`.
- Product quick views use the native `<dialog>` element.
- The catalogue viewer is loaded lazily on desktop; mobile shows a cover with
  download and open-in-browser links instead of an embedded iframe.
- The PDF viewer uses `#toolbar=0&navpanes=0&view=Fit` so each page fits the
  modal without browser chrome; visitors scroll through the 14 pages.
  Browser PDF behaviour varies, so the Open PDF and Download PDF buttons are
  the reliable fallbacks.
- No analytics, cookie banner or tracking scripts are installed. Google Maps
  is embedded on the contact section, and the Instagram, Facebook, LinkedIn
  and WhatsApp links open externally.
- `index.html` includes a “skip to content” link, and reduced-motion
  preferences are honoured in CSS.
- Quick sanity check after editing JavaScript: `node --check assets/js/main.js`.

## Licences

Inter and Playfair Display are used under the SIL Open Font License 1.1 —
see `assets/fonts/OFL.txt`. The eagle mark, factory photographs and product
images are the client’s own material.
