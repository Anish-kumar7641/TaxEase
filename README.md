# TaxEase

## Overview
TaxEase is a web application that simplifies tax-related tasks by providing an intuitive platform for user authentication, registration, and secure access to tax management tools.

## Features
- **User Authentication**
  - Secure login and registration system
  - Token-based authentication for protected routes
  - Automatic session management

- **Responsive Design**
  - Dynamic navigation bar that adapts to user authentication status
  - Mobile-friendly interface
  - Intuitive user experience

- **Modern Architecture**
  - Clean and efficient UI built with React
  - RESTful API integration
  - Secure data handling

## Technology Stack

### Frontend
- React
- TailwindCSS
- React Router
- React Hooks (useState, useEffect)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v16 or higher)
- MongoDB
- npm or yarn package manager

## Installation Guide

### 1. Clone the Repository
```bash
git clone https://github.com/Anish-kumar7641/TaxEase.git
cd TaxEase
```

### 2. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install
```

### 4. Environment Configuration

Create a `.env` file in the backend directory with the following variables:
```plaintext
MONGO_URI=mongodb://localhost:27017/taxease
JWT_SECRET=your_jwt_secret
```

### 5. Launch the Application

Start the backend server:
```bash
cd backend
npm start
```

Start the frontend development server:
```bash
cd frontend
npm start
```

## Contributing

We welcome contributions to TaxEase! Please feel free to submit issues and pull requests.
