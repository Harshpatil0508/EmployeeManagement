import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EmployeeSearch from './components/EmployeeSearch';
import { getEmployees } from './api';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to refresh the employee list
  const refreshEmployees = useCallback(async (query = null) => {
    try {
      setLoading(true);
      const queryToUse = query !== null ? query : searchQuery;
      const data = await getEmployees(queryToUse);
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch employees. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Load employees when component mounts
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const data = await getEmployees('');
        setEmployees(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch employees. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialData();
  }, []);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    refreshEmployees(query);
  };

  // Handle edit button click
  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setShowForm(true);
  };

  // Handle add new employee button click
  const handleAddNew = () => {
    setCurrentEmployee(null);
    setShowForm(true);
  };

  // Handle form close
  const handleFormClose = () => {
    setShowForm(false);
    setCurrentEmployee(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Employee Management System</h1>
      </header>
      
      <main className="App-main">
        <div className="controls">
          <EmployeeSearch onSearch={handleSearch} />
          <button 
            className="add-btn"
            onClick={handleAddNew}
          >
            Add New Employee
          </button>
        </div>
        
        {showForm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <EmployeeForm 
                employee={currentEmployee}
                onClose={handleFormClose}
                onRefresh={refreshEmployees}
              />
            </div>
          </div>
        )}
        <EmployeeList
          employees={employees}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onRefresh={refreshEmployees}
        />
      </main>
    </div>
  );
}

export default App;
