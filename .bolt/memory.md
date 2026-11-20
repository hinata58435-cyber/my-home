# Project memory

## Product intent & audience

- Furniture and home décor catalog/showcase site (likely e-commerce or product gallery).
- Arabic-language UI; product names and labels are in Arabic with branded quoted names (e.g. سرير كينغ فاخر «نوڤا»).
- Audience: Arabic-speaking shoppers browsing premium/luxury furniture.

## Brand personality & voice

- Elegant, production-quality presentation; not generic/template-driven.
- Product naming uses decorative Arabic quotation marks («…») for model/collection names.
- Tone is descriptive and premium (e.g. "فاخر", "ذهبية").

## Visual design & UX direction

- Product imagery is central; large photos expected for products and gallery sections.
- Images sourced from Unsplash CDN (`https://images.unsplash.com/photo-{ID}`).
- Contains a product listing (individual product cards with IDs p1–p14+) and a gallery section with curated bedroom/dining imagery.
- RTL layout implied by Arabic content.

## Decisions, constraints & rationale

- Vite + React + Tailwind CSS + Lucide React; no extra UI/icon packages.
- Use `@/` path alias for imports (maps to `src/`).
- Unsplash image IDs must be verified (HTTP 200) before committing; Pexels was unreliable/down this session.
- Replaced broken/404 images for: gallery bedroom, gallery dining, p1 king bed «نوڤا», p2 coffee settee «ليان», p7 dining table «ميزان», p9 side table «هدى», p11 wardrobe «تنظيم», p14 gold mirror «انعكاس».
- Build passes after image URL updates.

## Open questions & assumptions

- Assumed Unsplash CDN URLs are stable long-term; if breakage recurs, consider bundling local images or using a dedicated image host.
- Product data structure (IDs, fields, gallery format) inferred from this turn; exact schema not yet documented.
- Unclear whether the site is full e-commerce (cart/checkout) or a visual catalog only.