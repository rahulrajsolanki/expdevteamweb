# SaaSio Landing Page: Site Instructions

This document explains how the landing page is built, which sections it contains,
where to edit content, and how to run, build and deploy it.

---

## 1. Project structure

```
saasio-landing/
├── index.html            Page shell (loads src/main.jsx)
├── package.json          Scripts and dependencies
├── vite.config.js        Vite + React configuration
├── src/
│   ├── main.jsx          React entry point
│   └── LandingPage.jsx   The entire page: data, components and styles
├── public/               Static files (put product images in public/images/)
├── README.md             Quick start
└── SITE_INSTRUCTIONS.md  This file
```

All content, components and styles live in **`src/LandingPage.jsx`**. Styles are
written as a CSS string inside that file, so no separate stylesheet is needed.

---

## 2. Running the site

| Task | Command |
|------|---------|
| Install dependencies (first time) | `npm install` |
| Start the development server | `npm run dev` (opens at http://localhost:5173) |
| Create a production build | `npm run build` (output in `dist/`) |
| Preview the production build | `npm run preview` |

Requirements: Node.js 18 or newer.

---

## 3. Page sections (top to bottom)

| # | Section | Anchor | Description |
|---|---------|--------|-------------|
| 1 | Header / navigation | `#top` | Fixed header. Becomes a blurred dark bar on scroll. Includes a Products dropdown and a mobile menu. |
| 2 | Hero | `#top` | Gradient background with abstract shapes, headline, two buttons and trust points. Mouse movement shifts the background shapes. |
| 3 | Partner logos | — | Strip of placeholder company names. |
| 4 | Products | `#products` | Tabbed showcase: a product list on the left, the selected product on the right. |
| 5 | Services | `#services` | Dark section with a canvas particle network and six service cards. |
| 6 | Industries we serve | `#industries` | Physics playground. Circles fall in on scroll, can be dragged, and push each other. |
| 7 | Features | `#features` | Three alternating image-and-text rows. |
| 8 | AI assistant | — | Short description with insight points and an illustration. |
| 9 | Portfolio | `#portfolio` | Filterable project grid with parallax artwork, 3D tilt on hover and a hover overlay. |
| 10 | Why teams choose us | `#why` | Four icon cards. Hovering raises a panel over the artwork to show the description. |
| 11 | Team | `#team` | Member cards with gradient avatars and social links. |
| 12 | Security | — | Animated shield visual with status chips, and three hover-highlight rows. |
| 13 | Pricing | `#pricing` | Three plans. The middle plan is highlighted as "Most popular." |
| 14 | Reviews | — | Floating background particles, a stats header, and two counter-scrolling rows of review cards. |
| 15 | FAQ | `#faq` | Accordion built on native `<details>` elements. |
| 16 | Contact | `#contact` | Contact details and a demo request form. |
| 17 | Footer | — | Four columns: brand and social links, products, company, and contact. |

---

## 4. Where to edit content

Almost all text, images and lists are plain JavaScript arrays near the top of
`src/LandingPage.jsx`. Edit these arrays and the page updates automatically.

| What | Array name | Fields |
|------|-----------|--------|
| Navigation links | `navItems` | `label`, `href`, optional `badge` |
| Products | `products` | `id`, `name`, `summary`, `description`, `features` (list), `color`, `colorDeep`, `image`, optional `isNew` |
| Partner logos | `partnerLogos` | Array of names |
| Feature rows | `featureRows` | `id`, `name`, `title`, `text`, `color`, `colorDeep` |
| AI insight points | `aiInsights` | Array of sentences |
| AI illustration | `aiArt` | `id`, `name`, `color`, `colorDeep`, `image` |
| Services | `services` | `id`, `title`, `text`, `icon` (one of `setup`, `users`, `cloud`, `code`, `shield`, `chart`, `device`) |
| Portfolio projects | `portfolioProjects` | `id`, `name`, `category`, `client`, `color`, `colorDeep`, `image` |
| Team members | `teamMembers` | `name`, `role`, `initials`, `bio`, `from`, `to` (gradient colours) |
| Why us cards | `whyPoints` (text) and `whyStyles` (icon and gradient) | `title`, `text`; `icon` (`bolt`, `offline`, `headset`, `tag`), `from`, `to` |
| Security rows | `securityPoints` | `title`, `text` (icons are assigned in order: lock, users, pulse) |
| Industries (circles) | `industries` | `name`, `color` |
| Pricing plans | `pricingPlans` | `name`, `price`, `period`, `blurb`, `features` (list), `cta`, optional `popular: true` |
| Reviews | `testimonials` | `quote`, `name`, `role`, `initials`, `from`, `to` |
| FAQ | `faqs` | `q` (question), `a` (answer) |
| Floating background particles | `orbs` | `kind` (`drift`, `rise`, `pulse`, `orbit`), `size`, `x`, `y`, `c` (colour), `dur`, `delay` |

**Adding an item:** copy an existing object in the array and change its values.
Services, portfolio projects, team members, reviews, FAQs, industries and products
all support any number of items. The layouts adjust automatically.

**Products dropdown:** it is generated from the `products` array, so a new product
appears in the header dropdown, the mobile menu, the Products tabs and the footer.

---

## 5. Hero, headline and copy

These are written directly in the JSX inside the `<section className="hero">` block:

- Headline: "Grow your business real, organic & automatic."
- Subtitle, the "Try it for free" and "Explore products" buttons, and the three trust points.

Other fixed section titles and paragraphs are also inside their JSX sections. Search the file for the heading text to find them.

---

## 6. Images

- **Current artwork:** every product, portfolio item and feature uses a built-in
  dashboard illustration (`DashboardArt`) drawn in SVG. These are original and need no files.
- **To use real screenshots:** place the image in `public/images/` (for example
  `public/images/orderly-pos.png`) and set the item's `image` field to `"/images/orderly-pos.png"`.
  The illustration is replaced automatically for that item.
- Recommended size: 1600 × 1000 px or similar landscape ratio, optimised as WebP or PNG.

---

## 7. Colours and typography

- **Brand palette** (used throughout): blue `#1E5BFF`, violet `#7B3FE4`, pink `#FF2D75`,
  orange `#FF8A2B`, cyan `#66E7FF`, ink `#141B33`.
- **Global variables:** defined in the `:root` block inside the `styles` string
  (`--ink`, `--ink-soft`, `--paper`, `--line`, `--font`, `--ease`).
- **Font:** Outfit, loaded from Google Fonts at the top of the styles string.
  Change the `@import` URL and the `--font` variable to use another font.

---

## 8. Interactive features

| Feature | Where | How it works |
|---------|-------|--------------|
| Sticky header | Header | Adds a dark blurred background after scrolling 24 px. |
| Mobile menu | Header (below 900 px) | Animated hamburger that opens a panel. |
| Products dropdown | Header | Opens on hover and focus on desktop, and lists all products. |
| Product tabs | Products | Click or use the arrow keys to change products. |
| Particle network | Services | Canvas animation that pauses when the section is off screen. |
| Physics circles | Industries | Falls in on scroll, can be dragged, and pushes others. |
| Parallax | Portfolio | Artwork moves with scroll position. |
| 3D tilt | Portfolio | Card rotates toward the mouse pointer. |
| Filter | Portfolio | Category buttons filter the grid. |
| Reveal panels | Why us | Panel rises over the artwork on hover. |
| Marquee reviews | Reviews | Two rows scroll in opposite directions and pause on hover. |
| FAQ accordion | FAQ | Opens one answer at a time, using `<details>`. |
| Demo form | Contact | Shows a thank-you message on submit. No data is sent (see section 10). |

---

## 9. Responsive breakpoints

| Width | Changes |
|-------|---------|
| ≤ 1024 px | Product list becomes a horizontal swipe row. Navigation spacing tightens. |
| ≤ 900 px | Navigation becomes a hamburger menu. Two-column layouts stack. Footer becomes two columns. |
| ≤ 760 px | Hero cards and similar blocks stack. |
| ≤ 560 px | Smaller type and padding, full-width hero buttons, single-column footer, shorter why cards. |

Test at 1440, 1024, 768 and 390 px wide.

---

## 10. Items to complete before launch

These are placeholders in the current build:

- **Company name:** "SaaSio" and "YourBrand" appear in the header, footer and copyright.
- **Contact details:** `hello@example.com`, `+91 00000 00000`, the address and the business hours.
- **Social links:** the footer links point to `#top`. Replace them with real profile URLs.
- **Statistics and claims:** "10,000+ businesses", "4.9 average rating", "1,200+ reviews",
  "98% renew", "3 days to go live", "24x7 support", and the security claims. Replace them with verified figures.
- **Testimonials, team bios and client names:** these are fictional. Use real, approved content.
- **Pricing:** the prices and plan features are examples.
- **Demo form:** `handleDemoSubmit` only shows a message. Connect it to your email service,
  CRM or an API endpoint, for example:

  ```js
  const handleDemoSubmit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    await fetch("https://your-api.example.com/demo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSubmitted(true);
  };
  ```

- **Legal links:** Privacy, Terms and Cookies currently point to `#` anchors. Add the real pages.
- **Meta tags:** update the title and description in `index.html`, and add Open Graph tags for sharing.

---

## 11. Accessibility and motion

- Animations stop or simplify for users who set "reduce motion" in their operating system.
  This covers the particles, marquees, drifting shapes, physics circles and reveal transitions.
- Interactive elements use real `<button>`, `<a>` and `<details>` elements, and have visible focus outlines.
- Images and decorative illustrations have `alt` text or `aria-hidden` where appropriate.
- Keep text contrast at WCAG AA or better when you change colours. Dark sections use light text.

---

## 12. Deployment

1. Run `npm run build`. This creates a `dist/` folder with static files.
2. Upload the contents of `dist/` to any static host, for example:
   - **Netlify or Vercel:** connect the project folder or drag and drop `dist/`.
   - **GitHub Pages:** publish `dist/` with a workflow or the `gh-pages` package.
   - **Any web host:** copy the files of `dist/` to the public folder over FTP or SFTP.
3. If the site will not be served from the domain root, set `base` in `vite.config.js`,
   for example `base: "/your-subfolder/"`.

---

## 13. Troubleshooting

| Problem | Likely cause and fix |
|---------|----------------------|
| `vite` is not recognised | Run `npm install` in the project folder first. |
| `package.json` not found | The terminal is in the wrong folder. Use `cd` to the folder that contains `package.json`. |
| Blank page | Open the browser console (F12) and check the error. Confirm `src/main.jsx` and `src/LandingPage.jsx` exist. |
| Fonts look different | Outfit loads from Google Fonts. An internet connection is required. |
| Image does not show | Check the path. Files in `public/` are referenced from `/`, for example `/images/name.png`. |
| Animations feel slow or stutter | Check whether reduce motion is enabled in the OS. Close other heavy tabs. |

---

## 14. Quick reference: what to change for common requests

| Request | Change |
|---------|--------|
| Add a product | Add an object to `products` (and optionally `featureRows` or `portfolioProjects`). |
| Add a service | Add an object to `services`. Use an existing `icon` name. |
| Add a team member | Add an object to `teamMembers`. The grid adjusts automatically. |
| Add a review | Add an object to `testimonials`. |
| Add an FAQ | Add `{ q, a }` to `faqs`. |
| Add an industry circle | Add `{ name, color }` to `industries`. |
| Add a navigation link | Add to `navItems`, and make sure the target section has the matching `id`. |
| Change the brand name | Search for "SaaSio" and "YourBrand" and replace them. |
| Change colours | Edit the `:root` variables, or the gradient values inside each component. |
| Remove a section | Delete its `<section>` block from the JSX and remove its nav link. |
| Hide the products dropdown | Remove the item from `navItems`, or replace it with a plain link. |

---

## 15. Portfolio detail pages

Each portfolio card opens its own page at `#/portfolio/<id>`, for example `#/portfolio/pf-pos`.
The routing uses the URL hash, so the site works on any static host without server rewrites.

- **Project content** lives in the `projectDetails` object, keyed by project id. Each entry has
  `year`, `duration`, `services` (list), `summary`, `challenge`, `solution`, `results`
  (three `{ v, l }` items) and `captions` (three gallery captions).
- **Gallery images** are generated from each project's colours. Add real screenshots by
  replacing the `gallery` array in `PortfolioDetail`, or set `image` on the project and use it instead.
- **Share options:** X, LinkedIn, WhatsApp and Email open in a new tab. "Copy link" copies the page URL.
  "More options" appears on devices that support the native share sheet.
- **Gallery lightbox:** click an image to open it. Use the arrow buttons or the left and right
  arrow keys to move between images, and press Escape to close.
- **Navigation at the bottom:** the left and right arrows go to the previous and next project.
  The centre circle returns to the Portfolio section on the home page.
- **Adding a project:** add it to `portfolioProjects`, then add a matching entry to `projectDetails`
  using the same id. Without a `projectDetails` entry, the detail page will not render.

---

## 16. Product detail pages

Each product opens its own page at `#/product/<id>`, for example `#/product/orderly`.
Links to these pages come from the Products dropdown, the mobile menu, the footer, and the
"View details" button on the Products tabs.

The page is built from the `productPages` object, keyed by product id (`orderly`, `ledgerly`,
`rosterly`, `taskflow`). Each entry has:

| Field | Purpose |
|-------|---------|
| `base` | Base monthly price in ₹. Used in the add-on total. |
| `rating`, `reviewCount`, `breakdown` | Average rating, rating count, and percentages for 5 to 1 stars. Breakdown values should total 100. |
| `headline`, `description` | Hero title and intro paragraph. |
| `stats` | Four `{ v, l }` figures shown in the stats row. |
| `featureGroups` | Groups of features for the list layout. Each group has `group` and `items`. Groups also appear in the sidebar. |
| `featured` | Three `{ title, text }` highlights. |
| `builtFor` | Outlet or business types shown as chips, and in the demo form dropdown. |
| `addons` | Add-ons with `name`, `price` (₹ per month), and `text`. Toggling an add-on updates the total. |
| `reviews` | Reviews with `quote`, `name`, and `role`. |

**Sections on each page:** hero with the "Book a Free Demo" button, stats, features (sidebar and
grouped lists), featured highlights, built for, add-ons with a live total, ratings and reviews,
the demo form, and bottom navigation. The bottom navigation has previous and next arrows, and the
centre circle returns to the Products section.

**Demo form:** the form currently shows a thank-you message on submit and does not send data.
Connect it the same way as the home page demo form (section 10).

**Adding a product:** add it to `products`, then add a matching `productPages` entry with the same id.
Without the `productPages` entry the product's detail page will not render.
