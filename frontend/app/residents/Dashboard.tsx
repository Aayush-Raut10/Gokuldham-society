import React from 'react';
import { Link } from 'react-router-dom';

const ResidentDashboard = () => {
    return (
        <div>
            <h1>Resident Dashboard</h1>
            <div className="profile">
                <h2>Profile</h2>
                {/* Profile details will go here */}
            </div>
            <div className="complaints">
                <h2>Complaints</h2>
                <Link to="/residents/complaints">File a Complaint</Link>
                {/* List of complaints with status will go here */}
            </div>
            <div className="payment">
                <h2>Payment</h2>
                {/* Payment details and options will go here */}
            </div>
        </div>
    );
};

export default ResidentDashboard;