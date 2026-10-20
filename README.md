# Alam’s International — website

Single-page marketing site for Alam’s International, a leather tannery and
finished-goods manufacturer in Kanpur, India. The site includes a filterable
product gallery, an embedded PDF catalogue, a quote/enquiry form, WhatsApp
links and contact/map details.

The site is plain HTML, CSS and JavaScript. There is no build step and no
framework or package install.

**Live domain:** https://alamsinternational.com/ (hosted on Netlify)

## Preview locally

From the project folder:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Open <http://127.0.0.1:4173/>. A local server is needed rather than opening
`index.html` directly so that the PDF, fonts and manifest load correctly.

## Publish

Upload these files/folders, preserving the structure:

```text
index.html
thank-you.html
site.webmanifest
robots.txt
sitemap.xml
assets/
```

`assets/` contains the CSS, JavaScript, fonts, images, favicons and the
optimised catalogue PDF. Any static host works: Netlify, Vercel, Cloudflare
Pages, GitHub Pages, cPanel or a normal web server. HTTPS is recommended.

The following files in the project root are **reference material, not part of
the site**, and should not be uploaded:

- `Alams_International_Catalogue.pdf` (25 MB source catalogue)
- `Alam's International – Website Structure & Copy.docx` (client brief)
- the original client photos: `finished leather product.jpeg`,
  `leather pieces drying outside.jpeg`, `machines.jpeg`,
  `man at work.jpeg`, `raw-material.jpeg`, `cover-or-hero.jpeg`

## Quote form — FormSubmit

The form posts to the client Gmail address through
[FormSubmit](https://formsubmit.co/):

- Form action: `https://formsubmit.co/alamsinternational3828@gmail.com`
- AJAX endpoint: `https://formsubmit.co/ajax/alamsinternational3828@gmail.com`

### Activate the form before launch

FormSubmit requires one-time activation:

1. Deploy the site to its real domain.
2. Submit the form once from the live site.
3. Open the activation email sent to `alamsinternational3828@gmail.com` and
   confirm the address.
4. Submit a second test enquiry and confirm it arrives in the inbox.

Until activation is complete, submissions may not be delivered.

### How submissions behave

- **No attachment:** submitted by JavaScript to the AJAX endpoint; the visitor
  sees an inline success message.
- **With attachment:** submitted as a normal multipart form post to FormSubmit,
  then redirected to `thank-you.html`. This is required because the AJAX
  endpoint does not support file uploads.
- **No JavaScript:** the form still posts normally to FormSubmit, but visitors
  see FormSubmit’s own confirmation page.
- Files are limited to 10 MB, both in the browser and by the form service.
- There is a hidden honeypot field (`_honey`). CAPTCHA is currently disabled to
  keep the enquiry short; if spam becomes a problem, enable FormSubmit’s
  reCAPTCHA option and test the form again.

If the recipient address changes, update **both** URLs in the form’s `action`
and `data-ajax` attributes in `index.html`, and update the mailto/contact links
throughout the page.

## Before going live — client sign-off

These items are intentionally written conservatively or still need client
confirmation:

- **MOQ** — the FAQ says it depends on the product; confirm whether a specific
  minimum should be published.
- **Lead times and payment terms** — currently confirmed “in writing at
  quotation stage”; add firm terms only when approved.
- **Export countries / target markets** — do not publish a country list until
  the client confirms it.
- **Certifications** — the site makes no ISO, REACH, OEKO-TEX or other
  certification claims. Add badges or claims only for certificates the client
  can provide and verify.
- **Worker photographs** — the factory photos show identifiable people. Confirm
  written consent before publishing.
- **Product names and codes** — product names were derived from the supplied
  catalogue and should be checked by the client, along with the “47 styles” and
  “14 pages” counts.
- **Response time** — the site promises a reply within 24–48 hours; confirm
  this is realistic.
- **Contact details** — verify the address, phone/WhatsApp number, email and
  the Instagram, Facebook and LinkedIn profiles.
- **Privacy** — the form collects personal details. Add a privacy policy link
  if the client’s market/legal setup requires one.

## Domain and SEO

The site is prepared for **https://alamsinternational.com/**. The head of
`index.html` already contains:

- `<link rel="canonical" href="https://alamsinternational.com/">`
- `og:url`, `og:image`, `og:image:alt` and `og:locale` as absolute URLs
- `twitter:card`, `twitter:title`, `twitter:description` and `twitter:image`
- `"url"` and `"image"` in the `LocalBusiness` JSON-LD block

`robots.txt` and `sitemap.xml` also point at the same domain.

If the domain ends up served on `www.` instead, change the four places above
plus `robots.txt` and `sitemap.xml` to `https://www.alamsinternational.com/`,
and set the apex to redirect to `www` in Netlify (Site settings → Domains →
Domain management) so only one URL is indexed.

After the domain is live:

1. Check the social preview with a tool such as the Facebook Sharing
   Debugger or LinkedIn Post Inspector.
2. Submit `https://alamsinternational.com/sitemap.xml` in Google Search
   Console, and verify the domain with Bing Webmaster Tools too.
3. Re-test the quote form from the final domain.

## Deploying to Netlify

The repo root is the publish directory — there is no build step.

- `netlify.toml` sets cache headers: fonts are immutable for a year, images
  and the catalogue PDF for a week, and HTML/CSS/JS always revalidate so
  content edits go live immediately. It also sets baseline security headers.
- `.netlifyignore` keeps the 25 MB source catalogue, the client brief, the
  original JPEGs and the internal docs out of the deploy, so the published
  site is about 4 MB.

To connect the domain once it is purchased:

1. Netlify → Site settings → Domains → Add custom domain →
   `alamsinternational.com`.
2. At the domain registrar, set the DNS records Netlify shows. For a domain
   registered elsewhere the usual records are:
   - `A` `@` → `75.2.60.5` and `A` `@` → `99.83.190.102`
   - `CNAME` `www` → `your-site-name.netlify.app`
   (or point the nameservers at Netlify DNS and let Netlify manage them)
3. Wait for DNS to propagate, then Netlify provisions the HTTPS certificate
   automatically. Confirm the certificate is active before announcing the URL.

## Editing the site

### Products and categories

Product data and copy live in `assets/js/main.js` in the `CATEGORIES` object.
Each product is a name/code pair; the gallery is rendered from that object.

Product images use this naming rule:

```text
assets/img/products/<lowercase code>.webp
```

For example, `BAG-04` uses `assets/img/products/bag-04.webp`. To add a product,
add the pair to the category in `main.js`, add the matching WebP image, and add
a tab/count in `index.html` if a whole new category is being introduced.

The default active category is Bags. The six tabs appear in catalogue order:
Belts, Bags, Safety Shoes, Wallets, Leather Hides, Dog Collars.

### Catalogue PDF

The published catalogue is:

```text
assets/catalogue/alam-international-catalogue.pdf
```

It is 14 A4 pages and about 824 KB. To replace it:

1. Export the new PDF.
2. Optimise it, for example with Ghostscript:
   `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=assets/catalogue/alam-international-catalogue.pdf input.pdf`
3. Update the page count and file-size text in the catalogue section and the
   mobile catalogue view (`index.html`).
4. Replace `assets/img/catalogue/cover.webp` and `cover-sm.webp` if the cover
   changes. Render the cover from a **browser** screenshot of the PDF’s first
   page, not from `pdftoppm` — poppler clips the bottom of the “INTERNATIONAL”
   wordmark, while Chrome renders it correctly.
5. Test scrolling, download and the new-tab link on desktop and mobile.

### Photos

Factory photos are WebP files in `assets/img/`. Responsive 800/1200 px
versions are provided for the larger images; delete the unused variants only
after checking the `srcset` references in `index.html`.

Newer client-supplied photos:

- `raw-material.jpeg` → `assets/img/factory-raw-material-1200.webp` (+ `-800`),
  used in the “Raw in, finished out” band in the factory section.
- `cover-or-hero.jpeg` → `assets/img/hero-product-1200.webp`, used for the
  finished-goods card in the same band.

Both source JPEGs are kept in the project root as reference material.

### Social profiles

Instagram, Facebook and LinkedIn are linked from the footer, the contact
section, the mobile menu, and the `LocalBusiness` JSON-LD `sameAs` array.
Tracking query parameters from the shared URLs were dropped. To change a
profile, search `index.html` for `instagram.com`, `facebook.com` and
`linkedin.com` and update each occurrence.

### Brand mark

The header, mobile menu, footer and thank-you page share one lockup built in
`index.html` / `thank-you.html`:

```html
<span class="brand-lockup">
  <span class="brand-eagle" aria-hidden="true"></span>
  <span class="brand-name">Alam’s</span>
  <span class="brand-sub">International</span>
</span>
```

The eagle is `assets/img/eagle-navy.png`, used as a CSS mask so it inherits
`currentColor` (navy on light backgrounds, cream on dark ones via
`.brand-lockup--light`). The wordmark is live text, so it stays sharp and
never clips.

The wordmark is live text rather than an image because the raster logo
embedded in the supplied PDF catalogue has its “INTERNATIONAL” line cut off at
the baseline. If the client supplies a clean vector logo, swap the lockup for
an `<img>` and delete the `.brand-lockup` rules.

### Fonts

Inter and Playfair Display are self-hosted in `assets/fonts/` under the SIL Open
Font License 1.1. The license text is included in `assets/fonts/OFL.txt`.

## File structure

```text
index.html                         Main page
thank-you.html                     Fallback confirmation after file upload
site.webmanifest                   PWA/browser metadata
assets/css/styles.css              All styling and responsive rules
assets/js/main.js                  Product data, gallery, dialogs, menu, form
assets/catalogue/                  Optimised catalogue PDF
assets/fonts/                      Self-hosted Inter + Playfair Display
assets/img/products/               47 product WebP images
assets/img/                        Factory photos, eagle mark, favicon, OG image
```

## Notes

- Product quick views use the native `<dialog>` element. The catalogue viewer
  is loaded lazily on desktop; mobile shows a cover, download button and
  “open in browser” link instead of an embedded iframe.
- The PDF viewer uses `#toolbar=0&navpanes=0&view=Fit` so each page fits the
  modal without browser chrome; visitors scroll through the 14 pages.
  Browser PDF behaviour varies, so the Open PDF and Download PDF buttons are
  the reliable fallbacks.
- The site has no analytics, cookie banner or third-party tracking scripts.
  Google Maps is embedded on the contact section, and the Instagram, Facebook,
  LinkedIn and WhatsApp links open externally.
- `index.html` includes a “skip to content” link and reduced-motion support is
  handled in CSS.
- For a quick sanity check after editing JavaScript:
  `node --check assets/js/main.js`.
