# Student Frontend — Next.js Frontend

A full-stack frontend for managing student records in a school system, built with Next.js 15, React, Tailwind CSS, and Axios.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15.x | React framework |
| React | 19.x | UI library |
| Tailwind CSS | 3.x | Styling |
| Axios | - | HTTP requests to backend API |

---

## Project Structure

```
student-frontend/
├── app/
│   ├── layout.js                  # Root layout & metadata
│   ├── page.js                    # Dashboard page
│   ├── login/
│   │   └── page.js                # Login page
│   ├── register/
│   │   └── page.js                # Register page
│   └── students/
│       ├── page.js                # Students list page
│       ├── add/
│       │   └── page.js            # Add student page
│       └── edit/[id]/
│           └── page.js            # Edit student page
├── components/
│   ├── Navbar.js                  # Navigation bar
│   └── ProtectedRoute.js          # Auth guard for protected pages
├── services/
│   └── api.js                     # All API calls to Spring Boot backend
├── .env.local                     # Environment variables
└── package.json
```

---

## Prerequisites

Make sure you have the following installed:

- [Node.js 18+](https://nodejs.org)
- [student-api](https://github.com/CedardJay/student-api) backend running on port `8081`

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/student-frontend.git
cd student-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_API_URL=http://localhost:8081
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will start at `http://localhost:3000`

---

## Pages

| Page | Route | Access | Description |
|---|---|---|---|
| Login | `/login` | Public | Sign in with email and password |
| Register | `/register` | Public | Create account with invite code |
| Dashboard | `/` | Protected | Overview and quick stats |
| Students List | `/students` | Protected | View, edit, delete all students |
| Add Student | `/students/add` | Protected | Register a new student |
| Edit Student | `/students/edit/[id]` | Protected | Update student details |

---

## Features

- JWT authentication — token stored in `localStorage`
- Protected routes — redirects to login if not authenticated
- Register with invite code — prevents unauthorized account creation
- Full student CRUD — create, read, update, delete students
- Responsive UI built with Tailwind CSS
- Axios interceptor — automatically attaches JWT token to every request
- Dashboard with live student count

---

## Authentication Flow

```
User visits app
      ↓
Not logged in? → Redirect to /login
      ↓
Login → receive JWT token → store in localStorage
      ↓
Redirect to Dashboard
      ↓
Every API request automatically sends token
      ↓
Logout → clear localStorage → redirect to /login
```

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the Spring Boot backend | `http://localhost:8081` |

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Connecting to Backend

All API calls are managed in `services/api.js`. The Axios instance automatically:
- Sets the base URL from `NEXT_PUBLIC_API_URL`
- Attaches the JWT token from `localStorage` to every request

To point to a different backend, just update `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

---

## Related

- **Backend Repository:** [student-api](https://github.com/CedardJay/student-api)
- Built with [Create Next App](https://nextjs.org/docs/app/api-reference/cli/create-next-app)

---

## License

This project is for educational purposes.
