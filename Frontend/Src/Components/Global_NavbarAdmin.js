import React from 'react';
import { Link } from 'react-router-dom';

function Global_NavbarAdmin() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Prozpkt</Link>
                <div className="flex space-x-4">
                    <Link to="/admin-dashboard" className="hover:text-blue-400">Admin Dashboard</Link>
                    <Link to="/manage-leads" className="hover:text-blue-400">Manage Leads</Link>
                    <Link to="/faq" className="hover:text-blue-400">FAQ</Link>
                    <Link to="/contact" className="hover:text-blue-400">Contact</Link>
                    <button className="hover:text-red-400" onClick={() => alert('Logging out...')}>Logout</button>
                </div>
            </div>
        </nav>
    );
}

export default Global_NavbarAdmin;
