import React, { useState } from 'react';

const EmployeeSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm.trim());
  };

  // Handle clearing the search
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="employee-search">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search employees by name..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
        {searchTerm && (
          <button 
            type="button" 
            onClick={handleClear}
            className="clear-btn"
          >
            Clear
          </button>
        )}
      </form>
    </div>
  );
};

export default EmployeeSearch;