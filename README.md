# SAB University Management System — Frontend

A modern, role-based university management web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **TanStack Query**. It provides a unified digital campus platform for students, faculty instructors, and administrative leaders.

---

## 🌟 Key Features

### 1. Public & Marketing Pages
- **Interactive Home Page**: Features hero section, university statistics, management capabilities, department spotlights, live campus notices, and portal access CTAs.
- **Academic Departments**: Explore degree programs, course offerings, and faculty curriculums (`/departments`).
- **About Us**: University mission, vision, core values, leadership message, campus facilities, and contact details (`/about-us`).
- **Responsive Navigation & Footer**: Glassmorphism sticky navbar with active route highlighting, mobile navigation drawer, and comprehensive multi-column footer.

### 2. Authentication & Access Control
- **Credentials Authentication**: Secure email and password login with OTP email verification.
- **Google OAuth**: One-click Google sign-in (`@react-oauth/google`).
- **Role-Based Routing**: Dedicated protected dashboards for `ADMIN`, `INSTRUCTOR`, and `STUDENT`.
- **Smart Guards**:
  - `AuthGuard`: Prevents unauthenticated users from accessing protected dashboards.
  - `RoleGuard`: Restricts routes according to user permissions and roles.
  - `GuestGuard`: Prevents logged-in users from visiting `/login` or `/register`, automatically redirecting them to their respective role-based dashboard.

### 3. Role-Based Portals

- **Admin Portal (`/admin`)**:
  - System Overview & Analytics
  - User Management (Students, Instructors, Admins)
  - Department Management
  - Course & Curriculum Management
  - Semester Lifecycle & Registration Windows
  - Section Capacity & Schedule Management
- **Instructor Portal (`/instructor`)**:
  - Instructor Profile & Department Details
  - Assigned Courses & Section Rosters
  - Student Attendance & Continuous Assessment
  - Exam Grading & Result Submissions
- **Student Portal (`/student`)**:
  - Student Profile & Academic Standing
  - Course Registration & Section Advising
  - Weekly Class Schedule
  - Semester Results & CGPA Transcript
  - Financial Payments & Receipts

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (Turbopack, App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [tw-animate-css](https://github.com/lucide-icons/lucide)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI primitives)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Fetching & Cache**: [TanStack React Query v5](https://tanstack.com/query) & [ofetch](https://github.com/unjs/ofetch)
- **Forms & Validation**: [TanStack Form](https://tanstack.com/form) & [Zod](https://zod.dev/)
- **Linter & Formatter**: [Biome](https://biomejs.dev/)

---

## 📁 Project Structure

```text
src/
├── api/             # API client services (auth, department, course, etc.)
├── app/             # Next.js App Router
│   ├── (dashboard)/ # Protected dashboards (admin, instructor, student)
│   ├── (public)/    # Public routes
│   │   ├── (authentication)/ # Auth routes (login, register, forgot-password)
│   │   └── (marketing)/      # Home, about-us, departments
│   ├── globals.css  # Global styles and Tailwind v4 theme variables
│   └── layout.tsx   # Root layout with providers and notifications
├── assets/          # SVG logos and media assets
├── components/      # Reusable UI, layout, and domain components
│   ├── auth/        # Guards (AuthGuard, GuestGuard, RoleGuard)
│   ├── form/        # TanStack + Zod form components
│   ├── layout/      # Header, Footer, and Navigation layouts
│   ├── modules/     # Feature-specific module components
│   └── ui/          # shadcn/ui components (buttons, dialogs, cards, etc.)
├── hooks/           # Custom React Query mutation and query hooks
├── lib/             # API client setup and utilities
├── providers/       # QueryClient, Theme, and OAuth providers
├── routes/          # Navigation and sidebar route definitions
├── types/           # TypeScript interfaces and enum types
└── validation/      # Zod validation schemas
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version **20.x** or higher recommended)
- [pnpm](https://pnpm.io/) (version 9+ or 12+) or `npm`

### 1. Installation

Clone the repository and install dependencies in the frontend folder:

```bash
cd university-management-frontend
pnpm install
```

*(Alternatively with npm)*:
```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root of `university-management-frontend` by copying `.env.example`:

```bash
cp .env.example .env.local
```

Configure your environment variables:

```env
# Backend REST API Base URL
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1

# Google OAuth Client ID (optional for Google login)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Demo Accounts Credentials (for One-Click Demo Login)
NEXT_PUBLIC_DEMO_ADMIN_EMAIL=admin@gmail.com
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=*********

NEXT_PUBLIC_DEMO_INSTRUCTOR_EMAIL=ins@gmail.com
NEXT_PUBLIC_DEMO_INSTRUCTOR_PASSWORD=*********

NEXT_PUBLIC_DEMO_STUDENT_EMAIL=student@gmail.com
NEXT_PUBLIC_DEMO_STUDENT_PASSWORD=*********
```

### 3. Development Server

Start the local development server with Turbopack:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the Next.js development server with hot-reload |
| `pnpm build` | Compiles an optimized production build |
| `pnpm start` | Runs the production build server locally |
| `pnpm lint` | Runs [Biome](https://biomejs.dev/) to check code quality and linting |
| `pnpm format` | Formats the codebase automatically using Biome |

---

## 🔒 Authentication Flow & Redirection

1. **Unauthenticated Users**:
   - Can freely access public marketing pages (`/`, `/departments`, `/about-us`).
   - Can access authentication pages (`/login`, `/register`).
   - Are redirected to `/login` if attempting to enter protected dashboard routes (`/admin`, `/instructor`, `/student`).

2. **Authenticated Users**:
   - Automatic redirection to role dashboard upon login.
   - Protected by `GuestGuard`: Visiting `/login` or `/register` automatically redirects back to their role-based dashboard.
   - Role boundaries enforced by `RoleGuard`: Students cannot access instructor or admin areas, and instructors cannot access admin-only settings.

---

## 📄 License

This project is developed for educational and academic management purposes at SAB University.
