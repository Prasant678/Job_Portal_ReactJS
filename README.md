JobReady App

A modern job portal web application built with React and Vite. The app allows users to browse jobs, apply for positions, manage their profile, and track applications.

Features
User authentication (Login / Signup)
Browse and search jobs
Apply for jobs
Save jobs for later
User dashboard
Responsive UI
Fast development with React + Vite

Tech Stack
React.js
Vite
JavaScript
CSS / Tailwind CSS
React Router DOM
Axios
SupaBase
Clerk Authentication
Installation

Clone the repository:
git clone https://github.com/your-username/jobready-app.git
cd jobready-app

Install dependencies:
npm install

Create a .env file in the root directory and add your environment variables
VITE_SUPABASE_URL=your_Supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

Run the development server:
npm run dev

Open in browser:

http://localhost:5173
Build for Production
npm run build

Preview production build:
npm run preview

Project Structure
src/
├── components/
├── pages/
├── hooks/
├── api/
├── utils/
├── App.jsx
└── main.jsx
Environment Variables

The following files should NOT be pushed to GitHub:
.env
.env.local
.env.production

Instead, add the same variables manually inside Vercel:

Go to Project Settings
Open Environment Variables
Add all variables from your local .env
GitHub Repository

After creating the repository, push your code:
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/jobready-app.git
git push -u origin main
Deployment

This project is deployed on Vercel.
Whenever you push new code to the main branch, Vercel will automatically rebuild and deploy the latest version.

Author
G Prasant