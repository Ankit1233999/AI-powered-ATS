# HireAI – AI-Powered Applicant Tracking System

HireAI is an Applicant Tracking System (ATS) designed to simplify and improve the recruitment process. It helps recruiters manage job openings, candidates, and applications through a centralized dashboard.

## Features

- **Recruitment Dashboard:** View recruitment statistics and recent candidates.
- **Job Management:** Create and manage job listings.
- **Candidate Management:** Add, search, edit, and delete candidate records.
- **Application Management:** Track applications and update recruitment statuses.
- **Status Tracking:** Monitor candidates through different hiring stages.
- **Modern UI:** Responsive interface built with React and Material UI.

## Technology Stack

### Frontend
- React.js
- Vite
- Material UI (MUI)
- JavaScript
- CSS

### Backend (Planned / In Progress)
- Node.js
- Express.js
- MongoDB

### AI Features (Planned)
- AI-powered resume screening
- Resume-to-job matching
- Candidate ranking based on job requirements

## Project Structure

```text
AI-powered Application Traking System (ATS)/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Jobs.jsx
│   │   │   ├── Candidates.jsx
│   │   │   └── Applications.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── README.md
└── backend/              # Add when backend is created
```

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/Ankit1233999/AI-powered-ATS.git
```

### 2. Open the frontend folder

```bash
cd AI-powered-ATS/frontend
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal, usually `http://localhost:5173/`.

## Current Status

The frontend includes a recruitment dashboard and job, candidate, and application page components. Some functionality currently uses sample data and React state.

Backend integration, persistent database storage, authentication, and AI-powered resume analysis are planned or require further implementation.

## Future Enhancements

- User authentication and role-based access
- Database integration
- Resume upload and parsing
- AI-based candidate matching
- Interview scheduling
- Recruitment analytics
- Email notifications
- Production deployment

## Author

Ankit Saini

GitHub: https://github.com/Ankit1233999

---

This project is being developed to improve recruitment workflow management and explore AI-assisted hiring.
