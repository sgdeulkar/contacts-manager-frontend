import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactList = ({ searchQuery }) => {
  const [contacts, setContacts] = useState([]);
  const [editingReminder, setEditingReminder] = useState(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch contacts from the backend
  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleSaveReminder = async (id, reminderDate) => {
    try {
      await axios.put(`${API_BASE_URL}/contacts/${id}/reminder`, { reminderDate });
      alert('Reminder date updated successfully!');
      setEditingReminder(null);
      fetchContacts();
    } catch (error) {
      console.error('Error updating reminder date:', error);
      alert('Failed to update reminder date.');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter((contact) => {
    const name = contact.Name || '';
    const company = contact.Company || '';
    const category = contact.Category || '';
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="container mt-5">
      {filteredContacts.length === 0 ? (
        <p className="text-center">No contacts found.</p>
      ) : (
        <div className="row">
          {filteredContacts.map((contact) => (
            <div key={contact.Id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary">{contact.Name}</h5>
                  <p><strong>Email:</strong> {contact.Email || 'No Email'}</p>
                  <p><strong>Phone:</strong> {contact.Phone || 'No Phone'}</p>
                  <p><strong>Company:</strong> {contact.Company || 'No Company'}</p>
                  <p><strong>Category:</strong> {contact.Category || 'No Category'}</p>
                  <p>
                    <strong>Last Interaction:</strong>{' '}
                    {contact.LastInteractionDate
                      ? new Date(contact.LastInteractionDate).toLocaleString()
                      : 'No Interaction'}
                  </p>
                  <p><strong>Notes:</strong> {contact.Notes || 'No Notes'}</p>
                  <p>
                    <strong>Reminder:</strong>{' '}
                    {editingReminder === contact.Id ? (
                      <input
                        type="datetime-local"
                        className="form-control"
                        defaultValue={
                          contact.ReminderDate
                            ? new Date(contact.ReminderDate).toISOString().slice(0, 16)
                            : ''
                        }
                        onBlur={(e) => handleSaveReminder(contact.Id, e.target.value)}
                      />
                    ) : contact.ReminderDate ? (
                      new Date(contact.ReminderDate).toLocaleString()
                    ) : (
                      'No Reminder'
                    )}
                  </p>
                  <button
                    className="btn btn-outline-primary mt-auto"
                    onClick={() =>
                      setEditingReminder(editingReminder === contact.Id ? null : contact.Id)
                    }
                  >
                    {editingReminder === contact.Id ? 'Cancel' : 'Set Reminder'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactList;
