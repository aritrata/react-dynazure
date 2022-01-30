import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Home</NavLink>
                <NavLink to="/vaccinationDetails" className="nav-item nav-link">Customer Vaccination Details</NavLink>
            </div>
        </nav>
    );
}

export { Nav };