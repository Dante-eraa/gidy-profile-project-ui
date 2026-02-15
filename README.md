# Gidy Profile Project – Frontend

A production-ready React.js frontend for the Gidy Profile platform. This project replicates a modern professional profile page with modular architecture, optimized state management, responsive UI, and secure API integration.

Designed for scalability, maintainability, and real-world deployment.

---

## Tech Stack

### Frontend

- React.js (Vite) – Fast development & optimized build
- Redux Toolkit (RTK Query) – API state management & caching
- React Router DOM – Client-side routing
- Tailwind CSS – Utility-first responsive styling
- Lucide React – Modern icon system
- React Hot Toast – Real-time feedback notifications

---

## 💡 Innovation Features

### 1️. Interactive Skill Endorsement System

Instead of static skill listings, I implemented a real-time endorsement mechanism that transforms the skills section into an interactive social validation system.

#### What I Built:

- Endorse / Remove Endorsement toggle
- Real-time count updates using RTK Query
- Optimistic UI updates
- Micro-interaction animation (pop effect on endorse)
- Self-endorsement restriction (Profile owner cannot endorse their own skills)
- Visual differentiation for endorsed skills
- Automatic skill sorting based on endorsement count

#### How It Works:

- Each skill stores endorsement records linked by userId
- The UI checks if the logged-in user has already endorsed
- Clicking 👍 updates backend and UI instantly
- Skills with higher endorsements are prioritized visually

This converts the profile from a static resume into a community-validated professional identity system.

---

### 2️. AI-Powered Bio Generator (Generative AI Integration)

To reduce friction for users and enhance profile quality, I integrated a Generative AI-powered bio creation feature.

#### What I Built:

- A bio generation interface inside the profile editor
- Backend AI service integration
- Auto-generation of professional bio content
- One-click save into profile
- Dynamic personalization based on:
  - Name
  - Role
  - Experience
  - Career Vision

#### Technical Flow:

1. User clicks “Generate Bio”
2. Frontend sends profile context to backend AI endpoint
3. Backend calls Generative AI model
4. Generated professional bio is returned
5. User can preview and save instantly

#### Example Output:

**Input:**  
Name: Hari Haran  
Role: Entry-Level Software Developer

**Output:**  
“Hari Haran is a motivated software developer with a strong academic foundation in computer science and hands-on experience building scalable web applications. Passionate about problem-solving and continuous learning, he is eager to contribute to innovative technology solutions.”

This feature ensures:

- Professional-quality bios
- Reduced blank profile sections
- Improved recruiter impressions
- Intelligent automation inside a profile system

---

## 🛠 Setup Instructions (Run Locally)

Follow these steps to run the project locally.

### 1️. Clone the Repository

```bash
git clone https://github.com/your-username/gidy-profile-project-ui.git
cd gidy-profile-project-ui
```

### 2️. Install Dependencies

```bash
npm install
```

### 3️. Configure Environment Variables

Create a .env file in the root directory:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

Make sure your backend server is running.

### 4️. Start Development Server

```bash
npm run dev
```
