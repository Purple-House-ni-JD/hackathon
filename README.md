# VISTA: Visibility & Information System for Tracking Approvals

A web application for tracking document approvals and visibility across organizations.

---

## Team Members (Full Names)

1. John Dave Rojo  
2. Justine Jude Bardinas  
3. Kharl Jey Dagoc  
4. Isabella Gonzalez  

---

## Tech Stack Used

- **Backend:** Laravel (PHP)  
- **Frontend:** React (with TypeScript, Vite, Tailwind CSS)  

---

## Setup & Run Instructions

### Prerequisites

- **PHP** 8.2+ (with extensions: mbstring, xml, ctype, json, bcmath, pdo_sqlite)  
- **Composer**  
- **Node.js** 18+ and **npm**  

### Backend (Laravel)

1. Open a terminal and go to the backend folder:
   ```bash
   cd hack-backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy the environment file and generate an application key:
   ```bash
   copy .env.example .env
   php artisan key:generate
   ```

4. Create the SQLite database file (if it doesn’t exist):
   ```bash
   type nul > database\database.sqlite
   ```
   Or on macOS/Linux: `touch database/database.sqlite`

5. Run migrations:
   ```bash
   php artisan migrate
   ```

6. Start the Laravel server:
   ```bash
   php artisan serve
   ```
   The API will be available at **http://localhost:8000**.

### Frontend (React)

1. Open a **new** terminal and go to the frontend folder:
   ```bash
   cd hack-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) If your backend is not on `http://localhost:8000`, create a `.env` file in `hack-frontend` and set:
   ```
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open the URL shown in the terminal (e.g. **http://localhost:5173**) in your browser.

### Summary

- Keep **Laravel** running in one terminal (`php artisan serve` in `hack-backend`).  
- Keep **React** running in another (`npm run dev` in `hack-frontend`).  
- Use the frontend URL (e.g. http://localhost:5173) to use the app.  

---

## Screenshots / Demo Link

### Admin

| Admin Login | Dashboard | Activity |
|-------------|-----------|----------|
| ![Admin Login](screenshots/admin-login.png) | ![Admin Dashboard](screenshots/admin-dashboard.png) | ![Admin Activity](screenshots/admin-activity.png) |

| Pending Actions | New Document | Organizations |
|-----------------|--------------|---------------|
| ![Admin Pending](screenshots/admin-pending.png) | ![New Document](screenshots/admin-new-document.png) | ![Organizations](screenshots/admin-organizations.png) |

| Edit Profile |
|--------------|
| ![Admin Profile](screenshots/admin-profile.png) |

### User (Organization)

| My Dashboard | My Documents | Track Status |
|--------------|--------------|--------------|
| ![User Dashboard](screenshots/user-dashboard.png) | ![My Documents](screenshots/user-documents.png) | ![Track Status](screenshots/user-track-status.png) |

| Notifications |
|---------------|
| ![Notifications](screenshots/user-notifications.png) |

---

## Project Structure

- **`hack-backend/`** — Laravel API (auth, documents, organizations, offices, etc.)  
- **`hack-frontend/`** — React SPA (admin and user dashboards, documents, tracking)  
