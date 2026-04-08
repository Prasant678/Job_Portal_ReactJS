# JobReady - Full-Stack Job Portal

JobReady is a full-stack job portal application designed to connect job seekers with recruiters through a simple and modern interface. The platform allows users to browse available jobs, save opportunities, apply directly, and manage their profile from a personalized dashboard.

The application is built using React and Vite for the frontend, Supabase for backend services and database operations, and Clerk for secure user authentication. It follows a scalable architecture with reusable components, API integration, and a responsive design for both desktop and mobile devices.

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios

### Backend / Services
- Supabase
- Clerk Authentication

### Deployment
- Vercel

## Features

- Secure user authentication and authorization using Clerk
- Browse and search job listings
- Save jobs for later
- Apply for jobs directly from the platform
- Personalized dashboard for users
- Real-time data management with Supabase
- Responsive design for desktop, tablet, and mobile devices
- Clean and reusable component-based architecture

## Project Structure

- src/components → Reusable UI components
- src/pages → Application pages
- src/hooks → Custom React hooks
- src/api → API calls and Supabase logic
- src/utils → Helper and utility functions
- src/assets → Images and static resources

## Installation

### Clone the repository
- git clone https://github.com/Prasant678/Job_Portal_ReactJS.git
- cd Job_Portal_ReactJS

### Install dependencies
- npm install

### Create Environment Variables
Create a .env file in the root directory and add the following:
- VITE_SUPABASE_URL=your_supabase_url
- VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
- VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

### Run the development server
- npm run dev

#### Open the application in your browser:
- http://localhost:5173

## Build for Production

- npm run build
- npm run preview

## Environment Variables

### The following files should not be pushed to GitHub:
- .env
- .env.local
- .env.production

### Add the same environment variables manually inside Vercel:
- Go to Project Settings
- Open Environment Variables
- Add all values from your local .env

## Deployment

The project is deployed on Vercel. Whenever changes are pushed to the main branch, Vercel automatically rebuilds and deploys the latest version.

## Author

G Prasant
MERN Stack Developer