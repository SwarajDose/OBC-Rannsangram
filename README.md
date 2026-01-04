# OBC Rannsangram

A comprehensive web application for the OBC Rannsangram initiative, designed to connect with the community and manage administrative tasks. This project features a modern React frontend and a robust Node.js/Express backend.

## 🚀 Features

- **Public Portal**:
  - **Hero Section**: Engaging landing page with mission and vision.
  - **About Us**: Information about the initiative's history and goals.
  - **Objectives**: Clear outline of the organization's objectives.
  - **Contact Form**: Easy-to-use form for community members to get in touch.
  - **Responsive Design**: Fully responsive layout for all devices.

- **Admin Dashboard**:
  - **Secure Login**: Protected admin area.
  - **Submission Management**: View, filter, and delete contact form submissions.
  - **Data Visualization**: (Future scope) Insights into community engagement.
  - **Real-time Updates**: Data fetched directly from the database.

## 🛠️ Tech Stack

### Frontend
- **React**: UI library for building the user interface.
- **Vite**: Next-generation frontend tooling.
- **React Router**: Navigation and routing.
- **CSS3**: Custom styling for a unique and professional look.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MySQL**: Relational database for storing administrative and submission data.
- **JWT**: JSON Web Tokens for secure authentication.

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14+)
- MySQL
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/SwarajDose/OBC-Rannsangram.git
cd OBC-Rannsangram
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

**Environment Variables**:
Create a `.env` file in the `backend` directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=obc_rann_sangram
JWT_SECRET=your_jwt_secret
```

**Database Setup**:
Import the schema into your MySQL database using `backend/database/schema.sql`.

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

## 🔗 API Endpoints

- `POST /api/contact/submit` - Submit a new contact form.
- `GET /api/contact/submissions` - Get all submissions (Admin only).
- `DELETE /api/contact/submissions/:id` - Delete a submission (Admin only).
- `POST /api/auth/login` - Admin login.
- `GET /api/auth/verify` - Verify admin token.
