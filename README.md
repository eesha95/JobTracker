# JobTracker 📋

A full-stack job application tracker built with **React.js, FastAPI, and SQLite**.

JobTracker allows users to keep track of the jobs they have applied for, including the company, position, location, salary, application status, application date, and notes. 

## Live Demo

🌐 https://jobtracker-4k47.onrender.com

## 🚀 Features

* Add job applications
* View all applications
* Search applications by company, position, or location
* Filter applications by status
* View application details
* Delete applications
* Dashboard with application statistics
* Responsive React.js interface
* REST API built with FastAPI
* SQLite database for persistent storage

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Lucide React
* Vite
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic
* Uvicorn

### Database

* SQLite

## 📁 Project Structure

```text
JobTracker/
│
├── backend/
│   ├── database.py
│   ├── main.py
│   └── models.py
│
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/eesha95/JobTracker.git
cd JobTracker
```

### 2. Backend setup

Create and activate a virtual environment:

```bash
python -m venv myenv
```

Windows:

```powershell
myenv\Scripts\activate
```

Install the backend dependencies:

```bash
pip install fastapi uvicorn sqlalchemy
```

Start the FastAPI server:

```bash
cd backend
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

FastAPI documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend setup

Open another terminal and go to the project root:

```bash
cd JobTracker
```

Install the frontend dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm run dev
```

The frontend will normally run at:

```text
http://localhost:5173
```

## 🔄 How It Works

```text
React.js Frontend
       │
       │ HTTP Requests
       ↓
FastAPI Backend
       │
       │ SQLAlchemy
       ↓
SQLite Database
```

For example, when a user adds a job:

```text
Add Application
       ↓
React
       ↓
POST /jobs
       ↓
FastAPI
       ↓
SQLAlchemy
```
