# RateStore - Store Rating FullStack Application

A modern, responsive web application that allows users to register, search, and submit ratings (1 to 5 stars) for registered stores. Built as an intern coding challenge.

## Tech Stack
- **Frontend**: React (Vite + TypeScript) with a custom **Vanilla CSS** design system (Outfit & Inter fonts, responsive layout, dark theme, smooth micro-animations, layout layouts).
- **Backend**: ExpressJS with TypeScript and **Prisma ORM** mapping to a MySQL database.
- **Security**: Password hashing via `bcryptjs`, JWT token-based session management, and role-based route guards.
- **Validation**: Schema-based payload validation via **Zod** (both frontend and backend).

---

## User Roles & Credentials
The database is pre-seeded with the following accounts for easy testing. All passwords satisfy the requirement of **8-16 characters, 1 uppercase letter, and 1 special character**.

1. **System Administrator**
   - **Email**: `admin@storerating.com`
   - **Password**: `AdminPass123!`
   - **Purpose**: Add stores, normal users, admin users; view platform stats and full directories with sorting and details dialogs.

2. **Normal Users**
   - **User 1**: `user1@storerating.com` / `UserPass123!`
   - **User 2**: `user2@storerating.com` / `UserPass123!`
   - **Purpose**: Search registered stores by name and address, submit/modify rating scores (1-5 stars), update passwords.

3. **Store Owners**
   - **Store 1**: `store1@storerating.com` / `StorePass123!` (Super Store Alpha Location)
   - **Store 2**: `store2@storerating.com` / `StorePass123!` (Mega Mart Beta Headquarters)
   - **Store 3**: `store3@storerating.com` / `StorePass123!` (Gourmet Food Plaza Station)
   - **Purpose**: View store average rating, rating breakdowns, and a sorted directory of customers who rated them.

---

## Setup & Running the Application

### 1. Database Setup
Ensure MySQL is running. In `backend/.env`, update the `DATABASE_URL` with your local credentials. The current configuration uses:
```env
DATABASE_URL="mysql://root:Radhe%40Radhe1111@localhost:3306/store_rating_db"
```
*(Note: `@` is URL-encoded as `%40`)*

Run the following commands inside the `backend` folder to push the schema and seed the database:
```bash
cd backend
npx prisma db push
npx prisma db seed
```

### 2. Install Dependencies
You can install dependencies for the whole project using the script in the root directory:
```bash
npm run install:all
```

### 3. Run Development Servers
Start both the backend API and frontend dev servers concurrently using:
```bash
npm run dev
```
- Frontend will open at: `http://localhost:5173`
- Backend API will run at: `http://localhost:5000`

---

## Code Quality & Architecture
- **Responsive Layout**: Designed via standard CSS layout patterns (flex wrap, responsive grid auto-fit, media queries).
- **Validation Constraints**: 
  - **Name**: 20 to 60 characters.
  - **Address**: Max 400 characters.
  - **Password**: 8-16 characters, 1 uppercase, 1 special character.
- **Layout Component**: Located at `frontend/src/components/Layout.tsx`, enclosing the header and footer in a single file that adjusts dynamically based on the active role and session.
- **Archiving**: Run the included `./zip-project.ps1` script in PowerShell to package the project source code for distribution.
