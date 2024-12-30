import React from "react"

const ContactList = ({ contacts, updateContact, updateCallback }) => {
    const onDelete = async (id) => {
        try {
            const options = {
                method: "DELETE"
            }
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options)
            if (response.status === 200) {
                updateCallback()
            } else {
                console.error("Failed to delete")
            }
        } catch (error) {
            alert(error)
        }
    }

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>Contacts</h2>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "10px", textAlign: "left" }}>First Name</th>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "10px", textAlign: "left" }}>Last Name</th>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "10px", textAlign: "left" }}>Email</th>
                        <th style={{ borderBottom: "2px solid #ddd", padding: "10px", textAlign: "left" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) => (
                        <tr key={contact.id} style={{ borderBottom: "1px solid #ddd" }}>
                            <td style={{ padding: "10px" }}>{contact.firstName}</td>
                            <td style={{ padding: "10px" }}>{contact.lastName}</td>
                            <td style={{ padding: "10px" }}>{contact.email}</td>
                            <td style={{ padding: "10px" }}>
                                <button 
                                    onClick={() => updateContact(contact)} 
                                    style={{ marginRight: "10px", padding: "5px 10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                                >
                                    Update
                                </button>
                                <button 
                                    onClick={() => onDelete(contact.id)} 
                                    style={{ padding: "5px 10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ContactList