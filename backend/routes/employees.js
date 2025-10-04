const express = require('express');
const router = express.Router();
const db = require('../database');

// GET all employees
router.get('/', async (req, res) => {
  try {
    const query = req.query.search;
    let employees;
    
    if (query) {
      employees = await db.searchEmployees(query);
    } else {
      employees = await db.getAllEmployees();
    }
    
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await db.getEmployeeById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// CREATE a new employee
router.post('/', async (req, res) => {
  try {
    const { name, email, position } = req.body;
    
    // Basic validation
    if (!name || !email || !position) {
      return res.status(400).json({ error: 'Please provide name, email, and position' });
    }
    
    const employee = await db.createEmployee({ name, email, position });
    res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    
    // Handle duplicate email error
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE an employee
router.put('/:id', async (req, res) => {
  try {
    const { name, email, position } = req.body;
    
    // Basic validation
    if (!name || !email || !position) {
      return res.status(400).json({ error: 'Please provide name, email, and position' });
    }
    
    const employee = await db.updateEmployee(req.params.id, { name, email, position });
    res.json(employee);
  } catch (err) {
    console.error(err);
    
    if (err.message === 'Employee not found') {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    // Handle duplicate email error
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE an employee
router.delete('/:id', async (req, res) => {
  try {
    await db.deleteEmployee(req.params.id);
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    
    if (err.message === 'Employee not found') {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;