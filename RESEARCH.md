# Architecture Overview

This overview details the architecture for both frontend and backend, referencing the frameworks, libraries, build tools, and API routing patterns used in the ARA website.

---

## Frontend

**Frameworks/Libraries**
- **Framework:** [Next.js](https://nextjs.org/) (using both server-side and client-side features, see `src/app` directory usage)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/
- **Internationalization:** [`react-intl`](https://formatjs.io/docs/react-intl/)
- **Icons/Fonts:** Integration of Google Fonts via Next.js, e.g., Geist and Geist_Mono in `layout.tsx`
- **Accessibility:** ARIA tags, alt text, contrast checking through [WebAim](https://webaim.org/resources/contrastchecker/).

**Build Tool & Structure**
- **Build/Dev:** Unified via Next.js; `npm run dev` launch a dev server running both backend & frontend.
- **Source Structure:** Uses Next.js App Router.
- `/src/app` for pages, `/src/components` for UI pieces, `/src/utils` for helpers/types.
- **TypeScript:** Primary language for both frontend and backend.
- **Static Assets:** Managed with Next.js static file serving—see config for remote image patterns in `next.config.ts`.
- **Linting:** Using default Next.js ESLint configurations.
- **PostCSS:** Tailwind integrated via PostCSS config; custom rules are locaated in `postcss.config.mjs`.

**Page/Component Patterns**
- All main pages (`home`, `projects`, `people`, `wiki`, `contact`, `login`) are React components.
- Shared layout via `RootLayout`, includes shared components like `Navbar` and `Footer` and React contexts.
- Image displayed via Google drive links (NOTE: to be changed in the future)
---

## Backend

**Framework/Platform**
- **Framework:** Next.js API Routes (`src/app/api/*/route.ts`)
  - All API logic is implemented as part of the same Next.js app, deploying both frontend and backend in a monorepo/unified service (see README for folder structure). All API requests handled by Next.js's serverless functions.
- **Database:** [Supabase](https://supabase.com/) (Postgres)
  - All data fetching, auth, and CRUD interactions are through Supabase client libraries.
- **Authentication:** Supabase auth, offering login/logout, token-based protection for routes.
- **Deployment:** [Vercel](https://vercel.com/), using Next.js optimized deployment.

**API Routing**
- API routes use Next.js's convention: files within `src/app/api/{entity}/route.ts` export HTTP handler functions (`GET`, `POST`, etc.).
- Example:  
  `src/app/api/people/route.ts`
  ```typescript
  export async function GET() {
    const { data, error } = await supabase.from('people').select(/*fields*/);
    // Returns JSON response using NextResponse
  }
  ```
- Each API route contains access to a relevant Postgres table (`people`, `news`, etc.), handles errors, and returns JSON.
- All API routes have authorization checks; protected routes ensure only authenticated users can mutate data.

**Additional Backend Features**
- **Internationalization & Accessibility:** API responses and page structure support multiple languages and accessible markup.
- **External APIs:** There is mention of integration with external APIs (e.g., weather API) handled via custom API routes.
- **CRUD Operations:** Supported on major content entities (people, projects, news, wiki).

---

## Unified Deployment Architecture

- **Monorepo:** Both frontend and backend are developed together and deployed as a unified Next.js app.
- **Serverless:** API endpoints are handled as serverless functions on Vercel, meaning rapid scalability and global edge distribution.
- **Single Command Startup** Running `npm run dev` starts both layers locally for streamlined development.
