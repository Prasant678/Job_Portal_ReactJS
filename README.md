JobReady App

A full-stack job portal application built with React, Vite, Supabase, and Clerk Authentication. JobReady helps users explore job opportunities, apply for jobs, save listings, and manage their profile through a clean and responsive interface.

🚀 Features
Secure user authentication with Clerk
Browse and search job listings
Apply for jobs directly from the platform
Save jobs for later
Personalized user dashboard
Responsive design for mobile, tablet, and desktop
Real-time backend integration with Supabase
Fast and optimized frontend using React + Vite
🛠 Tech Stack
React.js
Vite
JavaScript
Tailwind CSS
React Router DOM
Axios
Supabase
Clerk Authentication
📦 Installation & Setup

Clone the repository:

git clone https://github.com/Prasant678/Job_Portal_ReactJS.git

cd Job_Portal_ReactJS

Install dependencies:

npm install

Create a .env file in the root directory and add the following variables:

VITE_SUPABASE_URL=your_supabase_url

VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

Start the development server:

npm run dev

Open the app in your browser:

http://localhost:5173

🏗 Build for Production

npm run build

Preview the production build locally:

npm run preview

📁 Project Structure

src/
├── components/ → Reusable UI components
├── pages/ → Application pages
├── hooks/ → Custom React hooks
├── api/ → API and Supabase logic
├── utils/ → Utility functions
├── assets/ → Images and static files
├── App.jsx
└── main.jsx

🔐 Environment Variables

These files should never be pushed to GitHub:

.env
.env.local
.env.production

Make sure the following lines exist in your .gitignore:

.env
.env.*
!.env.example

For deployment on Vercel:

Open your Vercel project
Go to Settings → Environment Variables
Add the same values from your local .env file
Redeploy the project
🌐 Deployment

This project is deployed on Vercel.

Whenever you push changes to the main branch, Vercel automatically detects the new commit and redeploys the latest version.

👨‍💻 Author

G Prasant
MERN Stack Developer
Passionate about building responsive and user-friendly web applications