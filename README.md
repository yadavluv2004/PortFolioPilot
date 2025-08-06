# 🧠 PortFolioPilot – AI-Powered Portfolio Builder

[🚀 Live Demo →](https://port-folio-pilot.vercel.app/)

PortFolioPilot is a full-stack, AI-powered resume and portfolio builder that leverages **Gemini AI** to help users generate highly personalized resume summaries and bullet points. It enables real-time customization, secure authentication, and one-click PDF export.

---

## 🚀 Features

- 🤖 **AI-Powered Resume Suggestions**  
  Automatically generates tailored bullet points and summaries using Gemini API.

- ✨ **Live Resume Editor with CMS Integration**  
  Users can dynamically edit resume sections using a custom UI backed by Strapi CMS.

- 🔐 **Authentication**  
  Secure login and user management powered by Passport.js.

- 📄 **One-Click PDF Export**  
  Generate and download beautifully formatted PDF resumes instantly.

- ⚡ **Real-Time Frontend-Backend Sync**  
  Fully reactive experience with seamless integration across all layers.

---

## 🛠️ Tech Stack

| Tech              | Role / Usage                              |
|-------------------|--------------------------------------------|
| **React**         | Frontend Framework                         |
| **Tailwind CSS**  | Utility-first CSS Styling                  |
| **Express.js**    | Backend API & Routing                      |
| **Gemini API**    | AI Content Generation                      |
| **Passport.js**   | Authentication Middleware                  |
| **Strapi CMS**    | Headless CMS to Manage Resume Content      |
| **Vercel**        | Frontend Hosting and Deployment            |

---

## 🧩 Architecture

Client (React + Tailwind)
↓
Gemini API — Generates AI bullet points
↓
Express.js (Backend API + Auth via Passport.js)
↓
Strapi CMS (Resume templates, dynamic content)

yaml
Copy
Edit

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/portfolio-pilot.git
cd portfolio-pilot
2. Install dependencies
bash
Copy
Edit
npm install
# or
yarn install
3. Configure environment variables
Create a .env.local file in the root directory with the following:

env
Copy
Edit
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# Backend environment
SESSION_SECRET=your_secret_key
STRAPI_API_KEY=your_strapi_api_key
4. Run the development server
bash
Copy
Edit
npm run dev
🧪 Testing
You can test the following features:

User login/logout

Gemini AI integration with real-time text suggestions

Resume editing via CMS

Exporting resume to PDF

Responsive UI on desktop and mobile

📤 Deployment
Frontend
Deployed using Vercel

Backend
You can deploy the Express server on platforms like Render or Railway

CMS
Strapi CMS can be:

Self-hosted

Deployed via Strapi Cloud

