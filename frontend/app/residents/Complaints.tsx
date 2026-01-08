import React, { useState } from 'react';

const Complaints = () => {
    const [complaint, setComplaint] = useState('');
    const [complaintsList, setComplaintsList] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newComplaint = { text: complaint, status: 'Pending' };
        setComplaintsList([...complaintsList, newComplaint]);
        setComplaint('');
    };

    return (
        <div>
            <h2>File a Complaint</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    placeholder="Describe your complaint..."
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <h3>Your Complaints</h3>
            <ul>
                {complaintsList.map((c, index) => (
                    <li key={index}>{c.text} - Status: {c.status}</li>
                ))}
            </ul>
        </div>
    );
};

export default Complaints;