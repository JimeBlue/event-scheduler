# EventBox

A React event-scheduler app: browse upcoming events, view details on a map, and — once signed in — create and manage your own.

Built with **React 19**, **React Router 8**, **TailwindCSS 4**, and **DaisyUI 5**, bundled with **Vite**.

## Features

- **Browse events** — a public events listing and an individual event details page with a location map.
- **Authentication** — a single tabbed sign in / sign up page (`/login`, `/signup`) backed by an `AuthContext`.
- **Create & manage events** — a protected `/events/new` page where signed-in users create events and see their own under "My Events".
- **Responsive header** — sticky navbar with desktop nav, a mobile slide-over menu, and an account dropdown.

## Tech stack

| Area       | Library                          |
| ---------- | -------------------------------- |
| UI         | React 19                         |
| Routing    | React Router 8                   |
| Styling    | TailwindCSS 4 + DaisyUI 5        |
| Icons      | react-icons                      |
| Build tool | Vite                             |

## Getting started

### Install

```sh
npm i
```

### Environment

Create a `.env` file in the project root and point it at the API:

```sh
VITE_API_URL=<your-api-base-url>
```

### Run

```sh
npm run dev
```

```sh
 ➜ Local: http://localhost:5173/
```

## Scripts

| Script            | Description                       |
| ----------------- | --------------------------------- |
| `npm run dev`     | Start the Vite dev server         |
| `npm run build`   | Build for production              |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Lint the project with ESLint      |

## Routes

| Path           | Access    | Page                                   |
| -------------- | --------- | -------------------------------------- |
| `/`            | Public    | Home                                   |
| `/events`      | Public    | All events                             |
| `/events/:id`  | Public    | Event details                          |
| `/login`       | Public    | Sign in (tabbed auth page)             |
| `/signup`      | Public    | Sign up (tabbed auth page)             |
| `/events/new`  | Protected | Create event / My events               |
| `*`            | Public    | Not found                              |

## Project structure

```
src/
├── assets/        # Images and graphics
├── components/    # auth, events, home, layout, ui
├── context/       # AuthContext, EventsContext
├── layouts/       # MainLayout, ProtectedLayout
├── pages/         # Route-level pages
├── services/      # API calls
└── utils/         # Helpers (formatting, validation)
```
