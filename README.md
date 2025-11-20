# Workspace Booking & Pricing System

A mini full-stack application for booking co-working meeting rooms by the hour with dynamic pricing, conflict prevention, cancellation rules, and admin analytics.

---

## Table of Contents

- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Future Improvements](#future-improvements)

---

## Live Demo

- **URL:** book-rooms.vercel.app  


---

## Tech Stack

- **Backend:** Node.js, TypeScript, Express  
- **Frontend:** React, TypeScript, Tailwind CSS, TanStack React Query  
- **Data:** In-memory storage (can be replaced with SQL/NoSQL)  
- **Deployment:** Render (backend), Netlify/Vercel (frontend)  

---

## Features

### User

- List available rooms with capacity & base hourly rate
- Book rooms by selecting start & end times
- Prevent overlapping bookings
- Dynamic pricing:  
  - Peak hours (Mon–Fri, 10:00–13:00 & 16:00–19:00) → 1.5× base rate  
  - Off-peak → base rate
- Cancel bookings (only > 2 hours before start time)

### Admin

- View all bookings with status
- Cancel bookings
- View analytics: total hours & revenue per room
- Filter analytics by date range

---

## Project Structure

/backend
/data → in-memory room & booking data
/models → Booking & Room models
/routes → API routes (bookings, analytics)
/utils → helper functions (price calculation, time parsing, conflict checks)
index.ts → backend server entry
/frontend
/components → React components (BookingForm, Rooms, AdminDashboard)
/hooks → React Query hooks for API calls
/pages → pages for user/admin
App.tsx
index.tsx

yaml
Copy code

---

## Backend Setup

1. Navigate to backend folder:  
   ```bash
   cd backend
Install dependencies:

bash
Copy code
npm install
Start server:

bash
Copy code
npm run dev
Server runs at http://localhost:5000 (or your configured port)

Frontend Setup
Navigate to frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start React app:

bash
Copy code
npm run dev
App runs at http://localhost:5173 (or your configured port)
