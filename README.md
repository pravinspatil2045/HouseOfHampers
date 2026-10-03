# House of Hampers

A colourful, responsive gift-shop frontend built with React, TypeScript, and Vite. Custom cobalt-and-blush art direction, an interactive gift reveal, occasion filters, live gift-note preview, personalisation, and an accessible gift bag.

## Local development

Requires Node.js 22.12+ and npm.

```sh
npm install
npm run assets
npm run dev
```

Open the local URL printed by Vite. Optimised WebP images are committed in `public/images`, so a fresh clone can run immediately after installation. `npm run assets` regenerates them from the three original photographs in `assets/source`. Local Claude skills, settings, screenshots, and test reports are intentionally excluded from the repository.

```sh
npm run build       # TypeScript validation and production build
npm run preview     # Serve the production build locally
npm run lint        # ESLint
npx playwright install chromium
npm test            # Functional, responsive, and axe accessibility tests
```

## Stack

- React + strict TypeScript + Vite 7
- Native CSS with semantic light/dark tokens
- Motion for entrance, reveal, and bag feedback
- Radix Dialog for accessible overlays and focus management
- Phosphor icons
- Bricolage Grotesque and DM Sans, bundled locally using Fontsource
- Playwright + axe-core for browser and accessibility checks

## Content and design

- `src/data/products.ts`: preview catalog, currency, and formatting
- `src/styles.css`: palette, layout, typography, responsive rules, reduced motion
- `src/components/`: independently scoped sections and dialogs
- `src/hooks/useBag.ts`: validated local bag choices and quantity operations
- `src/hooks/useTheme.ts`: system theme and manual preference
- `public/images/`: deployable, optimised images

Development followed the locally installed `design-taste-frontend` skill and used `playwright-cli` for visual inspection; those local tools are not shipped with the application. Existing gift photographs were supplied in the project; confirm their production licensing before launch. The photos are illustrative packaging, not verified product images. Unrelated CuratedJoy branding and sample testimonials were not reused.

## Preview boundaries

This is a **functional frontend preview**, not a live commerce system.

- Product contents and prices are illustrative. Replace with real catalog data.
- Bag items and theme preferences persist in this browser when local storage is available. Gift notes remain in memory only and are deliberately stripped before saving.
- No payments, inventory reservation, order submission, analytics, or email delivery.
- Corporate enquiries download a local text draft. They are not sent anywhere.
- No invented customer testimonials, business addresses, delivery promises, or social links.

Before accepting orders, connect a commerce backend (for example Shopify or a server-validated catalog and hosted payment checkout), inventory, order fulfilment, a secure enquiry endpoint, and real business details/policies. Calculate prices, shipping, taxes, and stock server-side rather than trusting client totals. Add consent/privacy requirements appropriate to those integrations. Confirm products, contact details, image rights, shipping regions, returns, and currency.

## Deploy on Vercel

1. Run `npm run assets` locally and include `public/images` in your repository.
2. Push the project to your chosen Git repository.
3. Import it into Vercel and select the **Vite** framework preset.
4. Set the build command to `npm run build` and output directory to `dist`.
5. Use a Node 22.x or later build runtime compatible with the package engines.

No environment variables or SPA rewrite rules are needed for the current single-page, anchor-based navigation. If you add client-side routes later, configure rewrites. Add an absolute Open Graph image and canonical URL once your real domain is known.

## Design accessibility

Responsive mobile navigation; accessible dialog titles/descriptions; focus trapping, restoration, and Escape dismissal; labelled forms and radio groups; visible keyboard focus; reduced-motion support; dark mode; and local fonts. Automated tests help catch regressions but do not replace a manual screen-reader and keyboard review.
