import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>React - CRUD Example</h1>
            <p>A rest API to showCustomer Vaccination Details along with adding the details. Users will be periodically adding the vaccination Details.</p>
            <p><Link to="vaccinationdetails">&gt;&gt; Customer Vaccination Details</Link></p>
        </div>
    );
}

export { Home };