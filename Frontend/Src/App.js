import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';
import Global_NavbarDefault from './Components/Global_NavbarDefault';
import Global_Footer from './Components/Global_Footer';

function App() {
    return (
        <Router>
            <div>
                <Global_NavbarDefault />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                </Routes>
                <Global_Footer />
            </div>
        </Router>
    );
}

export default App;
