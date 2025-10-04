const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create a database connection
const dbPath = path.resolve(__dirname, 'employees.db');
const db = new sqlite3.Database(dbPath);

// Initialize the database
function init() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS employees (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          position TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

// Get all employees
function getAllEmployees() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM employees ORDER BY created_at ASC', (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Get employee by ID
function getEmployeeById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM employees WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

// Create a new employee
function createEmployee(employee) {
  return new Promise((resolve, reject) => {
    const { name, email, position } = employee;
    db.run(
      'INSERT INTO employees (name, email, position) VALUES (?, ?, ?)',
      [name, email, position],
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, ...employee });
        }
      }
    );
  });
}

// Update an employee
function updateEmployee(id, employee) {
  return new Promise((resolve, reject) => {
    const { name, email, position } = employee;
    db.run(
      'UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?',
      [name, email, position, id],
      function(err) {
        if (err) {
          reject(err);
        } else {
          if (this.changes === 0) {
            reject(new Error('Employee not found'));
          } else {
            resolve({ id, ...employee });
          }
        }
      }
    );
  });
}

// Delete an employee
function deleteEmployee(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM employees WHERE id = ?', [id], function(err) {
      if (err) {
        reject(err);
      } else {
        if (this.changes === 0) {
          reject(new Error('Employee not found'));
        } else {
          resolve({ id });
        }
      }
    });
  });
}

// Search employees by name
function searchEmployees(query) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM employees WHERE name LIKE ? ORDER BY created_at ASC',
      [`%${query}%`],
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

module.exports = {
  init,
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
};