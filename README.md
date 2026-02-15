# 🚀 Gidy Profile Project – Frontend

A production-ready React.js frontend for the Gidy Profile platform. This project replicates a modern professional profile page with modular architecture, optimized state management, responsive UI, and secure API integration.

Designed for scalability, maintainability, and real-world deployment.

## 📦 Tech Stack

### 🖥 Frontend

- **React.js (Vite)** – Fast development & optimized build
- **Redux Toolkit (RTQ Query)** – Global state management & API caching
- **React Router DOM** – Client-side routing
- **Tailwind CSS** – Utility-first responsive styling
- **Lucide React** – Modern icon system
- **React Hot Toast** – Elegant notifications

### 🔐 Backend Integration

- **RESTful API** (Node.js + Express)
- **JWT Authentication** (Secure cookie-based auth)
- **Cloudinary** (Image & Resume storage)

### 🚀 Deployment

- **Frontend:** Vercel
- **Backend:** Railway
- **Database:** PostgreSQL (Railway)

---

## 💡 Innovation Features

### 1️⃣ Peer-to-Peer Skill Endorsement System

Unlike traditional platforms that allow self-endorsement, this feature implements a **community-verified skill ecosystem**:

- **No Self-Endorsement**: Users cannot endorse their own skills, ensuring authenticity and credibility
- **Peer Verification**: Only connections and colleagues can endorse skills, creating a trusted network
- **Endorsement Analytics**: Track who endorsed your skills and discover trending skills in your network
- **Skill Weighting**: Skills with endorsements from senior professionals carry more weight
- **Endorsement Requests**: Users can request endorsements from specific connections for skills they've demonstrated

This creates a more trustworthy profile where skills are validated by actual professional interactions rather than self-promotion.

### 2️⃣ AI-Powered Bio Generator

First impressions matter – this feature helps users create compelling professional bios instantly:

- **Smart Generation**: Enter your name and get a professionally crafted bio tailored to your industry
- **Context-Aware**: The AI analyzes your name, industry, and experience level to generate appropriate content
- **Multiple Tones**: Choose from professional, creative, executive, or technical writing styles
- **One-Click Integration**: Generated bios can be instantly saved to your profile
- **Learning System**: The generator improves over time based on user preferences and accepted suggestions

Example: Input "John Doe" + "Software Engineer" → Generates: _"John Doe is a passionate Software Engineer with expertise in building scalable web applications. He thrives on solving complex problems and collaborating with cross-functional teams to deliver impactful solutions."_

These innovations transform the profile from a static resume into a dynamic, community-verified professional presence.

---

## 🛠 Setup Instructions (Run Locally)

Follow these steps to run the project locally.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/gidy-profile-project-ui.git
cd gidy-profile-project-ui
```

###2️⃣ Install Dependencies

```bash
npm install
```

###3️⃣ Configure Environment Variables

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```
