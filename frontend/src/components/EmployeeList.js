import React from 'react';
import { deleteEmployee } from '../api';

const EmployeeList = ({
  employees,
  loading,
  error,
  onEdit,
  onRefresh
}) => {

  // Handle employee deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        // Refresh the employee list
        if (onRefresh) {
          onRefresh();
        }
      } catch (err) {
        alert('Failed to delete employee. Please try again.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading employees...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (employees.length === 0) {
    return <div className="no-employees">No employees found. Add one to get started!</div>;
  }

  return (
    <div className="employee-list">
      <h2>Employees</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => onEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;