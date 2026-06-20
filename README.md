# Prayana AI ✈️

**Plan Smarter. Journey Better.**

Prayana AI is a modern AI-powered travel planning platform that helps travelers create personalized trip itineraries, estimate travel budgets, discover recommended hotels, and organize travel plans in one place.

The name **Prayana** comes from the Sanskrit word meaning **"journey"**, **"expedition"**, or **"travel"**, reflecting the core mission of helping users plan meaningful journeys through intelligent technology.

---

## 🌍 Live Demo

### Frontend Application

https://prayana-ai.vercel.app/

### Backend API

https://prayana-backend-4qc3.onrender.com/

### GitHub Repository

https://github.com/Saichandanyadav/PrayanaAI

### Application Walkthrough Video

(Add Video Link Here)

---

# 📖 Project Overview

Prayana AI is a full-stack travel planning application that leverages Google Gemini AI to generate personalized travel itineraries based on user preferences.

Users can:

* Create an account
* Securely log in
* Generate AI-powered travel plans
* Receive budget estimations
* Get hotel recommendations
* Edit trip itineraries
* Regenerate specific travel days
* Export trips as PDF
* Access travel resources and checklists

The application supports multiple users with strict data isolation and secure authentication.

---

# 🚀 Features

## Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Password Hashing using bcryptjs
* Protected Routes
* Ownership-Based Authorization
* Secure User Sessions

---

## AI-Powered Trip Generation

Generate personalized trips based on:

* Destination
* Number of Days
* Budget Preference
* Interests

Supported interests include:

* Food
* Culture
* Adventure
* Shopping
* Nature
* History

---

## Budget Estimation

AI estimates travel costs including:

* Flights
* Accommodation
* Food
* Activities

Example:

```json
{
  "flights": 400,
  "accommodation": 300,
  "food": 150,
  "activities": 100,
  "total": 950
}
```

---

## Hotel Recommendations

Generate hotel suggestions based on:

* Destination
* Budget Type
* Traveler Preferences

Categories:

* Budget
* Mid-Range
* Luxury

---

## Editable Itineraries

Users can:

* Add Activities
* Edit Activities
* Remove Activities
* Regenerate Specific Days

Example:

> Regenerate Day 3 with more outdoor activities.

---

## PDF Export

Export complete trip plans as PDF documents.

Includes:

* Destination
* Budget Breakdown
* Hotel Recommendations
* Day-wise Itinerary

---

## Travel Tips

A dedicated travel resource center containing:

* Flight Booking Tips
* Packing Advice
* Budget Travel Tips
* Safety Guidelines
* International Travel Tips
* Solo Travel Tips

---

## Travel Checklist

Interactive travel preparation checklist featuring:

* Travel Documents
* Electronics
* Clothing
* Health Essentials
* Money & Payments
* Before Leaving Home Checklist

Checklist progress is automatically stored using localStorage.

---

# 🎨 Design Philosophy

## Modern Explorer Theme

Prayana AI follows a premium travel-tech design language inspired by:

* Airbnb
* Google Travel
* TripAdvisor
* Booking.com

Core Principles:

* Exploration
* Simplicity
* Trust
* Accessibility
* Modern User Experience

---

## Color Palette

Primary

```txt
#0F4C81
```

Secondary

```txt
#38BDF8
```

Accent

```txt
#F97316
```

Background

```txt
#F8FAFC
```

Text

```txt
#1E293B
```

---

# 🛠 Tech Stack

## Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* React Hook Form
* Axios
* Lucide React

---

## Backend

* Node.js
* Express.js
* TypeScript
* JWT Authentication
* bcryptjs

---

## Database

* MongoDB Atlas
* Mongoose

---

## AI Integration

* Google Gemini API
* Direct REST API Integration
* Dynamic Model Discovery
* Structured JSON Response Parsing

**LangChain was intentionally not used to keep the architecture simple, lightweight, and maintainable.**

---

# 🏗 System Architecture

```txt
User
 │
 ▼
Frontend (Next.js)
 │
 ▼
Backend API (Express.js)
 │
 ▼
Google Gemini API
 │
 ▼
Structured Travel Plan
 │
 ▼
MongoDB Database
 │
 ▼
Response to User
```

---

# 🔐 Authentication Flow

### Registration

```txt
User Registers
        │
        ▼
Password Hashed
        │
        ▼
Store User in MongoDB
```

### Login

```txt
User Login
       │
       ▼
Verify Credentials
       │
       ▼
Generate JWT
       │
       ▼
Return Token
```

### Protected Routes

```txt
Request
   │
   ▼
JWT Middleware
   │
   ▼
Validate Token
   │
   ▼
Allow Access
```

---

# 🔒 Authorization Strategy

Each Trip document contains:

```ts
userId
```

Before any operation:

```ts
trip.userId === authenticatedUser.id
```

This prevents users from:

* Viewing another user's trips
* Editing another user's trips
* Deleting another user's trips

Every trip operation is ownership-validated before execution.

---

# 🤖 AI Agent Design

Prayana AI uses direct Google Gemini integration.

Workflow:

```txt
User Input
      │
      ▼
Generate Prompt
      │
      ▼
Google Gemini API
      │
      ▼
Structured JSON
      │
      ▼
Validate & Parse JSON
      │
      ▼
Store in MongoDB
      │
      ▼
Return Response
```

Generated Content:

* Day-wise Itinerary
* Budget Estimation
* Hotel Recommendations

---

# 🗂 Database Schema

## User

```ts
{
  name: String,
  email: String,
  password: String
}
```

## Trip

```ts
{
  userId: ObjectId,
  destination: String,
  numberOfDays: Number,
  budgetType: String,
  interests: [String],
  itinerary: Array,
  budgetEstimate: Object,
  hotelSuggestions: Array
}
```

---

# 📁 Project Structure

## Frontend

```txt
src/
│
├── app/
├── components/
├── hooks/
├── services/
├── types/
├── lib/
└── utils/
```

## Backend

```txt
src/
│
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── services/
├── types/
└── utils/
```

---

# ⚙️ Environment Variables

## Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Backend

```env
PORT=5000
MONGODB_URI=
JWT_SECRET=
GOOGLE_GEMINI_API_KEY=
```

---

# 🧪 Local Setup

## Clone Repository

```bash
git clone https://github.com/Saichandanyadav/PrayanaAI.git
```

## Frontend

```bash
cd prayana-frontend

npm install

npm run dev
```

## Backend

```bash
cd prayana-backend

npm install

npm run dev
```

---

# 🚀 Deployment

## Frontend

Deployed on Vercel:

https://prayana-ai.vercel.app/

## Backend

Deployed on Render:

https://prayana-backend-4qc3.onrender.com/

## Database

MongoDB Atlas

---

# ⚖️ Key Design Decisions

### Why Next.js?

* Modern React Framework
* App Router Architecture
* Excellent Performance
* Great Developer Experience

### Why MongoDB?

* Flexible Schema Design
* Suitable for AI-generated nested data structures

### Why Gemini API?

* Fast response generation
* Cost-effective API access
* Excellent structured content generation

### Why Direct Gemini Integration Instead of LangChain?

The application requires structured itinerary generation rather than complex agent orchestration. Direct Gemini integration reduces dependencies, improves maintainability, and keeps the architecture simpler.

---

# 🎯 Creative Feature

## Travel Resource Center

Prayana AI includes two additional traveler-focused features:

### Travel Tips

Provides practical guidance for:

* Flight bookings
* Packing
* Budget travel
* Safety
* International travel
* Solo travel

### Travel Checklist

Provides an interactive checklist with localStorage persistence, allowing travelers to track preparation progress before departure.

These additions improve traveler preparedness and enhance the overall travel planning experience.

---

# ⚠️ Known Limitations

* Hotel recommendations are AI-generated and not connected to live hotel booking APIs.
* Budget estimates are approximate and may vary based on season and location.
* Flight pricing is not real-time.
* Currency conversion is not yet integrated.
* AI-generated responses may occasionally require regeneration.

---

# 👨‍💻 Author

**Sai Chandan**

Full Stack Developer

Built as part of a Full Stack Developer Assessment.

---

## Thank You

Thank you for reviewing **Prayana AI**.

**Plan Smarter. Journey Better. ✈️**
