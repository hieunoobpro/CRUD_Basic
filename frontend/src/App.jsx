import { useState, useEffect } from "react";
import ContactList from "./ContactList"; // Component to display a list of contacts
import "./App.css"; // Styles for the app
import ContactForm from "./ContactForm"; // Component for the contact creation/edit form

function App() {
  // State to store the list of contacts
  const [contacts, setContacts] = useState([]);
  // State to track whether the modal is open or closed
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to store the contact currently being edited
  const [currentContact, setCurrentContact] = useState({});

  // Fetch contacts when the component mounts
  useEffect(() => {
    fetchContacts();
  }, []);

  // Function to fetch the list of contacts from the backend
  const fetchContacts = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts"); // Fetch contacts from API
    const data = await response.json(); // Parse JSON response
    setContacts(data.contacts); // Update state with fetched contacts
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setCurrentContact({}); // Clear the current contact
  };

  // Function to open the modal for creating a new contact
  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true); // Open the modal if it's not already open
  };

  // Function to open the modal for editing an existing contact
  const openEditModal = (contact) => {
    if (isModalOpen) return; // Prevent opening the modal if it's already open
    setCurrentContact(contact); // Set the contact to be edited
    setIsModalOpen(true); // Open the modal
  };

  // Function to handle updates (e.g., after creating or editing a contact)
  const onUpdate = () => {
    closeModal(); // Close the modal
    fetchContacts(); // Refresh the contact list
  };

  return (
    <>
      {/* Render the contact list and pass necessary props */}
      <ContactList
        contacts={contacts}
        updateContact={openEditModal} // Pass the function to open the edit modal
        updateCallback={onUpdate} // Pass the callback to refresh the list
      />

      {/* Button to open the create contact modal */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <button
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          onClick={openCreateModal}
        >
          Create New Contact
        </button>
      </div>

      {/* Modal for creating or editing contacts */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            {/* Close button for the modal */}
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            {/* Render the contact form and pass necessary props */}
            <ContactForm
              existingContact={currentContact} // Pass the contact being edited (if any)
              updateCallback={onUpdate} // Pass the callback to handle updates
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
