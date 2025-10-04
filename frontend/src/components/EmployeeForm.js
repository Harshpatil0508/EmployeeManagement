import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '../api';

const EmployeeForm = ({ employee, onClose, onRefresh }) => {
  // Initialize form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  
  const isEditMode = !!employee?.id;

  // Update form data when employee prop changes (for edit mode)
  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || '',
        email: employee.email || '',
        position: employee.position || ''
      });
    }
  }, [employee]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.position.trim()) {
      newErrors.position = 'Position is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      if (isEditMode) {
        // Update existing employee
        await updateEmployee(employee.id, formData);
      } else {
        // Create new employee
        await createEmployee(formData);
      }
      
      // Refresh employee list and close form
      if (onRefresh) onRefresh();
      if (onClose) onClose();
    } catch (error) {
      console.error('Form submission error:', error);
      
      // Handle specific API errors
      if (error.response && error.response.data) {
        setApiError(error.response.data.error || 'An error occurred. Please try again.');
      } else {
        setApiError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="employee-form-container">
      <h2>{isEditMode ? 'Edit Employee' : 'Add New Employee'}</h2>
      
      {apiError && (
        <div className="error-message">{apiError}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.name && <div className="error-text">{errors.name}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {errors.position && <div className="error-text">{errors.position}</div>}
        </div>
        
        <div className="form-actions">
          <button 
            type="button" 
            onClick={onClose}
            disabled={isSubmitting}
            className="cancel-btn"
          >
            Cancel
          </button>
          <button 
            type="submit"
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'Saving...' : isEditMode ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;