# SaaSio Landing Page Test

A single-page React landing page with a hero, services (dark particle section),
product showcase, portfolio with parallax and tilt, team, pricing,
testimonial slider, FAQ, and contact form.

## Run locally

```bash
npm install
npm run dev      # development server at http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Customise

- **Products, services, portfolio, team, pricing, reviews and FAQs** are plain
  arrays at the top of `src/LandingPage.jsx`. Edit them there.
- **Product images:** set `image` to a file path (for example `/images/orderly.png`)
  and place the file in `public/images/`. Until then, a placeholder illustration shows.
- **Colours:** change the CSS variables in the `:root` block inside the styles string.
- **Contact form:** the form currently only shows a thank-you message. Connect the
  `handleDemoSubmit` function to your email or CRM service.

## Notes

- The page loads the Outfit font from Google Fonts.
- Animations respect the `prefers-reduced-motion` setting.
