# Employee Data Management System

A full-stack CRUD application for managing employee data, built with React, Node.js, Express, and SQLite.

## Features

- **Backend**: RESTful API with full CRUD operations for employee data
- **Frontend**: React-based UI with responsive design
- **Database**: SQLite for data persistence
- **Search**: Filter employees by name (use the search bar at the top of the page)
- **Validation**: Form validation for employee data

## Project Structure

```
employee-management/
├── backend/             # Node.js and Express backend
│   ├── routes/          # API route definitions
│   ├── database.js      # SQLite database operations
│   ├── server.js        # Express server setup
│   └── package.json     # Backend dependencies
│
└── frontend/            # React frontend
    ├── public/          # Static files
    └── src/             # React source code
        ├── components/  # React components
        ├── api.js       # API client
        ├── App.js       # Main application component
        └── App.css      # Application styles
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd employee-management
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

## Running the Application

### Start the Backend Server

```
cd backend
npm run dev
```

This will start the backend server on http://localhost:5000.

### Start the Frontend Development Server

In a new terminal:

```
cd frontend
npm start
```

This will start the frontend development server on http://localhost:3000.

## Using the Application

1. **View Employees**: All employees are displayed in a table on the main page.
2. **Add Employee**: Click the "Add New Employee" button to open a form where you can enter employee details.
3. **Edit Employee**: Click the "Edit" button next to an employee to modify their information.
4. **Delete Employee**: Click the "Delete" button next to an employee to remove them from the database.
5. **Search Employees**: Use the search bar at the top of the page to filter employees by name. Type a name and click "Search" or press Enter. Click "Clear" to show all employees again.

## API Endpoints

The backend provides the following API endpoints:

- `GET /api/employees` - Get all employees (with optional search query)
- `GET /api/employees/:id` - Get a specific employee by ID
- `POST /api/employees` - Create a new employee
- `PUT /api/employees/:id` - Update an existing employee
- `DELETE /api/employees/:id` - Delete an employee

## Employee Data Structure

Each employee has the following properties:

- `id` (auto-generated)
- `name` (required)
- `email` (required, unique)
- `position` (required)
- `created_at` (auto-generated timestamp)

## Development

### Backend Development

The backend is built with:
- Express.js for the web server
- SQLite for the database
- Body-parser for parsing request bodies
- CORS for cross-origin resource sharing

### Frontend Development

The frontend is built with:
- React for the UI
- Axios for API requests
- CSS for styling
