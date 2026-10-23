# Next.js Starter

Next.js (latest) + App Router + JavaScript + Tailwind CSS v4 + shadcn/ui + Lucide + Framer Motion + IBM Plex Sans

## Setup
```bash
npm install
npm run dev
```
Node 20.9+ required (Node 22 LTS recommended).

## Structure
- `public/images/<page-name>/` - page wise images (home, about-us, common)
- `src/app/<page-name>/page.js` - sirf route; component import karta hai
- `src/components/<PageName>/` - page wise components (.jsx)
- `src/components/Layout/` - Header, Footer
- `src/components/Modals/` - popups
- `src/components/ui/` - shadcn components
- `src/_utils/` - regex.js, cn.js
- `src/_helper/` - common js functions

## New page add karna
1. `src/app/<slug>/page.js`
2. `src/components/<PageName>/<PageName>.jsx`
3. `public/images/<slug>/`

## shadcn component add
`npx shadcn@latest add card input` (components.json already configured for JS)
