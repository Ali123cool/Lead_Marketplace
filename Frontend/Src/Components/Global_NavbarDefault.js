import React from 'react';
import { Link } from 'react-router-dom';

function Global_NavbarDefault() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">Prozpkt</Link>
                <div className="flex space-x-4">
                    <Link to="/shop" className="hover:text-blue-400">Shop Leads</Link>
                    <Link to="/login" className="hover:text-blue-400">Login</Link>
                    <Link to="/register" className="hover:text-blue-400">Register</Link>
                    <Link to="/faq" className="hover:text-blue-400">FAQ</Link>
                    <Link to="/contact" className="hover:text-blue-400">Contact</Link>
                </div>
            </div>
        </nav>
    );
}

export default Global_NavbarDefault;
