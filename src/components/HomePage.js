import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactList from './ContactList';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleAddContact = () => {
    navigate('/add-contact');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Professional Contacts Manager</h1>

      {/* Search bar */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control mb-3"
        />
      </div>

      {/* Add Contact button */}
      <div className="d-flex justify-content-center mb-4">
        <button
          className="btn btn-primary"
          style={{
            fontSize: '1.2rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '5px',
          }}
          onClick={handleAddContact}
        >
          Add Contact
        </button>
      </div>

      {/* Contact List */}
      <ContactList searchQuery={searchQuery} />
    </div>
  );
};

export default HomePage;
