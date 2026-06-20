# Prayana AI ✈️

**Plan Smarter. Journey Better.**

Prayana AI is a modern AI-powered travel planning platform that helps travelers create personalized trip itineraries, estimate travel budgets, discover recommended hotels, and organize travel plans in one place.

The name **Prayana** comes from the Sanskrit word meaning **"journey"**, **"expedition"**, or **"travel"**, reflecting the core mission of helping users plan meaningful journeys through intelligent technology.

---

## 🌍 Live Demo

Frontend: [Add Deployment URL]

Backend API: [Add Backend URL]

Video Walkthrough: [Add Video Link]

GitHub Repository: [Add Repository Link]

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
* Role-based Ownership Validation
* Secure User Sessions

---

## AI-Powered Trip Generation

Generate personalized trips based on:

* Destination
* Number of Days
* Budget Preference
* Interests

Example Interests:

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

A static resource section containing:

* Flight Booking Tips
* Packing Advice
* Budget Travel Tips
* Safety Guidelines
* International Travel Tips
* Solo Travel Tips

---

## Travel Checklist

Interactive travel checklist featuring:

* Travel Documents
* Electronics
* Clothing
* Health Essentials
* Money & Payments
* Before Leaving Home Checklist

Checklist progress is stored in localStorage.

---

# 🎨 Design Philosophy

## Modern Explorer Theme

Prayana AI is designed using a premium travel-tech aesthetic inspired by:

* Airbnb
* Google Travel
* TripAdvisor
* Booking.com

Core Principles:

* Exploration
* Simplicity
* Trust
* Accessibility
* Modern UX

---

## Color Palette

Primary:

```txt
#0F4C81
```

Secondary:

```txt
#38BDF8
```

Accent:

```txt
#F97316
```

Background:

```txt
#F8FAFC
```

Text:

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
* Structured JSON Responses

No LangChain was used in this project.

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

* Viewing other users' trips
* Editing other users' trips
* Deleting other users' trips

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
Parse Response
      │
      ▼
Store in MongoDB
```

Generated Content:

* Itinerary
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

---

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

---

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

---

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
git clone <repository-url>
```

---

## Frontend

```bash
cd prayana-frontend

npm install

npm run dev
```

---

## Backend

```bash
cd prayana-backend

npm install

npm run dev
```

---

# 🚀 Deployment

## Frontend

Deploy using:

* Vercel

---

## Backend

Deploy using:

* Render
* Railway

---

## Database

Use:

* MongoDB Atlas

---

# ⚖️ Key Design Decisions

### Why Next.js?

* Modern React framework
* Excellent developer experience
* App Router support
* Fast performance

### Why MongoDB?

* Flexible schema
* Easy handling of AI-generated content

### Why Gemini API?

* Fast responses
* Cost-effective
* Strong structured content generation

### Why Direct Gemini Integration Instead of LangChain?

The project requires structured content generation rather than multi-agent orchestration. Direct Gemini integration reduces complexity while maintaining scalability and performance.

---

# 🎯 Creative Feature

### Travel Resource Center

Added two traveler-focused pages:

#### Travel Tips

Provides practical travel guidance.

#### Travel Checklist

Interactive checklist with localStorage persistence.

These features improve user preparedness before travel and make Prayana AI feel like a complete travel platform.

---

# ⚠️ Known Limitations

* Hotel recommendations are AI-generated and not connected to live hotel booking services.
* Budget estimates are approximate and may vary.
* Flight pricing is not real-time.
* Currency conversion is not integrated.
* AI responses may occasionally require regeneration.

---

# 👨‍💻 Author

Sai Chandan

Full Stack Developer

Built as part of a Full Stack Developer Assessment.

---

## Thank You

Thank you for reviewing Prayana AI.

Plan Smarter. Journey Better. ✈️
