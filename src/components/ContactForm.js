import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const navigate = useNavigate();
  const [contact, setContact] = useState({
    name: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    category: '',
    lastInteractionDate: '',
    notes: '',
  });

  const [errors, setErrors] = useState({});

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!contact.name) newErrors.name = 'Name is required.';
    if (!contact.email) newErrors.email = 'Email is required.';
    if (!contact.category) newErrors.category = 'Category is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await axios.post(`${API_BASE_URL}/contacts`, contact);
      toast.success('Contact added successfully!');
      setTimeout(() => navigate('/'), 2000); // Navigate back to the home page
    } catch (error) {
      console.error('Error adding contact:', error);
      toast.error('Failed to add contact.');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="text-center mb-4">Add Contact</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter full name"
            value={contact.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Company</label>
          <input
            type="text"
            name="company"
            placeholder="Enter company name"
            value={contact.company}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Position</label>
          <input
            type="text"
            name="position"
            placeholder="Enter job title or position"
            value={contact.position}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={contact.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter phone number"
            value={contact.phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={contact.category}
            onChange={handleChange}
            className={`form-select ${errors.category ? 'is-invalid' : ''}`}
          >
            <option value="">Select category</option>
            <option value="Mentor">Mentor</option>
            <option value="Colleague">Colleague</option>
            <option value="Alumni">Alumni</option>
            <option value="Potential Employer">Potential Employer</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Last Interaction Date</label>
          <input
            type="datetime-local"
            name="lastInteractionDate"
            value={contact.lastInteractionDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Notes</label>
          <textarea
            name="notes"
            placeholder="Enter any relevant notes"
            value={contact.notes}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary w-100 me-2">
            Add Contact
          </button>
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ContactForm;
