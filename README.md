# TaxEase

**TaxEase** is a web application that simplifies tax-related tasks by providing an intuitive platform for user authentication, registration, and secure access to tax management tools.

## Features

- User Authentication: Login and register functionality with secure token-based authentication.
- Responsive Navbar: Dynamic navigation with login/logout and register options based on user authentication status.
- Clean and modern UI: Built using React, ensuring a smooth user experience.
- Backend Integration: APIs for handling user authentication and registration.

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose)
- **Routing**: React Router
- **State Management**: React Hooks (useState, useEffect)

## Prerequisites

Ensure you have the following installed:

- Node.js (v16+ recommended)
- MongoDB
- npm or yarn

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/Anish-kumar7641/TaxEase.git
cd TaxEase

### 2. Install dependencies

For the frontend:
cd frontend
npm install

For the backend:
cd backend
npm install

### 3. Set up environment variables in the backend

Create a .env file in the backend directory with the following:
MONGO_URI=mongodb://localhost:27017/taxease
JWT_SECRET=your_jwt_secret

### 4. Start the application

Start the backend server:
cd backend
npm start

Start the frontend development server:
cd frontend
npm start

