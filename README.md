# Pharos Blog - Frontend

Frontend project for a simple blog using **Next.js**, **TypeScript**, and **MUI**. This project supports both local blogs (stored in local storage) and blogs from an API (JSONPlaceholder), with features such as:  

- Local blog CRUD (create, read, update, delete)  
- Markdown editor for content  
- Blog preview and modal detail view  
- Dark mode / light mode  
- Pagination and search  
- Responsive layout (mobile & desktop)  

---

## Table of Contents

- [Tech Stack](#tech-stack)  
- [Folder Structure](#folder-structure)  
- [Installation](#installation)  
- [Available Scripts](#available-scripts)  
- [Features](#features)  
- [Components Overview](#components-overview)  
- [Hooks Overview](#hooks-overview)  
- [Usage](#usage)  
- [Notes](#notes)  
- [Author](#author)  

---

## Tech Stack

- Next.js 15  
- React 18  
- TypeScript 5  
- MUI (Material UI)  
- Axios  
- Jotai (state management)  
- Notistack (notification/snackbar)  
- Framer Motion (animations)  
- Tailwind CSS (utility-first styling)  
- JSONPlaceholder API (dummy blog data)  

---

## Folder Structure

```text
src
├── app
│   ├── about               # About page
│   ├── local
│   │   └── posts           # Local blog pages (list, new, detail)
│   └── page.tsx            # Home page
├── atoms                   # Jotai atoms
├── components              # Reusable UI components
│   ├── blog                # Blog-specific components
│   ├── card                # Card components
│   ├── modal               # Modal components
│   ├── navbar              # Navigation components
│   ├── pagination
│   └── style-guide         # Utilities & color theme
├── content                 # Static content (profile, category)
├── hooks                   # Custom hooks for blog & API
├── lib                     # Core logic
│   ├── common
│   ├── features
│   │   ├── blog-local
│   │   └── json-placeholder
│   └── seeder
````

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Arroziqi/pharos-blog-frontend.git
cd pharos-blog-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

The server will run at `http://localhost:3000`

---

## Available Scripts

* `dev`: Run the development server
* `build`: Build the project for production
* `start`: Run the production server
* `lint`: Run ESLint to check code

---

## Features

### Local Blog

* CRUD blog (local storage)
* Markdown editor for content
* Real-time form validation
* Thumbnail upload & preview
* Pagination + page size control

### API Blog

* Fetch data from JSONPlaceholder
* Filter by ID, title, body
* Modal for post details

### UI / UX

* Responsive grid layout
* Dark / Light mode toggle
* Animated cards & modals
* Hover effects on cards (user interaction feedback)
* Author & latest posts sidebar

---

## Components Overview

* `CardBlog`, `CardBlogSimple`, `CardHero`
* `PostDetailContent`, `LatestPosts`
* `AboutAuthor`, `Author`, `Avatar`
* `SimpleBlogModal` (animated glass modal)
* `MainContainer` (layout wrapper)
* `ToggleMenu`, `Navbar`, `LogoNavbar`
* `Pagination`, `SelectLimit`
* `ConfirmDeleteDialog`

---

## Hooks Overview

* `useBlogLocal`: Manages local blog CRUD & fetching
* `useNewLocalPostForm`: Handles local blog form logic
* `usePostDetail`: Fetches single post by ID
* `useJsonPlaceholders`: Fetch API posts, supports get by ID slicing

---

## Usage

1. **Home Page:** Displays list of API and local blogs.
2. **Local Posts:** CRUD local blogs, add new posts with form.
3. **Post Detail:** Click card to view details in modal (API) or detail page (local).
4. **About Page:** Displays profile & author information.

---

## Notes

* All thumbnails are stored as Base64 for local blogs
* JSONPlaceholder is dummy data; getById is implemented via slicing as endpoint is unavailable
* Modals use glass effect and Framer Motion for animation
* Dark mode automatically changes logo & text colors
* ESLint is enabled; avoid using `any`

---

## Author

**Ahmad Arroziqi**

* GitHub: [https://github.com/Arroziqi](https://github.com/Arroziqi)
* Portfolio: [https://arroziqi.vercel.app/](https://arroziqi.vercel.app/)
* LinkedIn: [Ahmad Arroziqi](https://www.linkedin.com/in/ahmad-arroziqi-5a0566274/)
