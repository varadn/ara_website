![ARA Lab Logo](https://raw.githubusercontent.com/varadn/ara_website/refs/heads/main/public/logo.png)

--------------------------------------------------------------------------------

# Assistive Robots & Accessibility Lab Website

Website for the Assistive Robots & Accessibility (ARA) Lab at UMass Lowell

## Project Status

✅ **Phase 1 Complete**: Basic Implementation of Website (MVP)
- Backend with NextJS
- Frontend with React + NextJS + Tailwind CSS
- Basic Home, Projects, People, and Contact page setup
- Dynamically fetch entries from database to load content
- Website auth (login, logout, protected routes)
- CRUD operations for people, projects, and news
- Internationalization (i18n)
- Accessibility features (a11y)

## Tech Stack

### Backend
- **Framework**: NextJS
- **Storage**: Supabase (Postgres)
- **Language**: NodeJS 11.6+

### Frontend
- **Framework**: React 19
- **Build Tool**: NextJS
- **UI Library**: Tailwind CSS v4
- **Language**: TypeScript

### Deployment
- **Platform**: Vercel
- **Architecture**: Monorepo (unified service - backend serves frontend)

## Project Structure

```
ara_website
├── README.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── icons
│   │   ├── XIcon.png
│   │   ├── instaIcon.png
│   │   ├── linkedinIcon.png
│   │   └── youtubeIcon.png
│   ├── logo.png
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── news
│   │   │   │   └── route.ts
│   │   │   ├── people
│   │   │   │   └── route.ts
│   │   │   ├── projects
│   │   │   │   └── route.ts
│   │   │   └── wiki
│   │   │       └── route.ts
│   │   ├── contact
│   │   │   └── page.tsx
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── home
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── login
│   │   │   └── page.tsx
│   │   ├── people
│   │   │   └── page.tsx
│   │   ├── projects
│   │   │   └── page.tsx
│   │   └── wiki
│   │       └── page.tsx
│   ├── components
│   │   ├── LangSwitcher.tsx
│   │   ├── NewsCard.tsx
│   │   ├── PersonCard.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── WikiArticleCard.tsx
│   │   ├── footer.tsx
│   │   ├── navbar.tsx
│   │   └── routes.ts
│   ├── contexts
│   │   └── AuthContext.tsx
│   ├── i18n
│   │   ├── I18n.tsx
│   │   ├── LocaleContext.tsx
│   │   ├── i18n-config.ts
│   │   └── lang
│   │       ├── en-US.json
│   │       └── es-US.json
│   ├── main.tsx
│   ├── middleware.ts
│   └── utils
│       ├── dateHelpers.ts
│       ├── helpers.ts
│       ├── supabase
│       │   ├── client.ts
│       │   ├── middleware.ts
│       │   ├── server.ts
│       │   └── supabaseClient.ts
│       ├── types.ts
│       └── weatherCodes.ts
└── tsconfig.json
```

## Local Development

The backend and frontend are unified through Next.JS, so developing either only requires starting of the local npm server.

### Frontend

1. Navigate to root directory:
   ```bash
   cd ara_website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open browser to `http://localhost:3000`

## Production Deployment

### Quick Start with Vercel

2. **Deploy to Vercel**:
   - Create a new project on [Vercel](https://vercel.com/)
   - Select Next.js as your framework in the Vercel project
   - Connect your GitHub repository
   - Your app will be live at the provided Vercel URL

## Pages

1. **Home**
    - Website home page
    - Features a logo of the ARA lab
    - Features a running column of news posts of current events in the ARA lab, pulled from Supabase
    - Authorized users can create, edit, and delete news posts from the website
2. **Projects**
    - Currently developed projects in the ARA lab
    - Features running column of projects in ARA lab, pulled from Supabase
    - Authorized users can create, edit, and delete projects from the website
3. **People**
    - People currently working/have worked in the ARA lab
    - Features running column of people in ARA lab separated by active and non-active, pulled from Supabase
    - People cards include links to projects in project section
    - Authorized users can create, edit, and delete people from the website
4. **Contact**
    - Contact page that allows for contact with ARA lab
    - Input name, email, and text
    - Opens up email formatted with information to send
5. **Wiki**
    - Only visible/accessible to authorized users
    - Shows cards of wiki pages for ARA lab information

## Implementation Phases

### ✅ Phase 1: Core Infrastructure (Complete)
- [x] Connect Supabase to website
- [x] Create a backend API with Nextjs
- [x] Build a frontend with React + Tailwind CSS
- [x] Dynamically fetch entries from Supabase database
- [x] Implement auth (login, logout) with Supabase auth
- [x] Protect pages/components and api routes with auth
- [x] CRUD operations for people, projects, news, and wiki
- [x] Internationalization (i18n)
- [x] Accessibility features (a11y)
- [x] Implement external API (weather API)

### 🚧 Phase 2: Wiki Pages
- [ ] Flesh out wiki page implementation
- [ ] Dynamic routing for new wiki pages
- [ ] Utilizing markup (ex: XML) for wiki page formatting
- [ ] Functionality of wiki (i.e. search for wiki pages, filter, add, delete)
- [ ] Styling of wiki
- [ ] Implement role-based access control (RBAC) for special permissions on the wiki

### 📋 Phase 3: Polish
- [x] Vercel deployment configuration
- [ ] Vercel blob for storing images
- [ ] Enhanced analytics tracking
- [ ] CI/CD pipeline
- [ ] Error handling and edge cases

## API Endpoints

### REST Endpoints
1. **/api/news**
    - `GET /api/news` - Fetch news posts
    - `POST /api/news` - Create news post
    - `PUT /api/news` - Edit news post
    - `DELETE /api/news` - Delete news post
2. **/api/people**
    - `GET /api/people` - Fetch people
    - `POST /api/people` - Create person
    - `PUT /api/people` - Edit person
    - `DELETE /api/people` - Delete person
3. **/api/projects**
    - `GET /api/projects` - Fetch projects
    - `POST /api/projects` - Create project
    - `PUT /api/projects` - Edit project
    - `DELETE /api/projects` - Delete project
4. **/api/wiki**
    - `GET /api/wiki` - Fetch wiki posts
    - `POST /api/wiki` - Create wiki post
    - `PUT /api/wiki` - Edit wiki post
    - `DELETE /api/wiki` - Delete wiki post


## Contributing

See [RESEARCH.md](./RESEARCH.md) for architecture details before contributing.

## Wiggle Room Requirements 

### Database & Authentication

We implement a Postgres database provided by Supabase. We define a schema for our four main entities: news posts, people, projects and wiki posts. Additionally, we define a relation between people and projects, assigning people to projects and vice-versa. We accomplish this by an intermediate join table modelling the many-to-many relation.

We implmement authentication using Supabase auth. We deliberately restrict any user from making account and only allow manual account creation through Supabase directly. Multiple users can exist in the system but currently there is only one general "authenticated" role for each user. Authenticated users are able to access the hidden wiki page and perform create, read, and update operations on the database through the website.

We implement a custom API to allow for CRUD operations of our database entities directly on the website. Except for wiki, each page has a public facing read operation (GET) that allows for fetching of our database entities for viewing and displaying. Create, edit, and delete operations (POST, PUT, and DELETE routes) require a user to be logged into the website and/or have a claim validated by Supabase auth.

### API Integration

We fetch weather data for Lowell, MA (where the ARA lab is located) using the [Open-Meteo](https://open-meteo.com/) free weather API as well as the local time. Our client finds this to be useful as if users wish to contact the ARA lab, they can get an idea of the weather conditions and/or local time of the ARA lab to gauge when they will receive a response. For example, if it is snowing in Lowell, a user can quickly be informed about the weather and form an expectation that they may received a delayed response given potential university closure. Furthermore, the client found that the weather/time API added a subtle dynamic element to the website that captured the attention of users.

We fetch weather data from the weather API in a try-catch block, handling any errors by reporting it to console and displaying a placeholder where the component would usually be rendered.

### Form Handling

We implement forms for creating and editing news posts, wiki posts, people, or projects for authenticated users. The forms are integrated into the website itself and does not use any external third party form approach. Form data is validated in both the frontend and backend. On the frontend, we perform checks on the form to ensure that all required fields are filled out and that inputs to fields meet a required format. On the backend, we validate that all necessary fields are filled out in the payload/header and that the fields meet the format required to create/edit items in the Supabase DB. Additionally, in our research of the Supabase documentation, we find that Supabase performs an additional sanitization check on DB operations so we receive additional coverage through our use of Supabase.

On create and/or edit, clients are notified about a succesful or failed operation through an alert through the website. Our custom APIs run our database operations in a try-catch block, where errors return a response code and an error for logging.

### Security Best Practices

We store API keys and secrets in a dot file and we include that dot file in our .gitignore. In our deployment, we define our secrets using Vercel's secret manager which prevents secrets from being accessed by external users. Form inputs are both validated on the frontend and backend, and are automatically sanitatized by Supabase's API before modifying the database. We utilize Supabase auth for managing users/sessions. In our research of Supabase, we find that the auth API will automatically hash the passwords on their backend.

We implement additional security practices utilizing our auth setup with Supabase. On the frontend, sensitive pages (i.e. wiki) require a valid log in to render any of the components within the page. On the backend, API routes that modify the database in any way require a user to be logged in or have a valid claim which is managed by Supabase auth. Additionally the read operation (GET route) of /api/wiki also requires a user to be logged to prevent external access to the ARA lab's sensitive wiki data.

### Internationalization

We provide es-us as an alternative language for the page. Static text on pages can be displayed wither in en-us or es-us. Dynamic content (e.g. anything fetched from the database) is only available in the language it is original created in. On the right side of the navbar, there is a dropdown for en-us or es-us which we toggle the selected language across all the pages.

We utilize react-intl to facilitate i18n on the website. We store JSON files for the languages under /src/i18n/lang. We access these JSON files depending on what language is selected and pull the respective text information using the language specified.