import React from 'react';
import { Link } from 'react-router-dom';

function Global_Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                <p>© 2024 Prozpkt. All Rights Reserved.</p>
                <div className="mt-4">
                    <Link to="/privacy-policy" className="mx-2">Privacy Policy</Link>
                    <Link to="/terms-of-service" className="mx-2">Terms of Service</Link>
                    <Link to="/refund-policy" className="mx-2">Refund Policy</Link>
                    <Link to="/email-opt-out" className="mx-2">Email Opt Out</Link>
                </div>
            </div>
        </footer>
    );
}

export default Global_Footer;
