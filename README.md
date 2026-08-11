# 🏢 ERP-CRM Operations Portal

> A production-ready **Mini ERP + CRM Operations Portal** built as a full-stack developer case study.

---

## ✨ Overview

A monorepo web application for managing customers, products, inventory, stock movements, and sales challans with role-based access control across four organizational roles.

| Module               | Description                                     |
| -------------------- | ----------------------------------------------- |
| **Authentication**   | JWT login, registration, role-based access       |
| **Customer CRM**     | CRUD, search, contact management                 |
| **Product & Inventory** | SKU management, stock levels, min-stock alerts |
| **Stock Movement**   | IN / OUT / ADJUSTMENT tracking with audit trail  |
| **Sales Challans**   | Draft → Confirmed → Dispatched → Delivered flow  |

### Roles

| Role          | Access                                            |
| ------------- | ------------------------------------------------- |
| **Admin**     | Full system access, user management                |
| **Sales**     | Customers, challans, product catalog (read-only)   |
| **Warehouse** | Products, inventory, stock movements               |
| **Accounts**  | Challans (read-only), reports                      |

---

## 🛠 Tech Stack

| Layer        | Technology                            |
| ------------ | ------------------------------------- |
| Frontend     | React 19 · TypeScript · Vite 6        |
| Backend      | Node.js · Express · TypeScript         |
| Database     | PostgreSQL                             |
| ORM          | Prisma                                 |
| Auth         | JWT · bcrypt                           |
| Validation   | Zod                                    |
| HTTP Client  | Axios                                  |
| Linting      | ESLint (flat config, type-checked)     |

---

## 📁 Project Structure

```
erp-crm-operations-portal/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Database models & relations
│   │   └── seed.ts                # Database seeder
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts        # Prisma client singleton
│   │   │   └── env.ts             # Zod env validation
│   │   ├── middleware/
│   │   │   ├── errorHandler.ts    # Global error handler
│   │   │   └── notFound.ts        # 404 catch-all
│   │   ├── modules/
│   │   │   ├── auth/              # Authentication & RBAC
│   │   │   ├── customers/         # Customer CRM
│   │   │   ├── products/          # Product & inventory
│   │   │   ├── stock-movements/   # Stock movement tracking
│   │   │   └── challans/          # Sales challans
│   │   ├── routes/
│   │   │   └── index.ts           # Central API router
│   │   ├── types/
│   │   │   └── index.ts           # Shared type definitions
│   │   ├── utils/
│   │   │   └── apiError.ts        # Custom API error class
│   │   ├── app.ts                 # Express app factory
│   │   └── server.ts              # Entry point + graceful shutdown
│   ├── .env.example
│   ├── eslint.config.mjs
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   │   └── vite.svg               # Favicon
│   ├── src/
│   │   ├── components/            # Reusable UI components
│   │   ├── contexts/              # React context providers
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── lib/
│   │   │   └── axios.ts           # Pre-configured Axios instance
│   │   ├── pages/                 # Route page components
│   │   ├── types/                 # Shared TypeScript types
│   │   ├── App.tsx                # Root component
│   │   ├── index.css              # Design system & global styles
│   │   └── main.tsx               # React entry point
│   ├── .env.example
│   ├── eslint.config.mjs
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite-env.d.ts
│   └── vite.config.ts
├── .env.example
├── .gitignore
├── package.json                   # Monorepo root (npm workspaces)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **PostgreSQL** ≥ 14.x
- **npm** ≥ 9.x

### 1. Clone & Install

```bash
git clone https://github.com/your-username/erp-crm-operations-portal.git
cd erp-crm-operations-portal
npm install
```

### 2. Configure Environment

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env with your PostgreSQL credentials and JWT secret

# Frontend
cp frontend/.env.example frontend/.env
```

### 3. Set Up Database

```bash
# Generate Prisma client
npm run db:generate -w backend

# Run migrations
npm run db:migrate

# Seed initial data (optional)
npm run db:seed
```

### 4. Start Development

```bash
# Start backend (http://localhost:4000)
npm run dev:backend

# Start frontend (http://localhost:5173)
npm run dev:frontend
```

---

## 📡 API Overview

All endpoints are prefixed with `/api/v1`.

| Endpoint               | Module            | Methods                  |
| ---------------------- | ----------------- | ------------------------ |
| `/api/v1/auth`         | Authentication     | POST (login, register)   |
| `/api/v1/customers`    | Customer CRM       | GET, POST, PUT, DELETE   |
| `/api/v1/products`     | Product & Inventory | GET, POST, PUT, DELETE  |
| `/api/v1/stock-movements` | Stock Movement  | GET, POST                |
| `/api/v1/challans`     | Sales Challans     | GET, POST, PUT, PATCH    |
| `/health`              | Health Check       | GET                      |

---

## 🧪 Scripts Reference

| Script                | Description                          |
| --------------------- | ------------------------------------ |
| `npm run dev:backend`  | Start backend dev server (tsx watch)  |
| `npm run dev:frontend` | Start Vite dev server                 |
| `npm run build:backend`| Compile TypeScript to dist/           |
| `npm run build:frontend`| Build React production bundle        |
| `npm run lint:backend` | Lint backend source                   |
| `npm run lint:frontend`| Lint frontend source                  |
| `npm run db:migrate`   | Run Prisma migrations                 |
| `npm run db:seed`      | Seed database                         |
| `npm run db:studio`    | Open Prisma Studio GUI                |

---

## 🔐 Security Practices

- ✅ Environment variables validated at startup with Zod
- ✅ No hardcoded secrets — all sensitive values in `.env`
- ✅ `.env` excluded from version control via `.gitignore`
- ✅ JWT-based stateless authentication
- ✅ Password hashing with bcrypt (configurable salt rounds)
- ✅ Helmet for HTTP security headers
- ✅ CORS restricted to configured origins
- ✅ Global error handler — no stack traces leaked in production
- ✅ Graceful server shutdown on SIGTERM/SIGINT

---

## 📝 License

This project is part of a developer case study portfolio.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/module-name`)
3. Commit your changes (`git commit -m 'feat: add module-name'`)
4. Push to the branch (`git push origin feature/module-name`)
5. Open a Pull Request
